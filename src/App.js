import "./App.css"
import { db } from "./firebase"
import React, { useState, useEffect } from "react"
import { onSnapshot, collection, getDocs } from "firebase/firestore"

import Search from "./components/search"
import Omdb from "./API/omdb"

function App() {
  const [movieTitle, setMovieTitle] = useState("")
  const [movies, setMovies] = useState([])

  const moviesCollectionRef = collection(db, "movies")
  useEffect(
    () =>
      onSnapshot(moviesCollectionRef, (doc) =>
        setMovies(
          doc.docs.map((doc) => ({
            title: doc.id,
            ...doc.data(),
          }))
        )
      ),
    []
  )
  return (
    <div>
      <Search movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
      <Omdb movieTitle={movieTitle} movies={movies} />
    </div>
  )
}

export default App
