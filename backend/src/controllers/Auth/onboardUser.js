import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const onboardUser = async (_, payload, context) => {
  if (context && context.userId) {
    console.log('UserInput for Onboarding: ' + JSON.stringify(payload.user))
    const user = await prisma.user.update({
      where: { id: context.userId },
      data: { ...payload.user },
    })

    return user
  }

  throw new GraphQLError('User is not registered yet!!', {
    extensions: {
      code: 'NOT_REGISTERED',
    },
  })
}
