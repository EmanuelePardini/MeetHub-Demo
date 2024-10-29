import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, Footer } from "../../components";
import "./AddEvent.css";

const InputField = ({ label, type, name, value, onChange, error, helpText }) => (
  <div className="input-field">
    <label>{label}</label>
    {helpText && <p>{helpText}</p>}
    <input type={type} name={name} value={value} onChange={onChange} />
    {error && <p className="error-message">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error, helpText }) => (
  <div className="input-field">
    <label>{label}</label>
    {helpText && <p>{helpText}</p>}
    <textarea name={name} value={value} onChange={onChange} />
    {error && <p className="error-message">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="input-field">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      <option value={0} disabled>
        Select a category
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.category}
        </option>
      ))}
    </select>
    {error && <p className="error-message">{error}</p>}
  </div>
);

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
    time_start: "",
    time_end: "",
    location: "",
    latitude: "",
    longitude: "",
    category_id: 0,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'creator') {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    for (const field in formData) {
      if (!formData[field] && field !== "latitude" && field !== "longitude") {
        newErrors[field] = ["This field is required."];
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/events/${localStorage.getItem("userId")}`,
        formData
      )
      .then((response) => {
        navigate("/home");
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors);
          setGeneralError("An error occurred while submitting the event. Please check for missing or incorrect information and try again.");
        } else {
          console.error("Error while creating the event:", error);
        }
      });
  };

  return (
    <div className="add-event-page">
      <Header />
      <div className="add-event-container">
        <h2 className="add-event-heading">Add Event</h2>
        <form onSubmit={handleSubmit} className="add-event-form">
          <InputField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            helpText="The title of the event"
          />
          <InputField
            label="Image URL"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            error={errors.image}
            helpText="Search an image on Google and paste the link"
          />
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            helpText="Max 256 characters"
          />
          <SelectField
            label="Category"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            options={categories}
            error={errors.category_id}
          />
          <InputField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
          />
          <InputField
            label="Start Time"
            type="time"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
            error={errors.time_start}
          />
          <InputField
            label="End Time"
            type="time"
            name="time_end"
            value={formData.time_end}
            onChange={handleChange}
            error={errors.time_end}
          />
          <InputField
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            helpText="The city of the event"
          />
          <InputField
            label="Latitude"
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            error={errors.latitude}
            helpText="Search for the coordinates on Google Maps"
          />
          <InputField
            label="Longitude"
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            error={errors.longitude}
            helpText="Search for the coordinates on Google Maps"
          />
          {generalError && <p className="error-message">{generalError}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddEvent;
