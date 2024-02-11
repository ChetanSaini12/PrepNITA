import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("token", null);
        return navigate('/login');
    }, []);
    return (

        <div>Logout</div>
    )
}

export default Logout