const { UserInputError } = require('apollo-server-express')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const md5 = require('../util/md5')

const resolvers = {
    // 所有的 Query 都走这里
    Query: {
        foo() {
            return "bar"
        }
    },

    Mutation: {
        // login(parent, args, context) {
        // },
        async createUser(parent, { user }, { dataSources }) {
            const usersSources = dataSources.users

            // email is saved?
            const userEmailRet = await usersSources.findByEmail(user.email)
            if (userEmailRet) throw new UserInputError('Choose another email')
            // username is saved?
            const usernameRet = await usersSources.findByUsername(user.username)
            if (userEmailRet) throw new UserInputError('Choose another username')
            // save user
            const userSavedData = await usersSources.saveUser(user)
            // create token
            const token = await jwt.sign({
                userId: userSavedData._id
            }, jwtSecret, {
                expiresIn: 60 * 60 * 24
            })

            return {
                user: {
                    ...userSavedData.toObject(),
                    token,
                }
            }
        },
        async login(parent, { user }, { dataSources }) {
            const usersSources = dataSources.users
            // username is valiable?
            const userRet = await usersSources.findByEmail(user.email)
            if (!userRet) throw new UserInputError('Email is not correct')
            // password is valiable?

            if (md5(user.password) !== userRet.password) throw new UserInputError('Password is not correct')
            // create token
            const token = await jwt.sign({
                userId: userRet._id
            }, jwtSecret, {
                expiresIn: 60 * 60 * 24
            })
            // res ok
            return {
                user: {
                    ...userRet.toObject(),
                    token,
                }
            }
        }
    }
}
module.exports = resolvers