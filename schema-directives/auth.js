const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (parent, args, context, info) {
      const { token, dataSources } = context;
      if (!token) throw new AuthenticationError("user info is not correct");

      try {
        const decodedData = await jwt.verify(token, jwtSecret);
        const user = await dataSources.users.findById(decodedData.userId);

        context.user = user;
      } catch (err) {
        throw new AuthenticationError("user info is not correct");
      }

      const result = await resolve(parent, args, context, info);
      return result;
    };
  }
}

module.exports = AuthDirective;
