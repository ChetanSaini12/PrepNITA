import React, { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
export default function AdminInterview() {
  const [buttonIndex, setButtonIndex] = useState(0);

  const baseButtonClass = "text-sm p-2 w-2/3 ";
  const selectedButtonClass =
    "bg-gray-200 dark:bg-gray-800 border-t border-l border-r rounded-t";
  const nonSelectedButtonClass = "border-b";

  return (
    <div className="m-6">
      {/* <h1 className="text-3xl">Interview</h1> */}
      <h1 className="text-1xl">My Interview as an Admin</h1>
      <div className="flex">
        <button
          className={`${baseButtonClass} ${
            buttonIndex === 0 ? selectedButtonClass : nonSelectedButtonClass
          }`}
          onClick={() => setButtonIndex(0)}
        >
          Yet to be assigned
        </button>
        <button
          className={`${baseButtonClass} ${
            buttonIndex === 1 ? selectedButtonClass : nonSelectedButtonClass
          }`}
          onClick={() => setButtonIndex(1)}
        >
          Assigned to me
        </button>
        <button
          className={`${baseButtonClass} ${
            buttonIndex === 2 ? selectedButtonClass : nonSelectedButtonClass
          }`}
          onClick={() => setButtonIndex(2)}
        >
          Interviewed
        </button>
      </div>
    </div>
  );
}
