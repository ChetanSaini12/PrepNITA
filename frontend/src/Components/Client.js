import React from 'react'
import Avatar from 'react-avatar';

const Client = (props) => {
  return (
    <div className='client'>
      <Avatar name={props.userName} size={50} round='14px'/>

      <span className='userName'>{props.userName}</span>

    </div>
  )
}

export default Client
