import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';

const TakeUserDetails = (props) => {
    const { handleChange, handleSubmit, loggedIn, imageFileUploadProgress,
         isLoading,Button_Text ,profilePic,formData,setFormData} = props;
         
            // console.log("user-> ",formData);
         
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <form className="flex flex-col gap-4 align-items:center" onSubmit={handleSubmit}>
                <input type='file' accept='image/*' hidden></input>
                <div className='relative w-32 h-32 self-center  cursor-pointer shadow-md overflow-hidden rounded-full' >
                    <img src={profilePic} alt="user" className={`rounded-full w-full h-full object-cover border-8  border-[lightgray] `} />
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
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                                        })`,
                                },
                            }}
                        />
                    }

                </div>
                <div>
                    <Label value="Username*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={formData?.username?formData.username:""}
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
                        value={formData?.name?formData.name:""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Contact*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="+91-0000000000"
                        id="mobileNum"
                        value={formData?.mobileNum?formData.mobileNum:""}
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
                        value={formData?.collegeId?formData.collegeId:""}
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
                        value={formData?.graduationYear?formData.graduationYear:""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="College*"></Label>
                    <Select
                        id="college"
                        name="college"
                        value={formData?.college?formData.college:""}
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
                        value={formData?.course?formData.course:""}
                        onChange={handleChange}
                    >
                        <option selected>Choose your Course </option>
                        <option value="BTech">BTech</option>
                        <option value="MCA">MCA</option>
                        <option value="MTech">MTech</option>

                    </Select>
                </div>

                <div>
                    <Label value="CGPA*" ></Label>
                    <TextInput
                        required
                        type="float"
                        placeholder="9.23"
                        id="cgpa"
                        value={formData?.cgpa?formData.cgpa:""}
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
                        value={formData?.state?formData.state:""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Hosteller*"></Label>
                    <Select
                        id="hostler"
                        name="hostler"
                        value={formData?.hostler?formData.hostler:""}
                        onChange={handleChange}
                    >
                        {/* <option selected> </option> */}
                        <option value="true">YES</option>
                        <option value="false">NO</option>

                    </Select>
                </div>
                <div>
                    <Label value="Gender*"></Label>
                    <Select
                        id="gender"
                        name="gender" 
                        value={formData.gender?formData.gender:""}
                        onChange={handleChange}
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
                        id="department"
                        name="department"
                        value={formData.department?formData.department:""}
                        onChange={handleChange}
                    >
                        <option selected>Choose your College </option>
                        <option value="COMPUTER_SCIENCE_AND_ENGINEERING">CSE</option>
                        <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">ECE</option>
                        <option value="ELECTRICAL_ENGINEERING">EE</option>
                        <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">EI</option>
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
                        value={formData.leetcodeProfile?formData.leetcodeProfile:""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Codeforces Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://codeforces.com/username/"
                        id="codeforcesProfile"
                        value={formData.codeforcesProfile?formData.codeforcesProfile:""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Linkedin Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://linkedin.com/username/"
                        id="linkedProfile"
                        value={formData.linkedProfile?formData.linkedProfile:""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Github Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://github.com/username/ "
                        id="githubProfile"
                        value={formData.githubProfile?formData.githubProfile:""}
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
    )
}

export default TakeUserDetails;