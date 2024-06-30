import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addNameExp } from './addnameExp.js'

export const upvoteExperience = async (_, payload, context) => {
  try {
    if (context.isUser) {
      const voteEntry = await prisma.userVotes.findFirst({
        where: {
          userId: context.userId,
          area: 'EXPERIENCE',
          areaId: payload.id,
        },
      })
      if (voteEntry) {
        if (voteEntry.type === 'LIKE') {
          // delete voteEntry and decrement upvote count
          await prisma.userVotes.delete({ where: { id: voteEntry.id } })
          let experience = await prisma.experience.update({
            where: { id: payload.id },
            data: { upvotes: { decrement: 1 } },
          })
          experience = addNameExp(experience)
          return experience
        } else {
          await prisma.userVotes.update({
            where: {
              id: voteEntry.id,
            },
            data: {
              type: 'LIKE',
            },
          })
          let experience = await prisma.experience.update({
            where: {
              id: payload.id,
            },
            data: {
              upvotes: {
                increment: 1,
              },
              downvotes: {
                decrement: 1,
              },
            },
            include: {
              comments: true,
            },
          })
          experience = addNameExp(experience)
          return experience
        }
      } else {
        await prisma.userVotes.create({
          data: {
            userId: context.userId,
            area: 'EXPERIENCE',
            areaId: payload.id,
            type: 'LIKE',
          },
        })
        let experience = await prisma.experience.update({
          where: {
            id: payload.id,
          },
          data: {
            upvotes: {
              increment: 1,
            },
          },
          include: {
            comments: true,
          },
        })
        experience = addNameExp(experience)
        return experience
      }
    } else {
      throw new GraphQLError('You are not authorised user!!', {
        extensions: {
          code: 'USER_IS_NOT_AUTHORISED',
        },
      })
    }
  } catch (error) {
    if (
      error &&
      error.extensions &&
      (error.extensions.code === 'USER_IS_NOT_AUTHORISED' ||
        error.extensions.code === 'ALREADY_UPVOTED')
    ) {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
