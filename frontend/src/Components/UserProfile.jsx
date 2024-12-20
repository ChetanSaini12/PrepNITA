import React, { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";

export const UserProfile = ({ userData }) => {
  // console.log("userData in user profile component ",userData)
  // useEffect(()=>{

  // },[userData]);
  // console.log("hosteller", userData);
  return (
    <div className="flex flex-col justify-center items-start my-4 gap-5 px-2">
      <div className=" flex justify-between items-center w-full gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm sm:text-xl font-semibold text-cyan-500 ">
            {userData.name}
          </div>
          <div className="flex text-sm items-center justify-start gap-2">
            <div><FaUserAlt></FaUserAlt></div>
            <div>
              {userData.username || "NULL"}
            </div>
          </div>
          <div className="flex text-sm items-center justify-start gap-2">
            <div><FaViber></FaViber></div>
            <div>
              {userData.mobileNum || "NULL"}
            </div>
          </div>
          <div className="flex text-sm items-center justify-start gap-2">
            <div><FaEnvelope></FaEnvelope></div>
            <div>
              {userData.email || "NULL"}
            </div>
          </div>
          <div className="flex text-sm items-center justify-start gap-2">
            <div><FaHome></FaHome></div>
            <div>
              {userData.state?.toLowerCase() || "NULL"}
            </div>
          </div>
          <div className="flex text-sm items-center justify-start gap-2">
            <div>Coding Profiles : </div>
            <div>
            {userData.linkedinProfile && 
              <a
                href={userData.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            }
            </div>

            <div>
              {userData.githubProfile && 
                <a
                href={userData.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              }   
            </div>
            <div>
              {userData.codeforcesProfile && 
                <a
                href={userData.codeforcesProfile}
                target="_blank"
                rel="noopener noreferrer"
                >
                  <SiCodeforces />
                </a>
              }
            </div>
            <div>
              {userData.leetcodeProfile && 
                <a
                href={userData.leetcodeProfile}
                target="_blank"
                rel="noopener noreferrer"
                >
                  <SiLeetcode />
                </a>
              }
            </div>

          </div>
        </div>

        <img
          src={
            userData.profilePic ||
            "https://images.pexels.com/photos/2690774/pexels-photo-2690774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt="Profile Picture"
          className="rounded-full w-20 sm:w-40 sm:h-40  object-cover border-4   border-[cyan] "
        />
      </div>
      <div className=" w-full flex justify-evenly gap-5 border border-cyan-500   bg-sky-600 "></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-auto w-full">
        <div className=" flex flex-col gap-3">
          <div className="text-lg font-semibold p-2 text-cyan-500">
            Academics
          </div>
          <LabelAndTextInput label="College Name" value={userData.college} />
          <LabelAndTextInput label="Enrollment" value={userData.collegeId} />
          <LabelAndTextInput
            label="Graduation Year"
            value={userData.graduationYear}
          />
          <LabelAndTextInput label="Course" value={userData.course} />
          <LabelAndTextInput label="Department" value={userData.department} />
          <LabelAndTextInput label="CGPA" value={userData.cgpa} />
          <LabelAndTextInput
            label="Hosteller"
            value={userData.hosteler ? "YES" : "NO"}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

const LabelAndTextInput = ({ label, value }) => {
  return (
    <div className="flex justify-start  flex-wrap pl-2 gap-3 ">
      <div className=" text-sm md:text-lg lg:text-lg break-words  text-wrap  font-semibold ">
        {label + " : "}
      </div>
      <div className=" text-sm md:text-lg lg:text-lg break-words text-wrap">
        {value}
      </div>
    </div>
  );
};
