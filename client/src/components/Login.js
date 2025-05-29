import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup"

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "", 
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (values) => {
      setError("");
      const capitalizedUsername = values.username.charAt(0).toUpperCase() + values.username.slice(1).toLowerCase()
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: capitalizedUsername,
          password: values.password
        })
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || "Invalid credentials");
          });
        }
        return res.json();
      })
      .then(user => {
        setUser(user);
        navigate("/profile");
      })
      .catch(err => {
        setError(err.message || "Invalid credentials");
      });
    }
  });

  return (
    <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="error-message" style={{ color: "red" }}>{formik.errors.username}</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error-message" style={{ color: "red" }}>{formik.errors.password}</p>
        )}
        <button type="submit">Login</button>
      </form>      
    </div>
  );
}

export default Login;
