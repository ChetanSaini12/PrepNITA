// Its a temparory file created for making a sample graphQl query


import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_USER } from "../gqlOperatons/queries";

function AllUsers() {
  const { data, loading: queryLoading, error: queryError } = useQuery(ALL_USER);
  
  return (
    <>
      <div>AllUsers</div>
      {data && (
        <>
          {data.getAllUser.map((user) => (
            <div key={user.id}>
              <div>USERNAME : {user.username}</div>
              <div>EMAIL : {user.email}</div>
              <div>MOBILENUM : {user.mobileNum}</div>
            </div>
          ))}
        </>
      )}
      {queryLoading && <div>Loading...</div>}
      {queryError && <div>{queryError.message}</div>}
    </>
  );
}

export default AllUsers;
