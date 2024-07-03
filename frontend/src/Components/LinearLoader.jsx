import React from 'react'

export const LinearLoader = () => {
    return (

        <div class=" linearLoader-container"
            style={{
                position: 'fixed',
                top: '5',
                zIndex: '9999',
            }}
        >
            <div class="linearLoader"></div>
        </div>

    )
}
