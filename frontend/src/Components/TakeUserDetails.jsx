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
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <Dropdown label={formData?.[id] || placeholder} className="">
        {options.map(option => (
          <Dropdown.Item className="transition-all" key={option} onClick={() => handleChange({ target: { id, value: option } })}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown>
      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
    </div>
  );



  return (
    <>
      <div>
      <form className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300" onSubmit={handleFormSubmit}>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Profile Picture</h2>
          <div className="flex justify-center">
            <input type="file" accept="image/*" className="hidden" id="profilePicUpload" />
            <label htmlFor="profilePicUpload" className="relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full hover:shadow-lg transition-shadow duration-300">
              <img src={profilePic} alt="user" className="rounded-full w-full h-full object-cover border-4 border-lightgray" />
              {imageFileUploadProgress && imageFileUploadProgress < 100 &&
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                    },
                  }}
                />
              }
            </label>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal Information</h2>
          {[
            { label: 'Username', id: 'username', type: 'text', placeholder: 'Username' },
            { label: 'Full Name', id: 'name', type: 'text', placeholder: 'John Doe' },
            { label: 'Contact', id: 'mobileNum', type: 'text', placeholder: '0000000000', maxLength: 10, minLength: 10 },
            { label: 'Enrollment Number', id: 'collegeId', type: 'text', placeholder: '21UEE055' },
            { label: 'Graduation Year', id: 'graduationYear', type: 'number', placeholder: '2025' },
            { label: 'CGPA', id: 'cgpa', type: 'text', placeholder: '9.23', pattern: '^(?:10(?:\\.0+)?|\\d(\\.\\d{1,2})?)$' },
            { label: 'State', id: 'state', type: 'text', placeholder: 'Rajasthan' },
          ].map(({ label, id, type, placeholder, ...rest }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData?.[id] || ""}
                onChange={(e) => { handleChange(e); handleValidation(e); }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                {...rest}
              />
              {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 px-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Academic Information</h2>
          {[
            { label: 'College', id: 'college', placeholder: 'Choose your College',  options: ['NIT AGARTALA', 'IIIT AGARTALA'] },
            { label: 'Course', id: 'course', placeholder: 'Choose your Course', options: ['BTech', 'MCA', 'MTech'] },
            { label: 'Hosteller', id: 'hosteller', placeholder: 'Are you hosteller', options: ['YES', 'NO'] },
            { label: 'Gender', id: 'gender', placeholder: 'Choose your gender', options: ['MALE', 'FEMALE', 'TRANSGENDER', 'PREFER_NOT_TO_SAY'] },
            { label: 'Department', id: 'department', placeholder: 'Choose Your Department', options: ['CSE', 'ECE', 'EE', 'EI', 'Mechanical', 'Chemical', 'Civil', 'Production', 'Bio_Tech'] },
          ].map(renderDropdown)}
        </div>

        <div className="w-full px-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Profiles</h2>
          {[
            { label: 'Leetcode Profile', id: 'leetcodeProfile', type: 'text', placeholder: 'https://leetcode.com/username/' },
            { label: 'Codeforces Profile', id: 'codeforcesProfile', type: 'text', placeholder: 'https://codeforces.com/username/' },
            { label: 'LinkedIn Profile', id: 'linkedinProfile', type: 'text', placeholder: 'https://linkedin.com/username/' },
            { label: 'GitHub Profile', id: 'githubProfile', type: 'text', placeholder: 'https://github.com/username/' },
          ].map(({ label, id, type, placeholder, ...rest }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData?.[id] || ""}
                onChange={(e) => { handleChange(e); handleValidation(e); }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                {...rest}
              />
              {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
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
      <div className="max-w-lg mx-auto p-3 w-full">
        <form
          className="flex flex-col gap-4 align-items:center"
          onSubmit={handleSubmit}
        >
          <input type="file" accept="image/*"></input>
          <div className="relative w-32 h-32 self-center  cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              src={profilePic}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8  border-[lightgray] `}
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
          </div>
          <div>
            <Label value="Username*"></Label>
            <TextInput
              required
              type="text"
              placeholder="Username"
              id="username"
              value={formData?.username ? formData.username : ""}
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label value="Full Name*"></Label>
            <TextInput
              required
              type="text"
              placeholder="John Doe"
              id="name"
              value={formData?.name ? formData.name : ""}
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label value="Contact*"></Label>
            <TextInput
              required
              type="text"
              placeholder="0000000000"
              id="mobileNum"
              maxLength={10}
              minLength={10}
              value={formData?.mobileNum ? formData.mobileNum : ""}
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label value="Enrollment Number*"></Label>
            <TextInput
              required
              type="text"
              placeholder="21UEE055"
              id="collegeId"
              value={formData?.collegeId ? formData.collegeId : ""}
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label value="Graduation Year*"></Label>
            <TextInput
              required
              type="Integer"
              placeholder="2025"
              id="graduationYear"
              value={formData?.graduationYear ? formData.graduationYear : ""}
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label value="College*"></Label>
            <Select
              required
              id="college"
              name="college"
              value={formData?.college ? formData.college : ""}
              onChange={handleChange}
            >
              <option selected>Choose your College </option>
              <option value="NIT AGARTALA">NIT AGARTALA</option>
              <option value="IIIT AGARTALA">IIIT AGARTALA</option>
            </Select>
          </div>
          <div>
            <Label value="Course*"></Label>
            <Select
              required
              id="course"
              name="course"
              value={formData?.course ? formData.course : ""}
              onChange={handleChange}
            >
              <option selected>Choose your Course </option>
              <option value="BTech">BTech</option>
              <option value="MCA">MCA</option>
              <option value="MTech">MTech</option>
            </Select>
          </div>

          <div>
            <Label value="CGPA*"></Label>
            <TextInput
              required
              type="float"
              placeholder="9.23"
              id="cgpa"
              pattern="^(?:10(?:\.0+)?|\d(\.\d{1,2})?)$"
              value={formData?.cgpa ? formData.cgpa : ""}
              onChange={handleChange}
            ></TextInput>
          </div>

          <div>
            <Label value="State*"></Label>
            <TextInput
              required
              type="text"
              placeholder="Rajasthan"
              id="state"
              value={formData?.state ? formData.state : ""}
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label value="Hosteller*"></Label>
            <Select
              required
              id="hosteler"
              name="hosteller"
              value={formData?.hosteler ? formData.hosteler : ""}
              onChange={handleChange}
            >
              <option selected>Are you hosteller</option>

              <option value="true">YES</option>
              <option value="false">NO</option>
            </Select>
          </div>
          <div>
            <Label value="Gender*"></Label>
            <Select
              required
              id="gender"
              name="gender"
              value={formData.gender ? formData.gender : ""}
              onChange={handleChange}
              defaultValue={"Choose your gender"}
            >
              <option selected>Choose your gender </option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="TRANSGENDER">TRANSGENDER</option>
              <option value="PREFER_NOT_TO_SAY">PREFER_NOT_TO_SAY</option>
            </Select>
          </div>

          <div>
            <Label value="Department*"></Label>
            <Select
              required
              id="department"
              name="department"
              onChange={handleChange}
              value={formData.department ? formData.department : ""}
            >
              <option selected>Choose Your Department </option>
              <option value="COMPUTER_SCIENCE_AND_ENGINEERING">CSE</option>
              <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">
                ECE
              </option>
              <option value="ELECTRICAL_ENGINEERING">EE</option>
              <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">
                EI
              </option>
              <option value="MECHANICAL_ENGINEERING">Mechanical</option>
              <option value="CHEMICAL_ENGINEERING">Chemical</option>
              <option value="CIVIL_ENGINEERING">Civil</option>
              <option value="PRODUCTION_ENGINEERING">Production</option>
              <option value="BIO_TECH_AND_BIO_ENGINEERING">Bio_Tech</option>
            </Select>
          </div>
          <div>
            <Label value="Leetcode Profile"></Label>
            <TextInput
              type="text"
              placeholder="https://leetcode.com/username/"
              id="leetcodeProfile"
              onChange={handleChange}
              value={formData?.leetcodeProfile ? formData.leetcodeProfile : ""}
            ></TextInput>
          </div>
          <div>
            <Label value="Codeforces Profile"></Label>
            <TextInput
              type="text"
              placeholder="https://codeforces.com/username/"
              id="codeforcesProfile"
              onChange={handleChange}
              value={
                formData?.codeforcesProfile ? formData.codeforcesProfile : ""
              }
            ></TextInput>
          </div>
          <div>
            <Label value="Linkedin Profile"></Label>
            <TextInput
              type="text"
              placeholder="https://linkedin.com/username/"
              id="linkedinProfile"
              onChange={handleChange}
              value={formData?.linkedinProfile ? formData.linkedinProfile : ""}
            ></TextInput>
          </div>
          <div>
            <Label value="Github Profile"></Label>
            <TextInput
              type="text"
              placeholder="https://github.com/username/ "
              id="githubProfile"
              value={formData?.githubProfile ? formData.githubProfile : ""}
              onChange={handleChange}
            ></TextInput>
          </div>

          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm"></Spinner>
                <span>Loading...</span>
              </>
            ) : (
              Button_Text
            )}
          </Button>
        </form>

        {/* {error && (
                <Alert className="mt-5" color="failure">
                  {error}
                </Alert>
              )} */}
      </div>
    </>
  );
};

export default TakeUserDetails;
