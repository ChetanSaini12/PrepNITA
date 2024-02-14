import React from "react";

function SearchBar(props) {
  return (
    <>
      <div>SearchBarprops</div>
      <div>
        <div>
          <select
            onChange={(e) => {
              props.setFilter;
              e.target.value;
            }}
          >
            <option selected disabled>
              Select an option to search
            </option>
            {props.searchOptions.map((choice, index) => (
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
            <input
              type="text"
              placeholder="Enter to search"
              value={props.text}
              className=""
              onChange={(e) => {props.setText(e.target.value)}} 
            ></input>
          </div>
          <div>
            <button onClick={props.handleClickSearch}>
                Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
