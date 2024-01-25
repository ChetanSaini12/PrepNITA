import { loginUser, logoutUser, registerUser } from "../controllers/auth.constroller"
import { Router } from "express"

const router = Router()

router.use('/login').post(loginUser)
router.use('/logout').post(logoutUser)
router.use('/register').post(registerUser)