import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs"
import { User } from "./entity/User";
import { stripe } from "./stripe";
import { Week } from "./entity/Week";
import { updateWeekStudents } from './utils';
import { sendEmail } from './index';
import { Referral } from "./entity/Referral";
import { Exercise } from "./entity/Exercise";
import { CodeEntry } from "./entity/CodeEntry";

export const resolvers: IResolvers = {
    Query: {
        me: (_, __, { req }) => {
            if (!req.session.userId) {
                return null;
            }
            return User.findOne(req.session.userId);
        },
        fulfill_payment: async (_, __, { req }) => {
            if (!req.session || !req.session.userId) { 
                throw new Error("fulfill: not authenticated");
            }

            const user = await User.findOne(req.session.userId);
            if (user && user.stripe_session_id) {
                
                const session = await stripe.checkout.sessions.retrieve(user.stripe_session_id)
                
                

                if (session.payment_status == 'paid') {
                    user.type = 'paid'
                    await user.save();
                    updateWeekStudents();
                    sendEmail(user.email,user.child_first_name,user.parent_first_name,user.signup_date,user.username)
                    return true;
                } else {
                    throw Error("stripe session status is unpaid")
                }
            }
            return false;
        },
        dates: async (_, __, ___) => {
            // if (!req.session || !req.session.userId) {
            //     throw new Error("not authenticated");
            // }
            
            return Week.find();
        },
        stripe_session: async (_, __, { req }) => {
            if (!req.session || !req.session.userId) {
                throw new Error("Stripe Session: not authenticated");
            }
            const user = await User.findOne(req.session.userId);
            if (!user) {
                throw new Error();
            }
            
            if (user.stripe_session_id && user.type == "unpaid") {
                // this should make sure the session is valid
                const session = await stripe.checkout.sessions.retrieve(user.stripe_session_id)
                if (session != null) {
                    return user;
                } else {
                    return null;
                }
            }

            if (user.type == "paid") {
                return null;
            }
            
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                  price_data: {
                    product: process.env.STRIPE_PRODUCT!,
                    unit_amount: 12999,
                    currency: 'usd'
                  },
                  quantity: 1,
                }],
                mode: 'payment',
                success_url: 'http://localhost:3000/fulfillpayment',
                cancel_url: 'http://localhost:3000/me',
            });
            
            user.stripe_session_id = session.id;
            await user.save();
            return user;
        },
        referral: async (_, {code}, {req}) => {
            // find if referral id (unique code per user) matches existing in db
            const existingReferral = await Referral.findOne({where: {id: req.session.referralId}})
            if (existingReferral) {
                existingReferral.visits += 1;
                existingReferral.save();
            } else { 
                const referral = await Referral.create({
                    code
                }).save();
                req.session.referralId = referral.id;
            }
            return true;
        },
        get_exercise: async (_, {uid}, {req}) => {

            // throw error if not authenticated
            if (!req.session || !req.session.userId) {
                throw new Error("Get Exercise: not authenticated");
            }

            return Exercise.findOne({where: {uid}});
        },
        get_all_exercises: async (_, __, {req}) => {

            // throw error if not authenticated
            if (!req.session || !req.session.userId) {
                throw new Error("Get All Exercises: not authenticated");
            }
            
            // combine data from Exercise and CodeEntry for main menu display
            let exercises = (await Exercise.find());
            const newExercises = Promise.all(exercises.map(async value => {
                const codeEntry = await CodeEntry.findOne({where: {exercise_uid: value.uid, user: req.session.userId}});
                if (codeEntry) {
                    value.status = codeEntry.status;
                } else {
                    value.status = "unopened";
                }
                return value;
            }));
            return newExercises;
        },
        get_code_entry: async (_, {uid}, {req}) => {

            // throw error if not authenticated
            if (!req.session || !req.session.userId) {
                throw new Error("Get Code Entry: not authenticated");
            }
            
            
            let entry = await CodeEntry.findOne({where: {exercise_uid: uid, user: req.session.userId}});

            // return code entry if exists already
            if (entry)
                return entry;
            
            // try to find exercise-specific template first
            let template = await CodeEntry.findOne({where: {exercise_uid: uid, template: true}});
            
            if (!template)
                // now find the basic template instead
                template = await CodeEntry.findOne({where: {exercise_uid: -1, template: true}});

            // find out if this should be the template
            const user = await User.findOne({where: {id: req.session.userId}});

            const isTemplate = (user && user.username == "admin");
 
            if (!entry) {
                entry = await CodeEntry.create({
                    exercise_uid: uid,
                    user: req.session.userId,
                    code: template?.code,
                    template: isTemplate,
                    status: "opened",
                }).save();
            }
            return entry;
        }
    },
    Mutation: {
        register_full: async (_, {email, username, password, parent_first_name, parent_last_name, child_first_name, child_last_name, child_grade, signup_date}, {req}) => {
            if ((await User.find({where: {email}})).length == 0) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    email,
                    username,
                    password: hashedPassword,
                    parent_first_name,
                    parent_last_name,
                    child_first_name,
                    child_last_name,
                    child_age: child_grade,
                    signup_date,
                    referral_id: req.session.referralId,
                }).save();
                updateWeekStudents();
                req.session.userId = user.id;
                
                return user;
            } else {
                return null;
            }
        },
        register: async (_, {email, password}) => {
            if ((await User.find({where: {email}})).length == 0) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.create({
                    email,
                    password: hashedPassword,
                }).save();

                return true;
            } else {
                return false;
            }
        },
        login: async (_, {email, password}, {req}) => {
            const user = await User.findOne({where: [{email},{username: email}]});

            if (!user) {
                return null;
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return null;
            }

            req.session.userId = user.id;

            return user;
        },
        logout: async (_, __, { req }) => {
            req.session.userId = null;
            return true;
        },
        save_code_entry: async(_, {exercise_uid, code, status}, {req}) => {

            // throw error if not authenticated
            if (!req.session || !req.session.userId) {
                throw new Error("Save Code Entry: not authenticated");
            }

            const currentEntry = await CodeEntry.findOne({where: {exercise_uid: exercise_uid, user: req.session.userId}})
            if (currentEntry) {
                currentEntry.code = code;
                currentEntry.status = status;
                await currentEntry.save();
                return true;
            } else {
                return false;
            }
            
        } 

    }
}