const { makeExecutableSchema } = require("apollo-server-express");

const typeDefs = require("./type-defs");
const resolvers = require("./resolvers");
const UpperCaseDirective = require("./schema-directives/upper");
const AuthDirective = require("./schema-directives/auth");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: UpperCaseDirective,
    auth: AuthDirective,
  },
});

module.exports = schema;
