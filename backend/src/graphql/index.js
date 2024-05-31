import { ApolloServer } from '@apollo/server'
import { User } from './User/index.js'
import { Question } from './Questions/index.js'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'
import { Interview } from './Interview/index.js'
import { Quiz } from './Quiz/index.js'
import { mergeTypeDefs } from '@graphql-tools/merge'

const mergedTypes = mergeTypeDefs([
  User.typeDefs,
  Question.typeDefs,
  Interview.typeDefs,
  Quiz.typeDefs,
])
async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs: [
      DateTimeTypeDefinition,
      mergedTypes,`
      type Query {
        ${User.queries}
        ${Question.queries}
        ${Interview.queries}
        ${Quiz.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Question.mutations}
        ${Interview.mutations}
        ${Quiz.mutations}
      }
    `,
    ],
    resolvers: {
      DateTime: DateTimeResolver,
      Query: {
        ...User.resolvers.queries,
        ...Question.resolvers.queries,
        ...Interview.resolvers.queries,
        ...Quiz.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Question.resolvers.mutations,
        ...Interview.resolvers.mutations,
        ...Quiz.resolvers.mutations,
      },
    },
    includeStacktraceInErrorResponses: false,
  })

  await gqlserver.start()

  return gqlserver
}

export { createApolloGraphqlServer }
