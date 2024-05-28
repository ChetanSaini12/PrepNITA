import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/loader.json';

export const Loader = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,

    };

    return (
        <div className='flex items-center justify-center  w-screen h-screen border-spacing-0' >
            <Lottie
                options={defaultOptions}
                height={100}
                width={200}
            />
        </div >

    )
}
