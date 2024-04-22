import { Button } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';
import img404 from '../Assets/404.png'

const PageNotFound = () => {
    return (
        <div className=' min-h-96 w-screen flex   justify-center my-5 '>

            <div className='px-10 flex flex-col  items-center justify-center  '>
                <img src={img404}></img>
                <h1 className='text-2xl'>
                    Page Not Found 404
                </h1>
                <Link to="/">
                    <Button className='my-10 '>Back to Home Page </Button>
                </Link>
            </div>
        </div >
    )
}

export default PageNotFound;
