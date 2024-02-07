import asyncHandler from '../utils/AsyncHandle.js'
import ApiError from '../utils/ApiError.js'
import ApiSuccess from '../utils/ApiSuccess.js'
import { prisma } from '../../prisma/index.js'

const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = res.body

  if (!usernameOrEmail || !password) {
    throw new ApiError(400, 'Please fill all required fields!!')
  }
})

const logoutUser = asyncHandler(async (req, res) => {})

const registerUser = async (req, res) => {

  console.log("AA RHA H/");
  
  const {
    email,
    username,
    name,
    password,
    role
  } = req.body
  
  console.log("DEBUG1");
  const user = await prisma.user.create({
    data:{
      email,
      username,
      name,
      password,
      role
    }
  })
  console.log("DEBUG2");
  user.password = undefined
  if(user) {
    return res.status(200).json(new ApiSuccess(200, user, "User registered Successfully!!"))
  }
}

export { loginUser, logoutUser, registerUser }
