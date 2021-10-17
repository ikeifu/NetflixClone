import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
const Movies = ({ movieData, movies }) => {
  const [receivedMovieRequest, setReceivedMovieRequest] = useState(true);
  const moviesCollectionRef = collection(db, "movies");
  useEffect(() => {
    if (movieData) {
      setReceivedMovieRequest(false);
    }
  }, [movieData]);
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

  const movieReviewHandler = (currentMovie, rating) => {
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
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
    movieData
      ? movieData.map((movie) => (
          <li>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} />
            <p>{movie.Year}</p>
            <span>Liked:{movieReviewHandler(movie.Title, "Likes")}</span>
            <button
              onClick={() =>
                buttonHandler(
                  "Likes",
                  movie.Title,
                  movieReviewHandler(movie.Title, "Likes")
                )
              }
            >
              Like
            </button>
            <span>Disliked:{movieReviewHandler(movie.Title, "Dislikes")}</span>
            <button
              onClick={() =>
                buttonHandler(
                  "Dislikes",
                  movie.Title,
                  movieReviewHandler(movie.Title, "Dislikes")
                )
              }
            >
              Dislike
            </button>
          </li>
        ))
      : "No search";
  return (
    <ol>{receivedMovieRequest ? "Search for a movie" : renderMovies()}</ol>
  );
};
export default Movies;
