import { useState } from 'react'
import '../styling/ticket.css'

const Ticket = ({ ticket, onEditTicket, onDeleteTicket }) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ticketNumber: ticket.ticket_number,
    showTime: ticket.time
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const times = ['12:00 pm', '2:00 pm', '4:00 pm', '6:00 pm', '8:00 pm']
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

  const handleDelete = async () => {
    try {
      const response = await fetch(`/tickets/${ticket.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDeleteTicket(ticket.id);
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedTicket = {
        ...ticket,
        ticket_number: parseInt(formData.ticketNumber),
        time: formData.showTime,
        total_price: ticket.movie.price * parseInt(formData.ticketNumber),
      };
      const response = await fetch(`/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicket),
      });
      
      if (response.ok) {
        const updatedTicketData = await response.json();
        onEditTicket(updatedTicketData);
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || "Failed to update ticket" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred while processing your request" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if(isEditing) {
    return (
      <div className="ticket-card editing">
        <form className="edit-form" onSubmit={handleSubmitEdit}>
          <div className="ticket-info">
            <div className="ticket-detail">
              <span className="label">Movie:</span>
              <span className="value">{ticket.movie.title}</span>
            </div>
            <div className="form-group">
              <select
                name="showTime"
                value={formData.showTime}
                onChange={handleChange}
                className="time-selection"
              >
                {times.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <select
                name="ticketNumber"
                value={formData.ticketNumber}
                onChange={handleChange}
                className="ticket-selection"
              >
                {numbers.map(num => (
                  <option key={num} value={num}>
                    {num} ticket{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="ticket-detail">
              <span className="label">Total:</span>
              <span className="value">
                ${(ticket.movie.price * formData.ticketNumber).toFixed(2)}
              </span>
            </div>
          </div>
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}
          <div className="button-group">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Submit'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

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
      <div className="button-group">
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Ticket