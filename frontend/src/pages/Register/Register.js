import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "participant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica della corrispondenza delle password
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    axios
      .post(`${apiUrl}/api/register`, formData)
      .then((response) => {
        navigate("/"); // Redirect to home or login page after successful registration
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const apiErrors = error.response.data;
      
          const newErrors = {};
      
          if (apiErrors.email) {
            newErrors.email = apiErrors.email[0];
          }
      
          if (Object.keys(newErrors).length > 0) {
            setErrors({ ...errors, ...newErrors });
          } else {
            setErrors({ general: "Registration failed. Please try again." });
          }
        }
      });
      
      
  };

  return (
    <div className="sign-page">

    <div className="sign-form">  
      <form onSubmit={handleSubmit}>
      <h1>MeetHub</h1>
      <p>Where Every Connection Counts.</p>
      <h2>Register</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          value={formData.surname}
          placeholder="Surname"
          onChange={handleChange}
        />

        <input
          type="email"
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
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
       

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="creator">Creator</option>
          <option value="participant">Participant</option>
        </select>


        {errors.general && <p className="error-message">{errors.general}</p>}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        
        <button type="submit">Sign Up</button>
        <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
      </form>
    </div>
    </div>
  );
};

export default Register;
