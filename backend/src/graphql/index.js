import { ApolloServer } from '@apollo/server'
import { User } from './User/index.js'
import { Question } from './Questions/index.js'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'
import { Interview } from './Interview/index.js'
import { Experience } from './Experience/index.js'
import { Quiz } from './Quiz/index.js'
import { mergeTypeDefs } from '@graphql-tools/merge'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import {
  ApolloServerPluginLandingPageLocalDefault,
  gql,
} from 'apollo-server-core'

const UploadTypeDefinition = gql`
  scalar Upload
`

const filterTypeDefinition = gql`
  input FilterCondition {
    field: String!
    operator: String!
    value: String!
  }
`

const mergedTypes = mergeTypeDefs([
  UploadTypeDefinition,
  DateTimeTypeDefinition,
  filterTypeDefinition,
  User.typeDefs,
  Question.typeDefs,
  Interview.typeDefs,
  Quiz.typeDefs,
  Experience.typeDefs,
])
async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs: [
      mergedTypes,
      `
      type Query {
        ${User.queries}
        ${Question.queries}
        ${Interview.queries}
        ${Quiz.queries}
        ${Experience.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Question.mutations}
        ${Interview.mutations}
        ${Quiz.mutations}
        ${Experience.mutations}
      }
    `,
    ],
    resolvers: {
      DateTime: DateTimeResolver,
      Upload: GraphQLUpload,
      Query: {
        ...User.resolvers.queries,
        ...Question.resolvers.queries,
        ...Interview.resolvers.queries,
        ...Quiz.resolvers.queries,
        ...Experience.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Question.resolvers.mutations,
        ...Interview.resolvers.mutations,
        ...Quiz.resolvers.mutations,
        ...Experience.resolvers.mutations,
      },
    },
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    includeStacktraceInErrorResponses: false,
    introspection: true,
  })

  await gqlserver.start()

  return gqlserver
}

export { createApolloGraphqlServer }
