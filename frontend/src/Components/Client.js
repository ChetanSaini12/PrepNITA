import React from "react";
import Avatar from "react-avatar";

const Client = (props) => {
  console.log("wtf:", props);
  return (
    <div className="flex flex-col items-center gap-2 p-2 text-white font-bold">
      <Avatar name={props.username} size={50} round="14px" />
      <span>{props.username}</span>
    </div>
  );
};

export default Client;
