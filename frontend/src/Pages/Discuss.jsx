import React , {useState} from 'react';
import { useSelector } from 'react-redux';

function Discuss() {
  //const [rowData, setRowData] = useState(Array(5).fill(""));
  const theme = useSelector((state) => state.theme);

  // const handleRowChange = (index, value) => {
  //   const newData = [...rowData];
  //   newData[index] = value;
  //   setRowData(newData);
  // };
  return (
    <div className={`w-screen h-screen flex flex-col items-center bg-${theme.theme === 'light' ? 'white' : 'primary-color'} text-${theme.theme === 'light' ? 'black' : 'white'} `}>
      <div className="bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 shadow-lg p-6 rounded-lg mt-10">
       <h1 className="text-3xl mb-4 font-bold">Welcome to Discussion Page!</h1>
        <p className="text-lg">"Feel free to share your doubts and interact with others"</p>
      </div>
      
    </div>
    // {rowData.map((item, index) => (
    //   <input
    //     key={index}
    //     type="text"
    //     value={item}
    //     onChange={(e) => handleRowChange(index, e.target.value)}
    //     className={`flex-grow w-full bg-${theme.theme === 'light' ? 'white' : 'black'} shadow-${theme.theme === 'light' ? 'md' : 'black'} text-${theme.theme === 'light' ? 'black' : 'white'} p-4 border border-transparent mt-4 rounded-md focus:outline-none focus:ring-0 cursor-pointer`}
    //   />
    // ))}
  );
}

export default Discuss