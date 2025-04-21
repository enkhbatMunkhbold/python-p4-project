import React from 'react'
// import { useLocation } from 'react-router-dom'
import Ticket from './Ticket'


const UserProfile = ({ user, movies, tickets }) => {

  // const location = useLocation()
  // const { ticket } = location.state || {}

  // function renderTickets(list) {
  //   return list.map(ticket => {
  //     return (
  //       <li key={ticket.id}>
  //         <Ticket ticket={ticket} />
  //       </li>
  //     )
  //   })
  // } 

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <div className="user-profile">
        <h3>Your Tickets:</h3>
        {user.tickets && user.tickets.length > 0 ? (
          <ul>
            {user.tickets.map(ticket => (
              <li key={ticket.id}>
                <Ticket ticket={ticket} />
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