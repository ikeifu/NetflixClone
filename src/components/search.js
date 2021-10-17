import React, { useState } from "react";
const Search = ({ setMovieTitle }) => {
  const [currentMovie, setCurrentMovie] = useState("");
  const submitButtonHandler = () => {
    setMovieTitle(currentMovie);
  };
  return (
    <>
      <label for="search">Search for movies</label>
      <input
        type="text"
        value={currentMovie}
        id="header-search"
        placeholder="Movie Title"
        onChange={(e) => setCurrentMovie(e.target.value)}
      />
      <button type="submit" onClick={() => submitButtonHandler()}>
        Search
      </button>
    </>
  );
};

export default Search;
