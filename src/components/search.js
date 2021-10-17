<<<<<<< HEAD
import React, { useState, useEffect } from "react";
const Search = ({ movieTitle, setMovieTitle }) => {
=======
import React, { useState } from "react";
const Search = ({ setMovieTitle }) => {
>>>>>>> 5c2870e
  const [currentMovie, setCurrentMovie] = useState("");
  const submitButtonHandler = () => {
    setMovieTitle(currentMovie);
  };
  return (
    <>
<<<<<<< HEAD
      <p>Search for movies</p>
      <input
        type="text"
        value={currentMovie}
        placeholder="Movie Title"
        onChange={(e) => setCurrentMovie(e.target.value)}
      />
      <button type="submit" onClick={() => submitButtonHandler()}>
        Search
=======
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
        {" "}
        Search{" "}
>>>>>>> 5c2870e
      </button>
    </>
  );
};

export default Search;
