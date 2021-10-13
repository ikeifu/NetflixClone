import React, { useState, useEffect } from "react";
const Search = ({ movieTitle, setMovieTitle }) => {
  const [currentMovie, setCurrentMovie] = useState("");
  const submitButtonHandler = () => {
    setMovieTitle(currentMovie);
  };
  return (
    <>
      <p>Search for movies</p>
      <input
        type="text"
        value={currentMovie}
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
