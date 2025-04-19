import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styling/Movie.css"

const Movie = ({ movie }) => {
  const navigate = useNavigate()
  const [ selectedNumber, setSelectedNumber ] = useState(1)
  const [ selectedTime, setSelectedTime ] = useState('12:00 pm')

  const time = ['12:00 pm', '2:00 pm', '4:00 pm', '6:00 pm', '8:00 pm']
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleSelect = () => {
    navigate("/profile", { state: { movieId: movie.id } })
  }


  if(!movie) return <div>Loading...</div>

  return (
    <div className='movie-item'>
      <div className='movie-content'>
        <h3>{movie.title}</h3>
        <div className='selection-controls'>
          <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            className='ticket-selection'
          >
            {numbers.map(num => (
              <option key={num} value={num}>
                {num} ticket{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className='time-selection'
          >
            {time.map(t => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <button onClick={handleSelect}>
          SELECT
        </button>  
      </div>      
    </div>
  )
}
export default Movie