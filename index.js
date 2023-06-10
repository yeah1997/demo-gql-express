const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const schema = require('./schema')
const dataSources = require('./data-sources')

const app = express()

const server = new ApolloServer({
  schema,
  dataSources
})

// 将 Apollo-server 和 express 集合到一起
server.applyMiddleware({ app })

app.use((req, res) => {
  res.status(200)
  res.send('Hello!')
  res.end()
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
