import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Ticket from './Ticket'

const Tickets = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const { movie } = location.state || {};
  const navigate = useNavigate();

  if (!movie) {
    console.error("No movie data found in location state");
    navigate('/');
    return null;
  }

   if (!movie.tickets) {
    console.error("No tickets found for movie:", movie);
    navigate('/profile');
    return null;
  }

  function handleDeleteTicket(ticketId) {
    // const updateUser = user.movies[movie.id].tickets.filter(t => t.id !== ticketId)
    const updatedMovie = {
      ...movie,
      tickets: movie.tickets.filter(t => t.id !== ticketId)
    }
    setUser(prevUser => {
      const updatedMovies = {
        ...prevUser.movies,
        [movie.id]: updatedMovie
      };
      return {
        ...prevUser,
        movies: updatedMovies
      };
    });
    movie.tickets = movie.tickets.filter(t => t.id !== ticketId);
  }

  function handleEditTicket(editedTicket) {
    const updatedUser = user.movies.map(m => m.tickets.map(t => t.id !== editedTicket.id ? t : editedTicket))   
    setUser(updatedUser);    
  }

  function renderTickets() { 
    if (!movie.tickets || movie.tickets.length === 0) {
      navigate('/profile'); 
      return null;
    }  
    
    console.log("Movie tickets:", movie.tickets);

    return movie.tickets.map(ticket => {
      const ticketWithMovie = {
        ...ticket,
        movie: {
          id: movie.id,
          title: movie.title,
          price: movie.price
        }
      };

      console.log("Ticket with movie data:", ticketWithMovie);
      
      return (
        <Ticket 
          key={ticket.id} 
          ticket={ticketWithMovie} 
          onEditTicket={handleEditTicket} 
          onDeleteTicket={handleDeleteTicket}
        />
      );
    });
  }
  console.log("Movie from tickets:", movie);

  return (
    <div className="tickets-container">
      <h3>Your Tickets for {movie.title}:</h3>
      {movie.tickets && movie.tickets.length > 0 ? (
        <ul className="tickets-list">
          {renderTickets()}
        </ul>
      ) : (
        <p>No tickets purchased yet.</p>
      )}
    </div>
  )
}

export default Tickets