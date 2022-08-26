import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, displayAlert }) => {
  const [text, setText] = useState("");

  //This method is used to dynamically update state when input text changes in the search form
  const onChange = (e) => setText(e.target.value);

  //This method is used to submit search form
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      displayAlert("Please enter a username", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  displayAlert: PropTypes.func.isRequired,
};

export default Search;
