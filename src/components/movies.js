import React, { useState, useEffect } from "react";
import { db } from "../firebase";
<<<<<<< HEAD
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
const Movies = ({ movieData, reviewedMovies }) => {
  const [receivedMovieRequest, setReceivedMovieRequest] = useState(true);
  useEffect(() => {
    if (movieData) {
      setReceivedMovieRequest(false);
    }
  }, [movieData]);
=======
import { doc, setDoc, updateDoc } from "firebase/firestore";
const Movies = ({ movieData, movies }) => {
>>>>>>> f146931
  const buttonHandler = (action, movie, reviews) => {
    switch (action) {
      case "Likes":
        updateReview(action, movie, reviews);
        break;
      case "Dislikes":
        updateReview(action, movie, reviews);
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

  const getMovieLikes = (currentMovie, rating) => {
    for (let i = 0; i < reviewedMovies.length; i++) {
      const movie = reviewedMovies[i];
      const movieTitle = movie.title;
      if (movieTitle === currentMovie) {
        return movie[rating];
      }
    }
    createReview(currentMovie);
  };

  const createReview = (movie) => {
    setDoc(doc(db, "movies", movie), { Likes: 0, Dislikes: 0 });
  };

  const renderMovies = () =>
<<<<<<< HEAD
    movieData > 1
=======
    movieData
>>>>>>> f146931
      ? movieData.map((movie) => (
          <li>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} />
            <p>{movie.Year}</p>
            <p>Liked:{getMovieLikes(movie.Title, "Likes")}</p>
            <button
              onClick={() =>
                buttonHandler(
                  "Likes",
                  movie.Title,
                  getMovieLikes(movie.Title, "Likes")
                )
              }
            >
              Like
            </button>
            <p>Disliked:{getMovieLikes(movie.Title, "Dislikes")}</p>
            <button
              onClick={() =>
                buttonHandler(
                  "Dislikes",
                  movie.Title,
                  getMovieLikes(movie.Title, "Dislikes")
                )
              }
            >
              Dislike
            </button>
          </li>
        ))
      : "Search for a movie";
  return <ol>{renderMovies()}</ol>;
};
export default Movies;
