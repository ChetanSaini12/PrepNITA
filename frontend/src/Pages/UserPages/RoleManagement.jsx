// Its a temparory file created for making a sample graphQl query

import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState, memo } from "react";
import { All_USER, UPDATE_USER_ROLE } from "../../gqlOperatons/User/mutations";
import toast from "react-hot-toast";
import { Loader } from "../Loader";
import SearchBar from "../../Components/SearchBar";
import { Button, Dropdown, Select, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../app/user/userSlice";
import { Link } from "react-router-dom";

function RoleManagement() {
    // const { data, loading: queryLoading, error: queryError } = useQuery(ALL_USER);
    const { isLoading } = useSelector((state) => state.user);
    const { theme } = useSelector(state => state.theme)
    const dispatch = useDispatch();

    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [filter, setFilter] = useState({});
    const [fetch, setFetch] = useState(false);
    const [callBackend, setCallBackend] = useState(true);
    const [optionsIndex, setOptionsIndex] = useState(0);
    const [ERROR, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [updatedRole, setUpdatedRole] = useState('');


    //  console.log("theme ",theme);

    const dummyUserProfilePic = '/userPic.png';
    const userRoles = ['USER', 'ADMIN', 'SUPERADMIN', 'MANAGER'];

    const handleRoleChange = (userId, newRole) => {
        setSelectedUserId(userId);
        setSelectedRole(newRole);
    };

    const handleCancelRole = () => {
        setSelectedRole('');
        setSelectedUserId(null);
    };

    const handleUpdateRole = async (userId, role) => {
        // console.log("user id , role ", userId, role);
        dispatch(setLoading(true));
        try {
            const { data, errors } = await updateUserRole({
                variables: {
                    id: parseInt(userId),
                    role: role
                },
            });
            if (errors) {
                console.log("error in update role", errors);
                return setError(errors);
            }
            else if (data) {
                // console.log("role updated successfully", data);
                setSelectedRole('');
                setSelectedUserId(null);
                setCallBackend(prev => !prev);
                toast.success(`Role updated as ${data.updateUserRole.charAt(0).toUpperCase() + data.updateUserRole.slice(1).toLowerCase()} successfully`);

            }
        } catch (error) {
            console.log("error in update role", error);
            return setError(error);
        }
        finally {
            dispatch(setLoading(false));
        }


        setSelectedUserId(null);
        setSelectedRole('');
    };


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
        "collegeId",
        "college",
        "state",
        "leetcodeProfile",
        "codeforcesProfile",
        "linkedinProfile",
        "githubProfile",
    ]

    const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
        onError: (error) => {
            console.log("error in update user role", error);
            return setError(error);
        }
    });

    const [searchUser] = useMutation(All_USER, {
        onError: (error) => {
            console.log("error in allUser ", error || error.message);
            return setError(error);
            // toast.error(error || error.message);
        },
    });

    const handleChange = (e) => {
        if (e.target.id === "hosteler") {
            setFilter({ ...filter, [e.target.id]: e.target.value == "yes" ? true : false });
        }
        else if (e.target.id === "cgpa") {
            setFilter({ ...filter, [e.target.id]: (e.target.value) });
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
            return setError({ message: "Please enter the value for the selected filter" });
        }
        else if (typeof (filter[options[optionsIndex]]) == "number" && isNaN(filter[options[optionsIndex]])) {
            filter[options[optionsIndex]] = 0;
            setFilter(filter);
            // setFormData(...formData, { [options[optionsIndex]]: " " });
            return setError({ message: "Enter a valid value " });
        }
        else if (options[optionsIndex] === "cgpa") {
            let val = parseFloat(filter[options[optionsIndex]]);
            // console.log("cgpa wala key ",val,typeof(val));

            if (isNaN(val) || val === "NaN" || !(val >= 0 && val <= 10)) {
                filter[options[optionsIndex]] = 0;

                setFilter(filter);
                // console.log("yha dekh ", filter[options[optionsIndex]]);
                // setFormData(...formData, { [options[optionsIndex]]: " " });
                return setError({ message: "Enter a valid value " });

            }
            else {
                // setFilter({ ...filter, [options[optionsIndex]]:val});
                // console.log("yha dekh ", filter[options[optionsIndex]]);
                filter[options[optionsIndex]] = parseFloat(val);
                setFilter(filter);
                setFormData(filter);
            }
            setFetch(!fetch);
        }
        else {
            setFormData(filter);
            setFetch(!fetch);
        }
    }
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
        (async () => {
            try {
                dispatch(setLoading(true));
                const { data, errors } = await searchUser({
                    variables: {
                        user: formData,
                    },
                });
                if (errors) {
                    console.log("error in allUser catch block ", errors.message);
                    dispatch(setLoading(false));
                    return setError(errors);
                }
                else if (data) {
                    console.log("user in AllUser", data);
                    dispatch(setLoading(false));
                    setData(data.getAllUser);
                }
                else {
                    dispatch(setLoading(false));
                    return setError({ message: "Server side error " });
                }
            } catch (error) {
                console.log("error in allUser catch block ", error || error.message);
                dispatch(setLoading(false));
                return setError(error);
            }
        })();
        console.log("option index", optionsIndex);
    }, [callBackend]);


    useEffect(() => {
        // setFilter(filter);
        setFormData(filter);
    }, [fetch]);



    const ShowUserDetails = memo(({ index, user, theme, selectedUserId, selectedRole, userRoles, handleRoleChange, handleUpdateRole, handleCancelRole, dummyUserProfilePic }) => {
        // setUpdatedRole(user.userInformation.role);
        return (
            <tr className={`${theme === 'dark' ? (index % 2 === 0 ? 'bg-gray-700' : '') : theme === 'light' ? (index % 2 === 0 ? 'bg-gray-300' : '') : ''}`}>
                <td className="px-2 sm:px-6 py-4 flex gap-2 sm:gap-4 items-start min-w-48">
                    <img className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover"
                        src={user.userInformation.profile || dummyUserProfilePic} alt="profile pic" />
                    <div className="flex flex-col pr-2">
                        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.userInformation.name}</h2>
                        {/* <Link> */}
                            <Link to={`/profile/${user.userInformation.username}`} className="text-xs text-gray-500 dark:text-gray-400 underline-offset-1 hover:underline">{user.userInformation.username}</Link>
                        {/* </Link> */}
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    <select
                        name="role"
                        className="text-sm rounded-lg bg-gray-200 dark:bg-gray-700"
                        value={selectedUserId === user.id ? selectedRole : user.userInformation.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                        {userRoles.map((role, index) => (
                            <option key={index} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-start">
                        {selectedUserId === user.id && (
                            <>
                                <button
                                    className="px-1.5 py-0.5 ml-2 my-2 rounded-lg border border-red-400"
                                    onClick={() => handleUpdateRole(user.id, selectedRole)}
                                >
                                    Update
                                </button>
                                <button
                                    className="px-3 py-0.5 ml-2 my-2 rounded-lg border border-red-400"
                                    onClick={handleCancelRole}
                                >
                                    X
                                </button>
                            </>
                        )}
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{user.userInformation.email}</td>
                <td className="min-w-40 px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{user.userInformation.mobileNum}</td>
            </tr>
        );
    });




    if (isLoading) {
        return <Loader />;
    }
    if (ERROR) {
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
        return setError(null);
    }
    console.log("data at role management", data);

    return (
        <>
            < div className="flex flex-col min-h-screen items-center min-w-screen px-2 bg-gray-200 dark:bg-gray-800" >
                <div className="my-5">
                    {/* Search Bar */}
                    <form className="flex flex-wrap gap-2 justify-center " onSubmit={handleSubmitSearch}   >
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
                                type="text"
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
                        <div className="flex gap-2">
                            <button onClick={handleFilter} className="bg-blue-400 hover:bg-blue-500 my-0.5 py-1.5 px-3 rounded-md">Add filter </button>
                            <button type="submit" className="bg-blue-400 hover:bg-blue-500 my-0.5 py-1.5 px-3 rounded-md">Search</button>
                        </div>
                    </form>
                </div>
                {/* <h1>Your filters...</h1> */}
                <div className="flex flex-wrap gap-3 mb-5 justify-start mx-2 text-sm ">
                    {formData && Object.keys(formData).map((key, index) => (
                        <div className=" rounded-lg flex flex-wrap items-center gap-1 px-1 bg-gray-300 dark:bg-gray-700">
                            {key == "hosteler" && (
                                <div key={index} className=" ">{key.charAt(0).toUpperCase() + key.slice(1).toLocaleLowerCase()} : {formData[key] ? "yes" : "no"}</div>
                            )}
                            {key !== "hosteler" &&
                                <div key={index} className="">{key.charAt(0).toUpperCase() + key.slice(1).toLocaleLowerCase()} : {formData[key]}</div>
                            }
                            <button onClick={() => deleteFilter(key)}
                                className="items-center rounded-xl py-0.5 px-1 m-1 text-red-500 hover:bg-gray-400 dark:hover:bg-gray-600 ">X</button>
                        </div>
                    ))

                    }
                </div>

                {
                    data && data.length !== 0 ? (
                        <div className="overflow-x-auto w-full mx-5">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-500 dark:bg-gray-400 ">
                                    <tr>
                                        <th className=" px-6 py-3 text-left text-xs font-medium text-gray-200 dark:text-gray-900 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className=" px-6 py-3 text-left text-xs font-medium text-gray-200 dark:text-gray-900 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className=" px-6 py-3 text-left text-xs font-medium text-gray-200 dark:text-gray-900 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className=" px-6 py-3 text-left text-xs font-medium text-gray-200 dark:text-gray-900 uppercase tracking-wider">
                                            Mobile Num
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {data.map((user, index) => (
                                        <ShowUserDetails
                                            index={index}
                                            key={user.id}
                                            user={user}
                                            theme={theme}
                                            selectedUserId={selectedUserId}
                                            selectedRole={selectedRole}
                                            userRoles={userRoles}
                                            handleRoleChange={handleRoleChange}
                                            handleUpdateRole={handleUpdateRole}
                                            handleCancelRole={handleCancelRole}
                                            dummyUserProfilePic={dummyUserProfilePic}
                                        />

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-red-500">User not found!</div>
                    )
                }


            </div >


        </>
    );
}

export default RoleManagement;

