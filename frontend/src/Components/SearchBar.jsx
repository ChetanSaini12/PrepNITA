import { Button } from "flowbite-react";
import React from "react";

function SearchBar(prop) {
  const props = prop.props;
  // console.log("SearchBar props",props);
  return (
    <>
      <div>SearchBar props</div>
      <div>
        <div>
          <select
            onChange={(e) => {
              props.setFilter(
                e.target.value);
            }}
            className="text-black"
          >
            <option selected disabled>
              Select an option to search
            </option>
            {props.search_options?.map((choice, index) => (
              <option
                key={index}
                value={index}
                selected={index === props.filter ? "selected" : ""}
              >
                {choice}
              </option>
            ))}
          </select>
          <div>
            <input className='text-black'
              type="text"
              placeholder="Enter to search"
              value={props.text}
              onChange={(e) => { props.setText(e.target.value.trim()) }}
            ></input>
          </div>
          <div>
            <Button onClick={props.handleClickSearch} gradientDuoTone="purpleToPink" className='mb-2 mt-2' >
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
