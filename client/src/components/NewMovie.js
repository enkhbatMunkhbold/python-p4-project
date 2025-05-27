import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

const NewMovie = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("/movies")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies")
        }
        return res.json()
      })
      .then(movieData => {
        setMovies(movieData)
      })
      .catch(err => {
        <p style={{ color: "red" }}>{err}</p>
      })
  }, [])

  const formik = useFormik({
    initialValues: {
      title: "",
      genre: "",
      price: ""
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(2, "Title must be at least 2 characters long")
        .max(100, "Title must be less than 100 characters"),
      genre: Yup.string()
        .required("Genre is required")
        .min(5, "Genre must be at least 5 characters long")
        .max(50, "Genre must be less than 50 characters"),
      price: Yup.number()
        .required("Must enter price")
        .typeError("Should be a valid number")
        .positive("Price must be positive")
        .max(100)
    }),
    onSubmit: (values) => {      
      fetch("/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: values.title,
          genre: values.genre,
          price: parseFloat(values.price)
        })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to add movie")
          }
          return res.json()
        })
        .then(movie => {
          setMovies(prevMovies => [...prevMovies, movie])
          navigate("/")
        })
        .catch(err => {
          console.error("Error adding movie:", err)
        })
    }
  })

  console.log("Movies from NewMovie:", movies)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>New Movie</h2>
        <hr/>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="error-message">{formik.errors.title}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            autoComplete="off"
            value={formik.values.genre}
            onChange={formik.handleChange}
          />
          {formik.touched.genre && formik.errors.genre && (
            <p className="error-message">{formik.errors.genre}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            max="100"
            autoComplete="off"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="error-message">{formik.errors.price}</p>
          )}
        </div>
        <button type="submit">Add Movie</button>
      </form>      
    </div>
  )
}

export default NewMovie