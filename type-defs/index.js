const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @upper on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type User {
    email: String!
    username: String!
    token: String
    bio: String
    image: String
  }

  type UserPayload {
    user: User
  }

  type Query {
    foo: String @auth
    currentUser: User @auth
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
  }
`;

module.exports = typeDefs;
