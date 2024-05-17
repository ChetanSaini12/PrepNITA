import { Button } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';
import Home from './Home';

const PageNotFound = () => {
    return (
        <div className=' h-screen w-screen flex   justify-center jus m-5 '>

            <div >
                <h1 className='text-5xl mr-5'>
                    Page Not Found 404
                </h1>
                <Link to="/">
                    <Button className='my-10 ml-20'>Back to Home Page </Button>
                </Link>
            </div>
        </div >
    )
}

export default PageNotFound;
