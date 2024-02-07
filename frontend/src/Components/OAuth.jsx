import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'

function OAuth() {
  return (
    <Button type='button'gradientDuoTone='pinkToOrange' outline >
        <AiFillGoogleCircle className='w-6 h-6 mr-2' ></AiFillGoogleCircle>Continue with Google
    </Button>
  )
}

export default OAuth