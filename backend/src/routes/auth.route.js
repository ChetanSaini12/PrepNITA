import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/auth.constroller.js'
import { Router } from 'express'

const authRouter = Router()

authRouter.route('/login').post(loginUser)
authRouter.route('/logout').post(logoutUser)
authRouter.route('/register').post(registerUser)

export default authRouter
