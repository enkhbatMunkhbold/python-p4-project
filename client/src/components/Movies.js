import React, { useState, useEffect } from 'react'



const Movies = () => {

  const [ movies, setMovies ] = useState([])

  useEffect(() => {
    fetch("/movies").then(r => {
      if(r.ok) {
        r.json().then(data => setMovies(data));
      }
    })
  }, []);

  function renderMovies(list) {
    return list.map( movie => {
      return (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
        </li>
      )
    })
  }

  return (
    <div className='movies'>
      <h2>List of Movies</h2>
      <ul>{renderMovies(movies)}</ul>
    </div>
  )
}

export default Movies