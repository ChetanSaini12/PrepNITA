import React from 'react'
import {VerifyToken } from '../Components/Auth'

function Home() {
  VerifyToken();
  return (
    <div className='bg-slate-600 w-screen h-screen border-spacing-0'>
      <div >Home</div>
      <div>Hello World</div>
    </div>
  )
}

export default Home