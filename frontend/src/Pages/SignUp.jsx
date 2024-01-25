import { Button, Label, TextInput} from 'flowbite-react'
import {Link} from "react-router-dom"
import React, { useState } from 'react'

function SignUp() {
  const [formData,setFormData]=useState({})
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white'>MindSet</span>
          </Link>
            <p className='text-sm mt-5 '>
              This is a demo project. You can Sign Up with your email and password.
              Or with Google.
            </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username' >
              </Label>
              <TextInput type='text' placeholder='Username' id="username" onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value='Your Email' >
              </Label>
              <TextInput type='email' placeholder='name@company.com' id="email" onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value='Your Password' >
              </Label>
              <TextInput type='password' placeholder='Password' id="password" onChange={handleChange}></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit'>
              SignUp
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already Have an Account ?</span>
            <Link to={'/singIn'} className='text-blue-500'>SignIn</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
