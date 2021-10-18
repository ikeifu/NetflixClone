import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";

import Search from "./components/Search/search";
import Movies from "./components/Movies/movies";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewedMovies, setReviewedMovies] = useState({});
  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    onSnapshot(moviesCollectionRef, (response) => {
      setReviewedMovies(
        response.docs.reduce((accu, doc) => {
          accu[doc.id] = doc.data();
          return accu;
        }, {})
      );
    });
  }, []);

  return (
    <div>
      <Search setMovieTitle={setMovieTitle} />
      <Movies movieTitle={movieTitle} reviewedMovies={reviewedMovies} />
    </div>
  );
}

export default App;
