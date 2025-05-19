import { useState } from 'react'
import { Formik, Form, Field } from 'formik' 
import * as Yup from 'yup'
import '../styling/ticket.css'


const Ticket = ({ ticket, onEditTicket, onDeleteTicket }) => {  

  const [isEditing, setIsEditing] = useState(false);
  const times = ['12:00 pm', '2:00 pm', '4:00 pm', '6:00 pm', '8:00 pm']
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

  const validationSchema = Yup.object().shape({
    ticketNumber: Yup.number()
      .required('Please select a number of tickets')
      .min(1, 'At least one ticket is required')  
      .max(10, 'You can select up to 10 tickets'),
    showTime: Yup.string()
      .required('Please select a time'),
  })

  const handleDelete = async () => {
    try {
      const response = await fetch(`/tickets/${ticket.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDeleteTicket(ticket.id);
      } else {
        console.error('Failed to delete ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleSubmitEdit = async (values, {setSubmitting, setErrors}) => {
    try {
      const updatedTicket = {
        ...ticket,
        ticket_number: parseInt(values.ticketNumber),
        time: values.showTime,
        total_price: ticket.movie.price * parseInt(values.ticketNumber),
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
      setSubmitting(false);
    }
  }

  if(isEditing) {
    return (
      <div className="ticket-card editing">
        <Formik
          initialValues={{
            ticketNumber: ticket.ticket_number,
            showTime: ticket.time
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitEdit}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form className="edit-form">
              <div className="ticket-info">
                <div className="ticket-detail">
                  <span className="label">Movie:</span>
                  <span className="value">{ticket.movie.title}</span>
                </div>
                <div className="ticket-detail">
                  <span className="label">Time:</span>
                  <Field
                    as="select"
                    name="showTime"
                    className={`edit-select ${touched.showTime && errors.showTime ? 'error' : ''}`}
                  >
                    {times.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </Field>
                  {touched.showTime && errors.showTime && (
                    <div className="error-message">{errors.showTime}</div>
                  )}
                </div>
                <div className="ticket-detail">
                  <span className="label">Tickets:</span>
                  <Field
                    as="select"
                    name="ticketNumber"
                    className={`edit-select ${touched.ticketNumber && errors.ticketNumber ? 'error' : ''}`}
                  >
                    {numbers.map(num => (
                      <option key={num} value={num}>
                         {num} ticket{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </Field>
                  {touched.ticketNumber && errors.ticketNumber && (
                    <div className="error-message">{errors.ticketNumber}</div>
                  )}
                </div>
                <div className="ticket-detail">
                  <span className="label">Total:</span>
                  <span className="value">
                    ${(ticket.movie.price * values.ticketNumber).toFixed(2)}
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
            </Form>
          )}
        </Formik>
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