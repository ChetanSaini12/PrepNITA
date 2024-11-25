import React from 'react'

export const LinearLoader = () => {
    return (

        <div className=" linearLoader-container"
            style={{
                position: 'fixed',
                top: '5',
                zIndex: '9999',
            }}
        >
            <div className="linearLoader"></div>
        </div>

    )
}
