import { db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const Movies = ({ searchTerm, reviewedMovies }) => {
  const [moviesData, setMoviesData] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(async () => {
    if (searchTerm) {
      const moviesResponse = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      const moviesData = moviesResponse.data.Search;

      moviesData.forEach(async (movie, idx) => {
        const movieResponse = await axios.get(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
        );
        console.log(movieResponse);
        moviesData[idx].Plot = movieResponse.data.Plot;
        if (idx === moviesData.length - 1) {
          setMoviesData(moviesData);
        }
      });
    }
  }, [searchTerm]);

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

  if (!moviesData || !moviesData.length) {
    return "Search for a movie!";
  }
  console.log(moviesData);
  return (
    <div className="moviesContainer">
      {moviesData.map((movie) => (
        <div className="movieText movieContainer">
          <h3>{movie.Title}</h3>
          <img src={movie.Poster} />
          <p>{movie.Year}</p>
          <p>{movie.Plot}</p>
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
        </div>
      ))}
    </div>
  );
};
export default Movies;
