import { asyncHandler } from "../utils/AsyncHandle";

const loginUser = asyncHandler(async (req, res) => {
    const {
        usernameOrEmail,
        password
    } = res.body;

    if(!usernameOrEmail || !password) 
    {
        res.send({status : 402, message : "Please fill all required fields!!"})
    }    
})


const logoutUser = asyncHandler(async (req, res) => {

})


const registerUser = asyncHandler(async (req, res) => {

})

export {loginUser, logoutUser, registerUser}