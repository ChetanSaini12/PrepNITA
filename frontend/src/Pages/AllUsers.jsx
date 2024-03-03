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
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [optionsIndex, setOptionsIndex] = useState(0);

  const options = [
    "username",
    "name",
    "mobileNum",
    // "gender",
    "college_id",
    "graduation_year",
    // "cgpa",
    "college",
    // "department",
    "course",
    "state",
    // "hosteler",
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log("formdata", formData);
    setFetch(!fetch);
  };


  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log("serach filter criteria", formData);
    setFetch(!fetch);
  };

  useEffect(() => {
    setLoading(true);
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        console.log(`${key}: ${formData[key]}`);
        if (formData[key].trim().length < 1) {
          delete formData[key];
        }
      }
    }
    searchUser({
      variables: {
        user: formData,
      },
    }).then(user => {
      console.log("user in AllUser", user);
      setLoading(false);
      setData(user.data.getAllUser);
    })
      .catch(error => {
        console.log("error in allUser catch block ", error || error.message);
        setLoading(false);
         toast.error(error || error.message);
      });


    console.log("option index", optionsIndex);
  }, [fetch]);



  return (
    <div className="flex h-screen items-center flex-col">
      <div className="mb-5">
        Search Bar
        <form className="flex gap-2 " onSubmit={handleSubmitSearch}   >
          <Select
            className="text-black"
            onChange={(e) => { setOptionsIndex(e.target.value); setFetch(!fetch) }}
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
          <TextInput
            type="text"
            placeholder={options[optionsIndex]}
            required
            id={options[optionsIndex]}
            onChange={handleChange}
          >

          </TextInput>

          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add filter </button> */}

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
        </form>
      </div>
      <h1>your filters</h1>
      <div className="flex flex-wrap gap-3 my-2 ">
        {formData && Object.keys(formData).map((key, index) => (
          <div key={index} className=" p-2 rounded-md">{key} : {formData[key]}</div>
        ))

        }
      </div>
      {data && data.length !== 0 ? (
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
                {data.map((user, index) => (
                  <tr key={index} className="flex justify-between my-2">
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNum}</td>
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
      )}
    </div>
  );
}

export default AllUsers;