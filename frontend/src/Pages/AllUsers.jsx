// Its a temparory file created for making a sample graphQl query


import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_USER } from "../gqlOperatons/queries";
import { TEMP_MUT } from "../gqlOperatons/mutations";

function AllUsers() {
  const { data, loading: queryLoading, error: queryError } = useQuery(ALL_USER);
  const [tempData, setTempData] = useState("");
  const [tempStr, { loading: mutationLoading, error: mutationError }] = useMutation(TEMP_MUT, {
    variables: { tempVal: "JAI SHREE RAM!!" },
    onCompleted: (data) => {
      // Update state with the received string
      setTempData(data.tempMut);
    },
  });

  if(mutationError) 
  {
    return <div className='p-10'>ERROR IN MUT </div>
  }

  return (
    <>
      <div>AllUsers</div>
      {data && (
        <>
          {data.getAllUser.map((user) => (
            <div key={user.id}>
              <div>USERNAME : {user.username}</div>
              <div>FIRSTNAME : {user.firstName}</div>
              <div>LASTNAME : {user.lastName}</div>
              <div>EMAIL : {user.email}</div>
              <div>MOBILENUM : {user.mobileNum}</div>
            </div>
          ))}
        </>
      )}
      {queryLoading && <div>Loading...</div>}
      {queryError && <div>{queryError.message}</div>}
      <button className="p-5"
        onClick={tempStr}
      >
        CLICK
      </button>
      {mutationLoading && <div>Loading...</div>}
      {mutationError && <div>{mutationError.message}</div>}
      <div>{tempData}</div>
    </>
  );
}

export default AllUsers;
