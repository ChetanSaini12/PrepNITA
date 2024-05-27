import { prisma } from '../../../prisma/index.js' 
import { GraphQLError } from 'graphql'

export const deleteInterview = async (_, payload, context) => {
    try {
        if(context.userId)
        {
            const interview = await prisma.interview.findFirst({
                where : {
                    id : payload.interviewId
                }
            })
    
            if(interview)
            {
                if(interview.intervieweeId === context.userId)
                {
                    await prisma.interview.delete({
                        where : {
                            id : payload.interviewId
                        }
                    })
                    return `DELETED INTERVIEW WITH ID : ${interview.id}`
                }
                else 
                {
                    throw new GraphQLError("You can't delete someone else's created interview!!", {
                        extensions : {
                            code : 'INTERVIEW_IS_CREATED_BY_SOMEONE_ELSE'
                        }
                    })
                }
            }
            else 
            {
                throw new GraphQLError("No interview with given id", {
                    extensions : {
                        code : 'INTERVIEW_NOT_FOUND'
                    }
                })
            }
        }
        else 
        {
            throw new GraphQLError("User is not authorised!!", {
                extensions : {
                    code : 'USER_IS_NOT_AUTHORISED'
                }
            })
        }
    } catch (error) {
        if(error && error.extensions (error.extensions.code === 'USER_IS_NOT_AUTHORISED' || error.extensions.code === 'INTERVIEW_NOT_FOUND' || error.extensions.code === 'INTERVIEW_IS_CREATED_BY_SOMEONE_ELSE'))
        {
            throw error
        }
        else 
        {
            throw new GraphQLError("Something went wrong!!", {
                extensions : {
                    code : 'SOMETHING_WENT_WRONG!!'
                }
            })
        }
    }
}