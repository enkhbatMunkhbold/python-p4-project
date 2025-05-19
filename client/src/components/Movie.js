import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import UserContext from '../context/UserContext'
import "../styling/movie.css"

const Movie = ({ movie }) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const time = ['12:00 pm', '2:00 pm', '4:00 pm', '6:00 pm', '8:00 pm']
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

 
  const formSchema = Yup.object().shape({
    ticketNumber: Yup.number()
      .required('Please select a number of tickets')
      .min(1, 'At least one ticket is required')
      .max(10, 'You can select up to 10 tickets'),
    showTime: Yup.string()
      .required('Please select a time'),
  })

  const formik = useFormik({
    initialValues: {
      ticketNumber: 0,
      showTime: '12:00 pm',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ticket_number: parseInt(values.ticketNumber),
            time: values.showTime,
            total_price: movie.price * parseInt(values.ticketNumber),
            movie_id: movie.id,
            user_id: user.id
          }),
        })
        if (response.ok) {
          const newTicket = await response.json()
          navigate('/profile', {
            state: { 
              movieId: movie.id,
              ticket: newTicket
            }
          }) 
          
          setUser(prevUser => {
            const updatedMovies = {
              ...prevUser.movies,
              [movie.id]: {
                ...movie,
                tickets: prevUser.movies?.[movie.id]?.tickets 
                  ? [...prevUser.movies[movie.id].tickets, newTicket]
                  : [newTicket]
              }
            };
            
            return {
              ...prevUser,
              movies: updatedMovies
            };
          });
        } else {
          const errorData = await response.json()
          formik.setErrors({ submit: errorData.error || "Failed to purchase ticket" })
        }        
      } catch (error) {
        formik.setErrors({ submit: "An error occurred while processing your request" })
      }
    },
  })

  if(!movie) return <div>Loading...</div>

  return (
    <div className='movie-item'>
      <div className='movie-content'>
        <h3>{movie.title}</h3>
        <form onSubmit={formik.handleSubmit} className='selection-controls'>
          <div className='form-group'>
            <select
              name="ticketNumber"
              value={formik.values.ticketNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='ticket-selection'
            >
              <option value="">
                Select
              </option>
              {numbers.map(num => (
                <option key={num} value={num}>
                  {num} ticket{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            {formik.touched.ticketNumber && formik.errors.ticketNumber ? (
              <div className='error'>{formik.errors.ticketNumber}</div>
            ) : null}
          </div>
          <div className='form-group'>
            <select
              name="showTime"
              value={formik.values.showTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='time-selection'
            >
              {time.map(t => (<option key={t} value={t}>{t}</option>))}
            </select>
            {formik.touched.showTime && formik.errors.showTime ? (
              <div className='error'>{formik.errors.showTime}</div>
            ) : null}
          </div>
          <div>
            Price: ${movie.price.toFixed(2)}
          </div>
          <div className='price-preview'>
            Total: ${(movie.price * formik.values.ticketNumber).toFixed(2)}
          </div>
          <button 
            type="submit"
            className='buy-ticket'
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Processing...' : 'Buy Ticket'}
          </button> 
        </form> 
      </div>      
    </div>
  )
}
export default Movie