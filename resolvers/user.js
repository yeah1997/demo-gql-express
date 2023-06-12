const { UserInputError } = require("apollo-server-express");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const md5 = require("../util/md5");

module.exports = {
  Query: {
    foo(parent, args, context, info) {
      console.log(user);
      return "hello";
    },
    currentUser(parent, args, context, info) {
      // to get current user info
      return context.user;
      // res
    },
  },

  Mutation: {
    // login(parent, args, context) {
    // },
    async createUser(parent, { user }, { dataSources }) {
      const usersSources = dataSources.users;

      // email is saved?
      const userEmailRet = await usersSources.findByEmail(user.email);
      if (userEmailRet) throw new UserInputError("Choose another email");
      // username is saved?
      const usernameRet = await usersSources.findByUsername(user.username);
      if (userEmailRet) throw new UserInputError("Choose another username");
      // save user
      const userSavedData = await usersSources.saveUser(user);
      // create token
      const token = await jwt.sign(
        {
          userId: userSavedData._id,
        },
        jwtSecret,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      return {
        user: {
          ...userSavedData.toObject(),
          token,
        },
      };
    },
    async login(parent, { user }, { dataSources }) {
      const usersSources = dataSources.users;
      // username is variable?
      const userRet = await usersSources.findByEmail(user.email);
      if (!userRet) throw new UserInputError("Email is not correct");
      // password is variable?

      if (md5(user.password) !== userRet.password)
        throw new UserInputError("Password is not correct");
      // create token
      const token = await jwt.sign(
        {
          userId: userRet._id,
        },
        jwtSecret,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      // res ok
      return {
        user: {
          ...userRet.toObject(),
          token,
        },
      };
    },

    async updateUser(parent, { user: userInput }, { user, dataSources }) {
      if (userInput.password) userInput.password = md5(userInput.password);
      const ret = await dataSources.users.updateUser(user._id, userInput);

      return {
        user: ret,
      };
    },
  },
};
