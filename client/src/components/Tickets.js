import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Ticket from './Ticket'

const Tickets = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(location.state?.movie);

  if (!currentMovie) {
    navigate("/profile");
    return null;
  }

  const handleDeleteTicket = (ticketId) => {
    setCurrentMovie(prevMovie => {
      if (!prevMovie || !prevMovie.tickets) return prevMovie;
      const updatedTickets = prevMovie.tickets.filter(t => t.id !== ticketId);
      
      if (updatedTickets.length === 0) {
        navigate('/profile');
        return null;
      }
      
      return {
        ...prevMovie,
        tickets: updatedTickets
      };
    });

    setUser(prevUser => {
      if (!prevUser.movies || !prevUser.movies[currentMovie.id]) return prevUser;
      
      const updatedMovies = { ...prevUser.movies };
      const movieTickets = updatedMovies[currentMovie.id].tickets.filter(t => t.id !== ticketId);
      
      if (movieTickets.length === 0) {
        delete updatedMovies[currentMovie.id];
      } else {
        updatedMovies[currentMovie.id] = {
          ...updatedMovies[currentMovie.id],
          tickets: movieTickets
        };
      }

      return {
        ...prevUser,
        movies: updatedMovies
      };
    });
  };

  const handleEditTicket = (editedTicket) => {
    if (!currentMovie || !currentMovie.tickets) return;

    const updatedMovie = {
      ...currentMovie,
      tickets: currentMovie.tickets.map(t => t.id === editedTicket.id ? editedTicket : t)
    };

    setCurrentMovie(updatedMovie);
    
    setUser(prevUser => ({
      ...prevUser,
      movies: {
        ...prevUser.movies,
        [currentMovie.id]: updatedMovie
      }
    }));
  };

  const renderTickets = () => { 
    if (!currentMovie?.tickets) return null;
    const userMovieTickets = currentMovie.tickets.filter(t => t.user_id === user.id);
    
    if (userMovieTickets.length === 0) {
      navigate('/profile');
      return null;
    }
    
    return userMovieTickets.map(ticket => {
      const ticketWithMovie = {
        ...ticket,
        movie: {
          id: currentMovie.id,
          title: currentMovie.title,
          price: currentMovie.price
        }
      };      
      
      return (
        <Ticket 
          key={ticket.id} 
          ticket={ticketWithMovie} 
          onEditTicket={handleEditTicket} 
          onDeleteTicket={handleDeleteTicket}
        />
      );
    });
  };

  return (
    <div className="tickets-container">
      <h3>Your Tickets for {currentMovie.title}:</h3>
      {currentMovie?.tickets && currentMovie.tickets.length > 0 ? (
        <ul className="tickets-list">
          {renderTickets()}
        </ul>
      ) : (
        <p>No tickets purchased yet.</p>
      )}
    </div>
  );
};

export default Tickets;