import {prisma} from '../../prisma/index.js'
import ApiError from '../utils/ApiError.js'
import {GraphQLError} from 'graphql'

export const createUserInDB = async (_, payload) => {
  console.log("Creating user" , payload);

  const existingUser = await prisma.user.findUnique({
    where: {
      username: payload.User.username,
    },
  });
  // if(existingUser) return  new ApiError(400, 'username already exist ');
  if(existingUser) throw new GraphQLError('User already exist ', {
    extensions : {
      code : 'FORBIDDEN'
    }
  })

  const user = await prisma.user.create({
    data: payload.User,
  })
  return user
}
