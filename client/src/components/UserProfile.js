import React from 'react'
import { useLocation } from 'react-router-dom'


const UserProfile = ({ user, movies }) => {

  const location = useLocation()
  const { ticket } = location.state || {}

  if(!user) return <div>Loading...</div>

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      
      {ticket && (
        <div className="new-ticket">
          <h3>New Ticket Purchase:</h3>
          <p>Movie: {movies.find(m => m.id === ticket.movie_id)?.title}</p>
          <p>Time: {ticket.time}</p>
          <p>Number of Tickets: {ticket.ticket_number}</p>
          <p>Total Price: ${ticket.total_price.toFixed(2)}</p>
        </div>
      )}

      <div className="user-profile">
        <h3>Your Tickets:</h3>
        {user.tickets && user.tickets.length > 0 ? (
          <ul>
            {user.tickets.map(ticket => (
              <li key={ticket.id}>
                <p>Movie: {movies.find(m => m.id === ticket.movie_id)?.title}</p>
                <p>Time: {ticket.time}</p>
                <p>Number of Tickets: {ticket.ticket_number}</p>
                <p>Total Price: ${ticket.total_price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile