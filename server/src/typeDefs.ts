import {gql} from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    stripe_session_id: String!
    type: String!
    parent_first_name: String!
    parent_last_name: String!
    child_first_name: String!
    child_last_name: String!
    signup_date: String!
  }
  type Week {
    date: String!
    capacity: Int!
    students: Int!
  }
  type Referral {
    id: ID!
    code: String
    visits: Int!
  }
  type CodeEntry {
    id: ID!
    user: Int!
    exercise_uid: Int!
    code: String
    date_changed: String
    template: Boolean
    status: String!
  }
  type Exercise {
    uid: ID!
    id: Int
    title: String
    article: String
    status: String
  }
  type Query {
    me: User
    fulfill_payment: Boolean!
    dates: [Week]
    stripe_session: User
    referral(code: String): Boolean!
    get_exercise(uid: Int): Exercise
    get_code_entry(uid: Int): CodeEntry!
    get_all_exercises: [Exercise]
  }
  type Mutation {
    register(email: String!, password: String!): Boolean!
    register_full(
      email: String!, 
      username: String!
      password: String!, 
      parent_first_name: String!, 
      parent_last_name: String!
      child_first_name: String!
      child_last_name: String!
      child_grade: String!
      signup_date: String!
    ): User
    login(email: String!, password: String!): User
    logout: Boolean!
    save_code_entry(exercise_uid: Int!, code: String!, status: String): Boolean!
  }
`;