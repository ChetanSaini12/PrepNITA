import React, { useState } from 'react'
import SidebarComponent from '../Components/Sidebar'
import { Button, TextInput } from 'flowbite-react'
import DateTimePicker from '../Components/DatePicker'
import moment from 'moment';
import { CREATE_INTERVIEW } from '../gqlOperatons/Interview/mutations';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

function Interviews() {
  const [dateTime, setDateTime] = useState(new Date());
  const [Duration, setDuration] = useState(30);
  const [Topics, setTopics] = useState("");
  const [Error,setError]=useState(null);

  const [createInterview] = useMutation(CREATE_INTERVIEW, {
    onError: (error) => {
      console.log("error in creating interview mutation ", error);
      setError(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("interview Data ", dateTime.toISOString(), " ", Duration);
    createInterview({
      variables: {
        Interview: {
          startTime: dateTime.toISOString(),
          duration: Duration,
          topics: Topics?.split(','),
        }
      },
    }).then((data) => {
      console.log("Interview created ", data);
      if (data.errors) setError(data.errors ? data.errors.message : "Error in creating interview");
      else
        toast.success("Interview created successfully");
    }).catch((error) => {
      console.log("Error in creating interview ", error);
      setError(error.message);
    });

  };
  if(Error) toast.error(Error);
  else toast.
  return (
    <div className=' w-screen h-screen border-spacing-0'>
      {/* <SidebarComponent></SidebarComponent> */}
      <div>
        <form onSubmit={handleSubmit}>
          <TextInput placeholder='Duration' value={Duration}
            required onChange={(e) => { setDuration(e.target.value) }}
          ></TextInput>
          <TextInput placeholder='Topics (format :cs fundamentals, os , ...)' value={Topics}
            onChange={(e) => { setTopics(e.target.value) }}
          ></TextInput>
          <DateTimePicker setDateTime={setDateTime} />
          <Button type='submit'>Create</Button>
        </form>
      </div>
    </div>

  )
}

export default Interviews