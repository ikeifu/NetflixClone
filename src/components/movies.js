import { db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const buttonHandler = (action, movie) => {
    switch (action) {
      case "Likes":
        updateReview(action, movie);
        break;
      case "Dislikes":
        updateReview(action, movie);
        break;
      default:
        break;
    }
  };

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

  const movieReviews = (currentMovie, rating) => {
    if (reviewedMovies[currentMovie]) {
      return reviewedMovies[currentMovie][rating];
    }
    createReview(currentMovie);
  };

  const createReview = (movie) => {
    setDoc(doc(db, "movies", movie), { Likes: 0, Dislikes: 0 });
  };

  return (
    <ol>
      {movieData
        ? movieData.map((movie) => (
            <li>
              <h1>{movie.Title}</h1>
              <img src={movie.Poster} />
              <p>{movie.Year}</p>
              <span>Liked:{movieReviews(movie.Title, "Likes")}</span>
              <button onClick={() => buttonHandler("Likes", movie.Title)}>
                Like
              </button>
              <span>Disliked:{movieReviews(movie.Title, "Dislikes")}</span>
              <button onClick={() => buttonHandler("Dislikes", movie.Title)}>
                Dislike
              </button>
            </li>
          ))
        : "No search"}
    </ol>
  );
};
export default Movies;
