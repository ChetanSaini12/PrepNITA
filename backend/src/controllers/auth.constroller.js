import asyncHandler from '../utils/AsyncHandle.js'
import ApiError from '../utils/ApiError.js'

const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = res.body

  if (!usernameOrEmail || !password) {
    throw new ApiError(400, 'Please fill all required fields!!')
  }
})

const logoutUser = asyncHandler(async (req, res) => {})

const registerUser = asyncHandler(async (req, res) => {})

export { loginUser, logoutUser, registerUser }
