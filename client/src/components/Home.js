import React from 'react';
import Movie from './Movie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../styling/movie.css";

function Home({ user, setUser, movies, setMovies, setTickets }) {

  const formSchema = Yup.object().shape({
    title: Yup.string()
      .required('Movie should have a title')
      .min(1, 'At least one character is required'),
    genre: Yup.string()
      .required('Genre is required'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Price must be at least $1'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      genre: '',
      price: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const newMovie = await response.json();
          setMovies((prevMovies) => [...prevMovies, newMovie]);
          resetForm(); 
        } else {
          console.error('Failed to create movie');
        }
      } catch (error) {
        console.error('Error creating movie:', error);
      }
    },
  });

  function renderMovies(list) {
    return list.map((movie) => {
      return (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
        </li>
      )
    })
  }

  const renderPurchaseMovies = movies.map( movie => {
    return <Movie key={movie.id} user={user} setUser={setUser} movie={movie} setTickets={setTickets} />
    })

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
        <ul>{renderPurchaseMovies}</ul>
      </div>
    )
  } else {
    return (
      <div className="home">
        <h1>Welcome to Movie Tickets!</h1>
        <br />
        <img src="/ticket.png" alt="movie tickets" />
        <p>Login or Sign Up to get started!</p>
        <br />
        <h2>List of Movies</h2>
        <ul className="list">{renderMovies(movies)}</ul>
        <br />
        <hr />
        <h2>Create a New Movie</h2>
        <form onSubmit={formik.handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="error">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formik.values.genre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.genre && formik.errors.genre ? (
              <div className="error">{formik.errors.genre}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Create Movie
          </button>
        </form>
      </div>
    )
  }
}

export default Home;