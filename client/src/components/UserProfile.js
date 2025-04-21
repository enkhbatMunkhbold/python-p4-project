import React from 'react'
import Ticket from './Ticket'


const UserProfile = ({ user, setUser }) => {
  if (!user) return <div>Loading...</div>;


  function handleDeleteTicket(ticketId) {
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
    }));
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <div className="user-profile">
        <h3>Your Tickets:</h3>
        {user.tickets && user.tickets.length > 0 ? (
          <ul>
            {user.tickets.map(ticket => (
              <li key={ticket.id}>
                <Ticket ticket={ticket} onDeleteTicket={handleDeleteTicket}/>
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