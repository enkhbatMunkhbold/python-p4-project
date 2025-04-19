import React from 'react'
import { Link } from 'react-router-dom'
import "../styling/Movie.css"

const Movie = ({ movie }) => {

  if(!movie) return <div>Loading...</div>

  return (
    <div className='movie-item'>
      <div className='movie-content'>
        <h3>{movie.title}</h3>
        <Link 
          to="/profile"
          state={{ selectedMovie: movie}}
          className='"buy-ticket-btn'
        >SELECT</Link>
      </div>      
    </div>
  )
}
export default Movie