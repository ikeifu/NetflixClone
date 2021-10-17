import { db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Movies = ({ movieTitle, reviewedMovies }) => {
  const [movieData, setMoviesData] = useState([]);
  const API = "13d90aef";

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${API}`)
      .then((response) => {
        setMoviesData(response.data.Search);
      });
  }, [movieTitle]);

  const buttonHandler = (action, movie, reviews) => {
    switch (action) {
      case "Likes":
        {
          updateReview(action, movie, reviews);
        }
        break;
      case "Dislikes":
        {
          updateReview(action, movie, reviews);
        }
        break;
      default:
        break;
    }
  };

  const updateReview = (action, movie, reviews) => {
    const movieDoc = doc(db, "movies", movie);
    let newReview;
    if (action === "Likes") {
      newReview = { Likes: reviews + 1 };
    } else {
      newReview = { Dislikes: reviews + 1 };
    }
    updateDoc(movieDoc, newReview);
  };

  const movieReviews = (currentMovie, rating) => {
    if (reviewedMovies[currentMovie]) {
      return reviewedMovies[currentMovie][rating];
    }
    createReview(currentMovie);
  };

  const getReviews = (currentMovie, rating) => {
    return reviewedMovies[currentMovie][rating];
  };
  const createReview = (movie) => {
    setDoc(doc(db, "movies", movie), { Likes: 0, Dislikes: 0 });
  };

  const renderMovies = () =>
    movieData
      ? movieData.map((movie) => (
          <li>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} />
            <p>{movie.Year}</p>
            <span>Liked:{movieReviews(movie.Title, "Likes")}</span>
            <button
              onClick={() =>
                buttonHandler(
                  "Likes",
                  movie.Title,
                  movieReviews(movie.Title, "Likes")
                )
              }
            >
              Like
            </button>
            <span>Disliked:{movieReviews(movie.Title, "Dislikes")}</span>
            <button
              onClick={() =>
                buttonHandler(
                  "Dislikes",
                  movie.Title,
                  movieReviews(movie.Title, "Dislikes")
                )
              }
            >
              Dislike
            </button>
          </li>
        ))
      : "No search";
  return <ol>{renderMovies()}</ol>;
};
export default Movies;
