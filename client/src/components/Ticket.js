import React from 'react'

const Ticket = ({ ticket }) => {
  return (
    <div>
      <p>Movie: {ticket.movie.title}</p>
      <p>Time: {ticket.time}</p>
      <p>Number of Tickets: {ticket.ticket_number}</p>
      <p>Total Price: ${ticket.total_price.toFixed(2)}</p>
    </div>
  )
}

export default Ticket