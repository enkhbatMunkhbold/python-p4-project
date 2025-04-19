import React from 'react'
import { useLocation } from 'react-router-dom'


const UserProfile = ({ user, movies }) => {

  const location = useLocation()
  const movieId = location.state?.movieId

  const selectedMovie = movies.find(ticket => ticket.id === parseInt(movieId))

  if(!user) return <div>Loading...</div>

  return (
    <div>
      <h2>{user.username}, your purchased tickets</h2>
      <div className='user-profile'>
        <h5>Tickets Purchased: {user.tickets.length}</h5>
      </div>  
      <div className="selected-movie">
        {selectedMovie ? (
          <div>
            <h3>Selected Movie:</h3>
            <h4>Title: {selectedMovie.title}</h4>
            <h4>Price: {selectedMovie.price}</h4>
          </div>
        ) : (
          <p>No movie selected</p>
        )} 
      </div>        
    </div>
  )
}

export default UserProfile