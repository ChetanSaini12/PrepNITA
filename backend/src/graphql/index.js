import { ApolloServer } from '@apollo/server'
import { User } from './User/index.js'
import { Question } from './Questions/index.js'
import {DateTimeResolver, DateTimeTypeDefinition} from 'graphql-scalars'
import { Interview } from './Interview/index.js'

async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs : [
      DateTimeTypeDefinition,
      User.typeDefs,
      Question.typeDefs,
      Interview.typeDefs,
      `
      type Query {
        ${User.queries}
        ${Question.queries}
        ${Interview.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Question.mutations}
        ${Interview.mutations}
      }
    `]
    ,
    resolvers: {
        DateTime : DateTimeResolver,
        Query : {
          ...User.resolvers.queries,
          ...Question.resolvers.queries,
          ...Interview.resolvers.queries,
        },
        Mutation : {
          ...User.resolvers.mutations,
          ...Question.resolvers.mutations,
          ...Interview.resolvers.mutations,
        }
    },
    includeStacktraceInErrorResponses : false
  })

  await gqlserver.start()

  return gqlserver
}

export { createApolloGraphqlServer }
