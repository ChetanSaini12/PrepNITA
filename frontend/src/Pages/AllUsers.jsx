// Its a temparory file created for making a sample graphQl query

import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { All_USER } from "../gqlOperatons/mutations";
import toast from "react-hot-toast";
import { Loader } from "./Loader";
import SearchBar from "../Components/SearchBar";
import { Dropdown, Select, TextInput } from "flowbite-react";

function AllUsers() {
  // const { data, loading: queryLoading, error: queryError } = useQuery(ALL_USER);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const [filter, setFilter] = useState({});
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callBackend, setCallBackend] = useState(true);
  const [optionsIndex, setOptionsIndex] = useState(0);

  const options = [
    "username",
    "name",
    "mobileNum",
    // 
    "gender",//Gender
    "cgpa",//float->String
    "department",//Department
    "course",//Course
    "hosteler",//boolean->String
    "graduation_year",//Int->String
    // 
    "college_id",
    "college",
    "state",
    "leetcodeProfile",
    "codeforcesProfile",
    "linkedinProfile",
    "githubProfile",
  ]

  const [searchUser] = useMutation(All_USER, {
    onError: (error) => {
      console.log("error in allUser ", error || error.message);
      toast.error(error || error.message);
    },
  });

  const handleChange = (e) => {
    if (e.target.id === "hosteler") {
      setFilter({ ...filter, [e.target.id]: e.target.value == "yes" ? true : false });
    }
    else if (e.target.id === "cgpa") {
      setFilter({ ...filter, [e.target.id]: parseFloat(e.target.value) });
    }
    else if (e.target.id === "graduation_year") {
      setFilter({ ...filter, [e.target.id]: parseInt(e.target.value) });
    }
    else
      setFilter({ ...filter, [e.target.id]: e.target.value });
    console.log("filter", filter);
    // setFetch(!fetch);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (filter[options[optionsIndex]] === undefined || filter[options[optionsIndex]] === "") {
      filter[options[optionsIndex]] = " ";
      setFilter(filter);
      // setFormData(...formData, { [options[optionsIndex]]: " " });
      toast.error("Please enter the value for the selected filter");
    }
    else if (typeof(filter[options[optionsIndex]])=="number" &&isNaN(filter[options[optionsIndex]])) {
      filter[options[optionsIndex]] = 0;
      setFilter(filter);
      // setFormData(...formData, { [options[optionsIndex]]: " " });
      toast.error("Please enter the value for the selected filter 2");
    }
    else
      setFormData(filter);
    setFetch(!fetch);
  };
  const deleteFilter = (props) => {
    if (filter) {
      console.log("delete filetr 1", filter[props]);
      delete filter[props];
      console.log("delete filetr 1", filter[props]);
      setFormData(filter);
      // setFilter(filter);
      // setCallBackend(!callBackend);

    }
    setFetch(!fetch);
  };


  const handleSubmitSearch = (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        console.log(`${key}: ${formData[key]}`);
        if (typeof formData[key] === "string") {
          if (formData[key].trim().length < 1) {
            delete formData[key];
          }
        }
        // else if(formData[key] === 0){
        //   delete formData[key];
        // }
      }
    }
    console.log("serach filter criteria", formData);
    setCallBackend(!callBackend);
  };

  useEffect(() => {
    setLoading(true);
    // if (callBackend) {
    searchUser({
      variables: {
        user: formData,
      },
    }).then(user => {
      console.log("user in AllUser", user);
      setLoading(false);
      setData(user.data.getAllUser);
      console.log("data ",data);
    })
      .catch(error => {
        console.log("error in allUser catch block ", error || error.message);
        setLoading(false);
        toast.error(error || error.message);
      });
    // }


    console.log("option index", optionsIndex);
  }, [callBackend]);


  useEffect(() => {
    // setFilter(filter);
    setFormData(filter);
  }, [fetch]);

  return (
    <>
      {loading && <Loader />}
      < div className="flex h-screen items-center flex-col" >
        <div className="mb-5">
          Search Bar
          <form className="flex gap-2 " onSubmit={handleSubmitSearch}   >
            <Select
              className="text-black"
              onChange={(e) => { setOptionsIndex(e.target.value); }}
            >
              <option selected disabled>Select filters </option>
              {options?.map((choice, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {choice}

                </option>
              ))}
            </Select>

            {options[optionsIndex] === "gender" && (
              <Select id={options[optionsIndex]} onChange={handleChange}
              >
                <option selected disabled>Select your Gender </option>
                <option value={"MALE"} >Male</option>
                <option value={"FEMALE"} >Female</option>
                <option value={"TRANSGENDER"} >Transgender</option>
                <option value={"PREFER_NOT_TO_SAY"}>don't know</option>
              </Select>
            )}
            {options[optionsIndex] === "course" && (
              <Select id={options[optionsIndex]} onChange={handleChange}
              >
                <option selected disabled>Select your Course </option>
                <option value={"BTech"} >BTech</option>
                <option value={"MTech"} >MTech</option>
                <option value={"MCA"} >MCA</option>
                <option value={"PhD"}>PhD</option>
              </Select>
            )}
            {options[optionsIndex] === "department" && (
              <Select id={options[optionsIndex]} onChange={handleChange}
              >
                <option selected disabled>Select your Department </option>
                <option value={"COMPUTER_SCIENCE_AND_ENGINEERING"} >CSE</option>
                <option value={"ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING"} >ECE</option>
                <option value={"ELECTRICAL_ENGINEERING"} >Electrical</option>
                <option value={"ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING"}>EI</option>
                <option value={"MECHANICAL_ENGINEERING"}>Mechanical</option>
                <option value={"CHEMICAL_ENGINEERING"}>Chemical</option>
                <option value={"CIVIL_ENGINEERING"}>Civil</option>
                <option value={"PRODUCTION_ENGINEERING"}>Production</option>
                <option value={"BIO_TECH_AND_BIO_ENGINEERING"}>BioTech & Bio</option>
              </Select>
            )}
            {options[optionsIndex] === "hosteler" && (
              <Select id={options[optionsIndex]} onChange={handleChange}
              >
                <option selected disabled>Are you hosteler ?</option>
                <option value={"yes"} >Yes</option>
                <option value={"no"} >No</option>
                {/* <option value={"MCA"} >MCA</option>
                <option value={"PhD"}>PhD</option> */}
              </Select>
            )}
            {options[optionsIndex] === "graduation_year" && (
              <TextInput
                // required
                type="number"
                placeholder={options[optionsIndex]}
                id={options[optionsIndex]}
                value={parseInt(filter[options[optionsIndex]]) || ""}
                onChange={handleChange}
              />
            )}
            {options[optionsIndex] === "cpga" && (
              <TextInput
                // required
                type="float"
                placeholder={options[optionsIndex]}
                id={options[optionsIndex]}
                value={parseFloat(filter[options[optionsIndex]]) || ""}
                onChange={handleChange}
              />
            )}
            {!(options[optionsIndex] === "gender" || options[optionsIndex] === "cpga" || options[optionsIndex] === "department" ||
              options[optionsIndex] === "course" || options[optionsIndex] === "hosteler" || options[optionsIndex] === "graduation_year") && (
                <TextInput
                  // required
                  type="text"
                  placeholder={options[optionsIndex]}
                  id={options[optionsIndex]}
                  value={filter[options[optionsIndex]] || ""}
                  onChange={handleChange}
                />
              )}







            <button onClick={handleFilter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add filter </button>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
          </form>
        </div>
        <h1>.....your filters........</h1>
        <div className="flex flex-wrap gap-3 my-2 ">
          {formData && Object.keys(formData).map((key, index) => (
            <>
              {key == "hosteler" && (
                <div key={index} className=" p-2 rounded-md">{key} : {formData[key] ? "yes" : "no"}</div>
              )}
              {key !== "hosteler" &&
                <div key={index} className=" p-2 rounded-md">{key} : {formData[key]}</div>
              }
              <button onClick={() => deleteFilter(key)}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">X</button>
            </>
          ))

          }
        </div>

        {
          data && data.length !== 0 ? (
            <>
              <div className="w-full ">
                <table className="flex flex-col justify-start mx-20 gap-3">
                  <thead>
                    <tr className=" flex justify-between">
                      <th>ID</th>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile Num</th>
                    </tr>
                    <div className="border my-2"></div>
                  </thead>
                  <tbody>
                    {data?.map((user, index) => (
                      <tr key={index} className="flex justify-between my-2">
                        <td>{index + 1}</td>
                        <td>{user.userInformation.username}</td>
                        {/* <td>{"hello"}</td> */}
                        <td>{user.userInformation.name}</td>
                        <td>{user.userInformation.email}</td>
                        <td>{user.userInformation.mobileNum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>

          ) : (
            <>
              <div>User not exist !!</div>
            </>
          )
        }
      </div >
      <div className="bg-primary-color text-text-color p-default-padding">AllUsers</div>
      {data && (
        <>
          {data.getAllUser.map((user) => (
            <div key={user.id} className="bg-secondary-color text-text-color p-default-padding my-medium-spacing rounded border border-element-color">
              <div className="mb-small-spacing">USERNAME : {user.username}</div>
              <div className="mb-small-spacing">FIRSTNAME : {user.firstName}</div>
              <div className="mb-small-spacing">LASTNAME : {user.lastName}</div>
              <div className="mb-small-spacing">EMAIL : {user.email}</div>
              <div className="mb-small-spacing">MOBILENUM : {user.mobileNum}</div>
            </div>
          ))}
        </>
      )}
      {queryLoading && <div className="text-text-color">Loading...</div>}
      {queryError && <div className="text-text-color">{queryError.message}</div>}
    </>
  );
}

export default AllUsers;