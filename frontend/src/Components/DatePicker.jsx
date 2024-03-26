import moment from 'moment';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment';

const DateTimePicker = ({ setDateTime }) => {
    // const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // console.log("dateTime", date ? date : "");
        setDateTime(date ? date : new Date());
    };

    return (
        <div className='text-2xl text-black'>
            <h2 className='text-white'>Select Date and Time</h2>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
            />
        </div>
    );
};

export default DateTimePicker;
