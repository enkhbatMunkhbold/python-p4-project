import React from 'react'
import '../styling/ticket.css'

const Ticket = ({ ticket, onDeleteTicket }) => {

  const handleDelete = async () => {
    try {
      const response = await fetch(`/tickets/${ticket.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDeleteTicket(ticket.id);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };


  return (
    <div className="ticket-card">
      <div className="ticket-info">
        <div className="ticket-detail">
          <span className="label">Movie:</span>
          <span className="value">{ticket.movie.title}</span>
        </div>
        <div className="ticket-detail">
          <span className="label">Time:</span>
          <span className="value">{ticket.time}</span>
        </div>
        <div className="ticket-detail">
          <span className="label">Tickets:</span>
          <span className="value">{ticket.ticket_number}</span>
        </div>
        <div className="ticket-detail">
          <span className="label">Total:</span>
          <span className="value">${ticket.total_price.toFixed(2)}</span>
        </div>
      </div>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}

export default Ticket