import "./App.css";
import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";

import Search from "./components/search";
<<<<<<< HEAD
import Omdb from "./API/omdb";
=======
import Movies from "./components/movies";
>>>>>>> 5c2870e

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewedMovies, setReviewedMovies] = useState({});

  const moviesCollectionRef = collection(db, "movies");
<<<<<<< HEAD
  console.log(reviewedMovies);
=======
>>>>>>> 5c2870e
  useEffect(
    () =>
      onSnapshot(moviesCollectionRef, (response) =>
        setReviewedMovies(
          response.docs.map((doc) => ({
            title: doc.id,
            ...doc.data(),
          }))
        )
      ),
    []
  );
  return (
    <div>
<<<<<<< HEAD
      <Search movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
      <Omdb movieTitle={movieTitle} reviewedMovies={reviewedMovies} />
=======
      <Search setMovieTitle={setMovieTitle} />
      <Movies movieTitle={movieTitle} reviewedMovies={reviewedMovies} />
>>>>>>> 5c2870e
    </div>
  );
}

export default App;
