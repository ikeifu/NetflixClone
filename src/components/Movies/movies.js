import { db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
const Movies = ({ movieTitle, reviewedMovies }) => {
  const [movieData, setMoviesData] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}`)
      .then((response) => {
        setMoviesData(response.data.Search);
      });
  }, [movieTitle]);

  const updateReview = (action, movie) => {
    const movieDoc = doc(db, "movies", movie);
    let newReview;
    if (action === "Likes") {
      newReview = { Likes: reviewedMovies[movie][action] + 1 };
    } else {
      newReview = { Dislikes: reviewedMovies[movie][action] + 1 };
    }
    updateDoc(movieDoc, newReview);
  };

  const getMovieRatings = (currentMovie, rating) => {
    if (reviewedMovies[currentMovie]) {
      return reviewedMovies[currentMovie][rating];
    } else {
      createReview(currentMovie);
      return 0;
    }
  };

  const createReview = (movie) => {
    setDoc(doc(db, "movies", movie), { Likes: 0, Dislikes: 0 });
  };

  return (
    <ol>
      {movieData
        ? movieData.map((movie) => (
            <li className="movieText">
              <h3>{movie.Title}</h3>
              <img src={movie.Poster} />
              <p>{movie.Year}</p>
              <span>Liked: {getMovieRatings(movie.Title, "Likes")}</span>
              <button
                className="reviewButton"
                onClick={() => updateReview("Likes", movie.Title)}
              >
                Like
              </button>
              <span>Disliked: {getMovieRatings(movie.Title, "Dislikes")}</span>
              <button
                className="reviewButton"
                onClick={() => updateReview("Dislikes", movie.Title)}
              >
                Dislike
              </button>
            </li>
          ))
        : "No search"}
    </ol>
  );
};
export default Movies;
