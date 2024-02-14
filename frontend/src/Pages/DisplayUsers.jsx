// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import SearchBar from "../Components/SearchBar";

// function DisplayUsers() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tableActive, setTableActive] = useState(true);
//   const [filter, setFilter] = useState(0); // 1 for name, 2 for email
//   const [text, setText] = useState("");
//   const search_options = ["Id", "Name", "Email"];
//   const navigate = useNavigate();

//   const dummyData = [
//     {
//       id: "1",
//       username: "username1",
//       firstName: "first1",
//       lastName: "last1",
//       email: "email1",
//       mobileNum: "12345678",
//     },
//     {
//       id: "2",
//       username: "username2",
//       firstName: "first2",
//       lastName: "last2",
//       email: "email2",
//       mobileNum: "12345678",
//     },
//     {
//       id: "3",
//       username: "username3",
//       firstName: "first3",
//       lastName: "last3",
//       email: "email3",
//       mobileNum: "12345678",
//     },
//     {
//       id: "4",
//       username: "username4",
//       firstName: "first4",
//       lastName: "last4",
//       email: "email4",
//       mobileNum: "12345678",
//     },
//   ];

//   function search_result() {}

//   return (
//     <div className="flex h-screen items-center flex-col">
//       {/* <div> */}
//       <div>DisplayUsers</div>
//       <SearchBar
//         // setFilter = {}
//       />
//       {dummyData && dummyData.length != 0 ? (
//         tableActive && (
//           <>
//             <div>
//               <table>
//                 <thead>
//                   <tr className=" flex gap-20">
//                     <th>ID</th>
//                     <th>Username</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Mobile Num</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dummyData.map((user, index) => (
//                     <tr key={index} className="flex justify-between">
//                       <td>{index + 1}</td>
//                       <td>{user.username}</td>
//                       <td>{user.firstName + " " + user.lastName}</td>
//                       <td>{user.email}</td>
//                       <td>{user.mobileNum}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )
//       ) : (
//         <>
//           <div>Some Negative Message!!</div>
//         </>
//       )}
//     </div>
//   );
// }

// export default DisplayUsers;
