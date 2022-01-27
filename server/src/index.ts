import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express"
import * as express from "express"
import * as session from "express-session"
import { createConnection, getConnection } from "typeorm";

import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"

import moment = require("moment");
import fs = require('fs');
import handlebars = require("handlebars");
import nodemailer = require("nodemailer")
import { Session } from "./entity/Session";
import { TypeormStore } from "typeorm-store";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}: any) => ({ req })
  });

  await createConnection();

  const repository = getConnection().getRepository(Session);
  const app = express();

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({repository}),
      cookie: {
        maxAge: 1000 * 60 * 60 * 30,
        sameSite: 'lax'
      }
    })
  )
  app.set("trust proxy", true);
  server.applyMiddleware({ 
    app, 
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL!
    }
  });

  app.listen({ port: 4000 }, () => 
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

const transporter = nodemailer.createTransport({
  host: 'bigoaklabs.com',
  port: 465,
  secure: true,
  auth: {
      user: "camp@bigoaklabs.com",
      pass: process.env.EMAIL_PASSWORD!
  },
  tls: {
    rejectUnauthorized: false
  }
})

export const sendEmail = async (email: string, childName: string, parentName: string, week: string, username: string) => {
  readHTMLFile("./src/util/email.html", function(_err: any, html: any) {

      var template = handlebars.compile(html);
      var replacements = {
          NAME: parentName,
          KNAME: childName,
          WEEK: (moment(week,"YYYY/MM/DD").format("MMMM Do") + " to " + moment(week,"YYYY/MM/DD").add(4,'days').format("MMMM Do")),
          STARTDAY: moment(week,"YYYY/MM/DD").format("Do"),
          USERNAME: username,
      };

      var htmlToSend = template(replacements);

      transporter.sendMail({
          from: {
            name: 'Adam Kalayjian',
            address: 'camp@bigoaklabs.com'
          },
          to: email, // list of receivers
          subject: "Camp Sign Up", // Subject line
          text: htmlToSend, // plain text body
          html: htmlToSend, // html body
          replyTo: "adam@kalayjian.org"
      });

  })
}

const readHTMLFile = async (path: any, callback: any) => {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
      }
      else {
          callback(null, html);
      }
  });
};

startServer();

