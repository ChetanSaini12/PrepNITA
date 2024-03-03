// Its a temparory file created for making a sample graphQl query

import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { All_USER } from "../gqlOperatons/mutations";
import toast from "react-hot-toast";
import { Loader } from "./Loader";
import SearchBar from "../Components/SearchBar";
import { TextInput } from "flowbite-react";

function AllUsers() {
  // const { data, loading: queryLoading, error: queryError } = useQuery(ALL_USER);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const [searchUser] = useMutation(All_USER, {
    onError: (error) => {
      console.log("error in allUser ", error || error.message);
      toast.error(error || error.message);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // console.log("serach filter criteria", formData);
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        console.log(`${key}: ${formData[key]}`);
        if (formData[key].trim().length < 1) {
          delete formData[key];
        }
      }
    }
    setFetch(!fetch);
  };

  useEffect(() => {
    setLoading(true);
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
        return toast.error(error || error.message);
      });

  }, [fetch]);


  return (
    <div className="flex h-screen items-center flex-col">
      <div className="mb-5">
        Search Bar
        <form className="flex gap-2 "
          onSubmit={handleSubmitSearch}
        >
          <TextInput placeholder="Name"
            type="text"
            id="name"
            onChange={handleChange}
            className="min-w-2xl mx-auto items-center justify-center gap-5"
          />
          <TextInput placeholder="User_name"
            type="text"
            id="username"
            onChange={handleChange}
            className="min-w-2xl mx-auto items-center justify-center gap-5"
          />
          <TextInput placeholder="Mobile Number"
            type="text"
            id="mobileNum"
            onChange={handleChange}
            className="min-w-2xl mx-auto items-center justify-center gap-5"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
        </form>
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