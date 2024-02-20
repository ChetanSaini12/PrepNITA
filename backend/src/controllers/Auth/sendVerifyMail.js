import { prisma } from "../../../prisma/index.js"
import otpGenerator from 'otp-generator'
import moment from 'moment'
import sendEmail from '../../email/send.email.js'
import { GraphQLError } from "graphql"


export const sendVerificationMail = async (_, payload) => {
    const email = payload.email
    const existingUser = await prisma.user.findFirst({
      where: { email },
    })
    if (!existingUser) {
      throw new GraphQLError('User is not found!!', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      })
    }
  
    // Generate Otp for Email verification
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    }).toString()
  
    // Calculate expiry time as 10 minutes from current time
    const expiryTime = moment().add(5, 'minutes').format()
  
    // Set OTP and OtpExpiry in user
    console.log("OTP : ", otp, " Expiry time: ", expiryTime);
  
    await prisma.authentication.update({
      where: { userId: existingUser.id },
      data: {
        otpForEmail: otp,
        otpEmailExpiry: expiryTime,
      },
    })
  
    // Send email with otp for verification
  
    try {
      const messageBody = {
        subject: 'PrepNITA : Email Verification',
        template: 'verifymail',
        context: {
          otp: otp,
        },
      }
  
      await sendEmail(email, messageBody)
  
      return 'Email Sent successfully!!'
    } catch (error) {
      throw new GraphQLError('Error sending email', {
        extensions: {
          code: 'Email_For_Verification_Failed',
        },
      })
    }
  }