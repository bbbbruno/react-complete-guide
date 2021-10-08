import React, { useState, useEffect } from 'react'

import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList'
import './App.css'

const App = props => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(
        'https://react-http-db4d6-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      )
      if (!res.ok) throw new Error('Something went wrong!')

      const data = await res.json()

      const transformedMovies = Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          openingText: value.openingText,
          releaseDate: value.releaseDate,
        }
      })
      setMovies(transformedMovies)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMoviesHandler()
  }, [])

  const addMovieHandler = async movie => {
    const res = await fetch(
      'https://react-http-db4d6-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()
    console.log(data)
  }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ]

  let content = <p>Found no movies.</p>

  if (movies.length > 0) content = <MoviesList movies={movies} />
  if (error) content = <p>{error}</p>
  if (isLoading) content = <p>Loading...</p>

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
