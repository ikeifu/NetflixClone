import React, { useState } from "react";
const Search = ({ setMovieTitle }) => {
  const [currentMovie, setCurrentMovie] = useState("");
  const submitButtonHandler = () => {
    setMovieTitle(currentMovie);
  };
  return (
    <>
      <span>Search for movies</span>
      <input
        type="text"
        value={currentMovie}
        id="header-search"
        placeholder="Movie Title"
        name="s"
        onChange={(e) => setCurrentMovie(e.target.value)}
      />
      <button type="submit" onClick={() => submitButtonHandler()}>
        Search
      </button>
    </>
  );
};

export default Search;
