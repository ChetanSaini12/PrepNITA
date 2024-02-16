import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
// import SearchBar from "../Components/SearchBar";

function DisplayUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableActive, setTableActive] = useState(true);
    const [filter, setFilter] = useState(0); // 1 for name, 2 for email
    const [text, setText] = useState("");
    const search_options = ["Id", "Name", "Email"];
    const navigate = useNavigate();
    


    const dummyData = [
        {
            id: "1",
            username: "username1",
            firstName: "first1",
            lastName: "last1",
            email: "email1",
            mobileNum: "12345678",
        },
        {
            id: "2",
            username: "username2",
            firstName: "first2",
            lastName: "last2",
            email: "email2",
            mobileNum: "12345678",
        },
        {
            id: "3",
            username: "username3",
            firstName: "first3",
            lastName: "last3",
            email: "email3",
            mobileNum: "12345678",
        },
        {
            id: "4",
            username: "username4",
            firstName: "first4",
            lastName: "last4",
            email: "email4",
            mobileNum: "12345678",
        },
    ];
    const [filteredResult, setFilteredResult] = useState(dummyData);
    const handleClickSearch = (props) => {
        // console.log("props",props);
        // console.log("text ", text,typeof(text ),filter);
        if (text.length == 0) {
            setTableActive(true);
            setFilteredResult(dummyData);
        } else {
            const tempData = [];

            if (filter == 0) {
                // Exact match for ID
                for (let i = 0; i < dummyData.length; i++) {
                    if (dummyData[i].id.includes(text)) {
                        tempData.push(dummyData[i]);
                    }
                }
            } else if (filter == 1) {
                // Partial match for Name
                for (let i = 0; i < dummyData.length; i++) {
                    if (
                        dummyData[i].firstName.includes(text) ||
                        dummyData[i].lastName.includes(text) ||
                        (dummyData[i].firstName + " " + dummyData[i].lastName).includes(text)
                    ) {
                        tempData.push(dummyData[i]);
                    }
                }
            } else if (filter == 2) {
                // Partial match for Email
                for (let i = 0; i < dummyData.length; i++) {
                    if (dummyData[i].email.includes(text)) {
                        tempData.push(dummyData[i]);
                    }
                }
            }

            setFilteredResult(tempData);
        }
    };
    return (
        <div className="flex h-screen items-center flex-col">
            {/* <div> */}
            <div>DisplayUsers</div>
            <SearchBar
                // setFilter = {}
                // props={[setText,setFilter,search_options]}
                props={{ filter, setText, setFilter, search_options, handleClickSearch }}
            />
            {filteredResult && filteredResult.length !== 0 ? (
                tableActive && (
                    <>
                        <div>
                            <table>
                                <thead>
                                    <tr className=" flex gap-20">
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile Num</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResult.map((user, index) => (
                                        <tr key={index} className="flex justify-between">
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.firstName + " " + user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.mobileNum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            ) : (
                <>
                    <div>Some Negative Message!!</div>
                </>
            )}
        </div>
    );
}

export default DisplayUsers;
