import { checkOtpForEmail } from '../../controllers/Auth/checkOTPForEmail.js'
import { registerUser } from '../../controllers/Auth/register.js'
import { sendVerificationMail } from '../../controllers/Auth/sendVerifyMail.js'
import { checkRole } from '../../middlewares/checkRole.js'
import { updateUserRole } from '../../controllers/User/updateUserRole.js'
import { getAllUserData } from '../../controllers/User/getAllUserData.js'
import { getCurrentUser } from '../../controllers/User/getCurrentUser.js'
import { onboardUser } from '../../controllers/Auth/onboardUser.js'


const queries = {
  getAllUser: () => getAllUserData(),
  getMe: (_,__, context) => getCurrentUser(_, __, context),
}

const mutations = {
  registerUser: (_, payload) => registerUser(_, payload),
  sendVerifyMail: (_, payload) => sendVerificationMail(_, payload),
  checkOTPForEmail: (_, payload) => checkOtpForEmail(_, payload),
  onboardUser: (_, payload, context) => onboardUser(_, payload, context),
  updateUserRole: (_, payload, context) => checkRole({_, payload, context}, updateUserRole),
  getUserById: (_, payload) => getUserById(_, payload.id)
} 

export const resolvers = { queries, mutations }
