import React from 'react'

const InterviewDetails = ({ interview }) => {

  console.log("Interview details page  ", interview);

  return (

    <div className='w-screen h-screen flex flex-col'>
      <h1> Interviw details </h1>
      {interview && interview.map((interview) => (
        <div key={interview.id}>
          <h1>{interview.id}</h1>
          <h1>{interview.startTime}</h1>
          <h1>{interview.duration}</h1>
          <h1>{interview.topics}</h1>
        </div>
      ))
      }

    </div>
  )
}


export default InterviewDetails;
