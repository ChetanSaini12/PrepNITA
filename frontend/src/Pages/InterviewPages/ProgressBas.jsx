import React from 'react';

const ProgressBar = ({ currentStatus }) => {
  const steps = [
    { status: 'Interview Scheduled', number: 1 },
    { status: 'Picked By Interviewer', number: 2 },
    { status: 'Interview in Progress', number: 3 },
    { status: 'Interview Completed', number: 4 },
    { status: 'Feedback Submitted', number: 5 }
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-5/6 py-6 flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="relative flex flex-col items-center text-teal-600">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  currentStatus >= step.number
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-teal-600'
                }`}
              >
                {step.number}
              </div>
              <div
                className={`absolute top-12 text-center text-xs w-24 ${
                  currentStatus >= step.number ? 'text-teal-600' : 'text-gray-400'
                }`}
              >
                {step.status}
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>-- Waiting for an interviewer to pick --</span>
        <span>-- Interview has been assigned to an interviewer and is ready to be conducted --</span>
        <span>-- Interview is currently taking place --</span>
        <span>-- Interview has been conducted, awaiting feedback --</span>
      </div> */}
    </div>
  );
};

export default ProgressBar;
