import axios from "axios";
import React, { useState, useEffect } from "react";
import Movies from "../components/movies";
const Omdb = ({ movieTitle, movies }) => {
  const [movieData, setMoviesData] = useState([]);
  const API = "13d90aef";
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?s=${movieTitle}&apikey=${API}`)
      .then((response) => {
        setMoviesData(response.data.Search);
      });
  }, [movieTitle]);
  return (
    <div>
      <Movies movieData={movieData} movies={movies} />
    </div>
  );
};

export default Omdb;
