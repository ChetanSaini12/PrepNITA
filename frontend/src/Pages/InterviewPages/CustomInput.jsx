import { Button } from 'flowbite-react';
import React, { useState } from 'react';

const predefinedTopics = [
    'CS Fundamentals',
    'Operating Systems',
    'Algorithms',
    'Data Structures',
    'Networking',
    'DBMS',
];

const TopicsInput = ({ Topics, setTopics }) => {
    const [customTopic, setCustomTopic] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');



    const handleSelectChange = (e) => {
        if (e.target.value === 'custom') {
            setShowCustomInput(true);
        } else if (e.target.value !== '') {
            setShowCustomInput(false);
            //   onChange(e.target.value);
            setSelectedTopic(e.target.value);
        }
        else {
            setShowCustomInput(false);
        }
    };

    const handleInputChange = (e) => {
        setCustomTopic(e.target.value);
        // onChange(e.target.value);
    };

    const handleAddButton = (e) => {
        e.preventDefault();
        if (customTopic) {
            if(customTopic.trim() === ''){
                alert('Please enter a valid topic');
                return;
            }
            setTopics([...Topics, customTopic]);
            setCustomTopic('');
        }
        else if (selectedTopic) {
            if(selectedTopic.trim() === ''){
                alert('Please enter a valid topic');
                return;
            }
            setTopics([...Topics, selectedTopic]);
            setSelectedTopic('');
        }
        else{
            alert('Please enter a valid topic');
            return;
        }
    }

    return (
        <div className="w-full">
            <select
                onChange={handleSelectChange}
                // className="block w-full border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white mb-2"
                className="block w-full border-gray-300  dark:border-gray-500 dark:bg-gray-700  rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            >
                <option value="">Select a topic</option>
                {predefinedTopics.map((topic, index) => (
                    <option key={index} value={topic}>
                        {topic}
                    </option>
                ))}
                <option value="custom">Custom Topic</option>
            </select>
            {showCustomInput && (
                <input
                    type="text"
                    placeholder="Enter custom topic"
                    value={customTopic}
                    onChange={handleInputChange}
                    // className="block w-full border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                    className="block w-full border-gray-300  dark:border-gray-500 dark:bg-gray-700
                      rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 my-2"                />
            )}
            <Button  color='gray' size={"xs"}
             onClick={handleAddButton} className="my-2 mx-1 border focus:ring-cyan-500 hover:border-gray-400 hover:dark:border-gray-500 ">
                Add
            </Button>
            {Topics?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {Topics.map((topic, index) => (
                        <div key={index} className="bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded">
                            {topic}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default TopicsInput;
