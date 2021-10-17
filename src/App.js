import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";

import Search from "./components/search";
import Movies from "./components/movies";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewedMovies, setReviewedMovies] = useState({});

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
      <Search setMovieTitle={setMovieTitle} />
      <Movies movieTitle={movieTitle} reviewedMovies={reviewedMovies} />
    </div>
  );
}

export default App;
