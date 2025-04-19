import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styling/Movie.css"

const Movie = ({ movie }) => {
  const navigate = useNavigate()

  const handleSelect = () => {
    navigate("/profile", { state: { movieId: movie.id } })
  }


  if(!movie) return <div>Loading...</div>

  return (
    <div className='movie-item'>
      <div className='movie-content'>
        <h3>{movie.title}</h3>
        <button onClick={handleSelect}>
          SELECT
        </button>  
      </div>      
    </div>
  )
}
export default Movie