import React, { useEffect, useState } from 'react';

const Timer = ({onTimeUp,time,setTime}) => {
    // const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time <= 0) {
            onTimeUp();
            return;
        }

        const timerId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [time, onTimeUp]);

    return (
        <div>
            <h2 className='font-semibold'>Time Left: {time}s</h2>
        </div>
    );
};

export default Timer;
