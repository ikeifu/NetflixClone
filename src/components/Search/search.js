import React, { useState } from "react";
import "./styles.css";
const Search = ({ setSearchTerm }) => {
  const [currentMovie, setCurrentMovie] = useState("");

  const submitButtonHandler = (e) => {
    e.preventDefault();
    setSearchTerm(currentMovie);
  };

  return (
    <form onSubmit={(e) => submitButtonHandler(e)} className="searchForm">
      <label for="header-search" className="searchHeader">
        Search for movies
      </label>
      <input
        type="text"
        value={currentMovie}
        id="header-search"
        placeholder="Movie Title"
        onChange={(e) => setCurrentMovie(e.target.value)}
        className="searchBox"
      />
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );
};

export default Search;
