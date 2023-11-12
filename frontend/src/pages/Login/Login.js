import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../index.css";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    axios
        .post(`${apiUrl}/api/login`, formData)
        .then((response) => {
            const { token, user_id, role } = response.data;
            localStorage.setItem('token', token); // Salva il token nel localStorage
            localStorage.setItem('userId',user_id);
            localStorage.setItem('userRole',role);
            navigate("/home");
        })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError(
            "Invalid credentials. Please check your email and password."
          );
        } else {
          setError(
            "An error occurred while logging in. Please try again later."
          );
        }
      });
  };

  return (
    <div className="sign-page">
      <h1>MeetHub</h1>
      <p>Where Every Connection Counts.</p>
      <div className="sign-form">
        <form onSubmit={handleLogin}>
          <h2>Sign in</h2>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
