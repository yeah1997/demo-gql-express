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
    following: Boolean
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    createdAt: String!
    updatedAt: String!
    favorited: Boolean
    favoritesCount: Int
    author: User
  }

  type CreateArticlePayload {
    article: Article
  }

  type ArticlesPayload {
    articles: [Article!]
    articlesCount: Int!
  }

  type UserPayload {
    user: User
  }

  type Query {
    foo: String @auth
    currentUser: User @auth
    articles(offset: Int = 0, limit: Int = 3): ArticlesPayload
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

  input updateUserInput {
    email: String
    username: String
    password: String
    bio: String
    image: String
  }

  input createArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]
  }

  type Mutation {
    # User
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
    updateUser(user: updateUserInput): UserPayload @auth

    # Article
    createArticle(article: createArticleInput): CreateArticlePayload @auth
  }
`;

module.exports = typeDefs;
