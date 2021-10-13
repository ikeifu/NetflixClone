import "./App.css";
import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";

import Search from "./components/search";
import Omdb from "./API/omdb";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewedMovies, setReviewedMovies] = useState([]);

  const moviesCollectionRef = collection(db, "movies");
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
      <Search movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
      <Omdb movieTitle={movieTitle} movies={reviewedMovies} />
    </div>
  );
}

export default App;
