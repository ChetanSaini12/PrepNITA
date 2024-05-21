import moment from 'moment';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import moment from 'moment';

const DateTimePicker = ({ setDateTime , text="Select Date and Time" }) => {
    // const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // console.log("dateTime", date ? date : "");
        setDateTime(date ? date : new Date());
    };

    return (
        <div className='text-2xl text-black'>
            <h2 className='text-white '>Select Date and Time</h2>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                className='border text-gray-900 border-gray-300 rounded p-1 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent'
            />
        </div>
    );
};

export default DateTimePicker;
