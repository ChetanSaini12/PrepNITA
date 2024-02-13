import { ApolloServer } from '@apollo/server'
import { User } from './User/index.js'
import { Question } from './Questions/index.js'

async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs : `
      ${User.typeDefs}
      ${Question.typeDefs}
      type Query {
        ${User.queries}
        ${Question.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Question.mutations}
      }
    `
    ,
    resolvers: {
        Query : {
          ...User.resolvers.queries,
          ...Question.resolvers.queries,
        },
        Mutation : {
          ...User.resolvers.mutations,
          ...Question.resolvers.mutations,
        }
    },
    includeStacktraceInErrorResponses : false
  })

  await gqlserver.start()

  return gqlserver
}

export { createApolloGraphqlServer }
