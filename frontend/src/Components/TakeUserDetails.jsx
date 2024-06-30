import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Dropdown } from "flowbite-react";
import "react-circular-progressbar/dist/styles.css";

const TakeUserDetails = (props) => {
  const {
    handleChange,
    handleSubmit,
    loggedIn,
    imageFileUploadProgress,
    isLoading,
    Button_Text,
    profilePic,
    formData,
    setFormData,
  } = props;
  const [errors, setErrors] = useState({});

  const fields = [
    {
      label: "College",
      id: "college",
      placeholder: "Choose your college",
      options: [
        "National Institute of Technology AGARTALA",
        "Indian Institute of Information Technology AGARTALA",
      ],
    },
    {
      label: "Course",
      id: "course",
      placeholder: "Choose your course",
      options: ["BTech", "MCA", "MTech"],
    },
    {
      label: "Hosteller",
      id: "hosteller",
      placeholder: "Are you a hosteller",
      options: ["YES", "NO"],
    },
    {
      label: "Gender",
      id: "gender",
      placeholder: "Choose your gender",
      options: ["Male", "Female", "Transgender", "Prefer not to say"],
    },
    {
      label: "Department",
      id: "department",
      placeholder: "Choose your department",
      options: [
        "Computer Science & Engineering",
        "Electronics & Communication Engineering",
        "Electrical Engineering",
        "Electronics & Instrumentation Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Production Engineering",
        "Bio Tech & Bio Engineering",
      ],
    },
  ];

  const handleValidation = (e) => {
    const { id, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: !value.trim()
        ? `${id.replace(/([A-Z])/g, " $1").trim()} is required`
        : "",
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1").trim()} is required`;
      }
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      handleSubmit(e);
    }
  };

  const renderDropdown = ({ label, id, placeholder, options }) => (
    <div key={id} className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <Dropdown label={formData?.[id] || placeholder} className="px-2 py-1">
        {options.map((option, index) => (
          <Dropdown.Item
            className={`transition-all ${
              index !== options.length - 1 ? "border-b-2 border-slate-400" : ""
            }`}
            key={option}
            onClick={() => handleChange({ target: { id, value: option } })}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown>
      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          className="max-w-4xl m-4 p-8 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-50 rounded-lg shadow-lg transition-all duration-300"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Profile Picture
              </h2>
              <div className="flex justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profilePicUpload"
                />
                <label
                  htmlFor="profilePicUpload"
                  className="relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={profilePic}
                    alt="user"
                    className="rounded-full w-full h-full object-cover border-4 border-lightgray"
                  />
                  {imageFileUploadProgress && imageFileUploadProgress < 100 && (
                    <CircularProgressbar
                      value={imageFileUploadProgress || 0}
                      text={`${imageFileUploadProgress}%`}
                      strokeWidth={5}
                      styles={{
                        root: {
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        },
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            imageFileUploadProgress / 100
                          })`,
                        },
                      }}
                    />
                  )}
                </label>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Textual Information
              </h2>
              {[
                {
                  label: "Username",
                  id: "username",
                  type: "text",
                  placeholder: "john_doe12",
                },
                {
                  label: "Full Name",
                  id: "name",
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  label: "Contact",
                  id: "mobileNum",
                  type: "text",
                  placeholder: "0000000000",
                  maxLength: 10,
                  minLength: 10,
                },
                {
                  label: "Enrollment Number",
                  id: "collegeId",
                  type: "text",
                  placeholder: "21UXX001",
                },
                {
                  label: "Graduation Year",
                  id: "graduationYear",
                  type: "number",
                  placeholder: "2025",
                },
                {
                  label: "CGPA",
                  id: "cgpa",
                  type: "text",
                  placeholder: "9.23",
                  pattern: "^(?:10(?:\\.0+)?|\\d(\\.\\d{1,2})?)$",
                },
                {
                  label: "State",
                  id: "state",
                  type: "text",
                  placeholder: "Rajasthan",
                },
              ].map(({ label, id, type, placeholder, ...rest }) => (
                <div key={id} className="mb-4">
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={formData?.[id] || ""}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                    {...rest}
                  />
                  {errors[id] && (
                    <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full md:w-1/2 px-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Selective Information
              </h2>
              {fields.map(renderDropdown)}
            </div>

            <div className="w-full px-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Profiles
              </h2>
              {[
                {
                  label: "Leetcode Profile",
                  id: "leetcodeProfile",
                  type: "text",
                  placeholder: "https://leetcode.com/username",
                },
                {
                  label: "Codeforces Profile",
                  id: "codeforcesProfile",
                  type: "text",
                  placeholder: "https://codeforces.com/profile/username",
                },
                {
                  label: "LinkedIn Profile",
                  id: "linkedinProfile",
                  type: "text",
                  placeholder: "https://www.linkedin.com/in/username",
                },
                {
                  label: "GitHub Profile",
                  id: "githubProfile",
                  type: "text",
                  placeholder: "https://github.com/username",
                },
              ].map(({ label, id, type, placeholder, ...rest }) => (
                <div key={id} className="mb-4">
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={formData?.[id] || ""}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                    {...rest}
                  />
                  {errors[id] && (
                    <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full px-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-pink-500"
              >
                {Button_Text}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TakeUserDetails;
