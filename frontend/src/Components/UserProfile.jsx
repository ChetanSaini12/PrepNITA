import React, { useEffect } from 'react';

export const UserProfile = ({userData}) => {
  // console.log("userData in user profile component ",userData)
  // useEffect(()=>{
    
  // },[userData]);
  console.log("hosteller", userData);
  return (
        <div className="flex flex-col justify-center items-start my-4 gap-5 mx-2">
          <div className=' flex justify-start sm:justify-center  items-center gap-4 sm:gap-6'>
            <img
              src={userData.profilePic || "https://images.pexels.com/photos/2690774/pexels-photo-2690774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              alt="Profile Picture"
              className="rounded-full w-20 sm:w-40 sm:h-40  object-cover border border-[blue] "
            />
            <div className=''>
              <h1 className='text-sm  sm:text-xl  font-semibold text-blue-500 '>
                {userData.name}
              </h1>
              <h2 className='text-sm   mb-4'>
                {"🆔" + userData.username}
              </h2>
              <div>
                ☏{"  " + userData.mobileNum}
              </div>
              <div>
                📧{"  " + userData.email}
              </div>
              <div className='flex gap-2'>
                {/* {<img className= ' rounded-sm bg-white h-5 w-5' src={genderIcon}></img>} */}
                {userData.gender === "MALE" ? "👦🏻 Male " :userData.gender==="FEMALE"? "👧🏻 Female":""}{"   🏚️  " + userData.state?.toLowerCase()}
              </div>
            </div>
  
          </div>
          <div className=' w-full flex justify-evenly  gap-5 border border-sky-500 rounded-sm bg-sky-600 '>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-auto w-full'>
            <div className=' flex flex-col gap-3'>
              <div className='text-lg font-semibold p-2 text-sky-500'>Academics</div>
              <LabelAndTextInput label="College Name" value={userData.college} />
              <LabelAndTextInput label="Enrollment" value={userData.collegeId} />
              <LabelAndTextInput label="Graduation Year" value={userData.graduationYear} />
              <LabelAndTextInput label="Course" value={userData.course} />
              <LabelAndTextInput label="Department" value={userData.department} />
              <LabelAndTextInput label="Cgpa" value={userData.cgpa} />
              <LabelAndTextInput label="Hosteller" value={userData.hosteler ? "YES" : "NO"} />
              {/* </div> */}
            </div>
  
            <div className="flex flex-col gap-3">
              {/* <div className="col-span-2 md:col-span-1"> */}
              <div className='text-lg font-semibold p-2 text-sky-500'>Coding profiles</div>
              <LabelAndTextInput label="Leetcode profile" value={userData.leetcodeProfile||"Not Provided"} />
              <LabelAndTextInput label="Codeforces profile" value={userData.codeforcesProfile||"Not Provided"} />
              <LabelAndTextInput label="Github profile" value={userData.githubProfile||"Not Provided"} />
              <LabelAndTextInput label="Linkedin profile" value={userData.linkedinProfile||"Not Provided"} />
              {/* </div> */}
              
            </div>
          </div>
        </div>
      )
}

const LabelAndTextInput = ({ label, value }) => {
    return (
      <div className='flex justify-start  flex-wrap pl-2 gap-3 '>
        <div className=' text-sm md:text-lg lg:text-lg break-words  text-wrap  font-semibold '>{label+" : "}</div>
        <div className=' text-sm md:text-lg lg:text-lg break-words text-wrap'>{value}</div>
      </div>
  
    );
  };
