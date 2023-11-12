import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, Footer } from "../../components";
import "./AddEvent.css";

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
    category_id: 0, // Assicurati di avere un modo per ottenere le categorie disponibili
  });

  const [categories, setCategories] = useState([]); // Stato per memorizzare le categorie disponibili
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const navigate = useNavigate();

  const renderError = (field) => {
    return (
      errors[field] && errors[field][0] && (
        <p className="error-message">{errors[field][0]}</p>
      )
    );
  };

  useEffect(() => {
    // Controllo del ruolo dopo che le categorie sono state ottenute
    const role = localStorage.getItem('userRole');
    if (role !== 'creator') {
      navigate('/home');
    }
  }, []);
  
  useEffect(() => {
    // Esegui la richiesta API per ottenere le categorie
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      });

 }, []); // L'array vuoto come secondo argomento garantisce che l'effetto venga eseguito solo una volta

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Esegui la richiesta API per inserire l'evento
    axios
      .post(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/api/events/${localStorage.getItem("userId")}`,
        formData
      )
      .then((response) => {
        navigate("/home");
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Se ci sono errori di validazione, aggiorniamo lo stato degli errori
          setErrors(error.response.data.errors);
          setGeneralError(
            "An error occurred while submitting the event. Please check for missing or incorrect information and try submitting again."
          );
          console.log(error.response.data.errors);
        } else {
          console.error("Errore durante l'inserimento dell'evento:", error);
        }
      });
  };

  return (
    <div className="add-event-page">
      <Header />
      <div className="add-event-container">
        <h2 className="add-event-heading">Add Event</h2>

        <form onSubmit={handleSubmit} className="add-event-form">
          <label>Title</label>
          <p>The title of the event</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {renderError('title')}

          <label>Image URL</label>
          <p>Search an image on google and past the link</p>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {renderError('image')}

          <label>Description</label>
          <p>Max 256 characters</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {renderError('description')}

          <label>Category</label>
          <p>Select the category of the event</p>
          <select
            name="category_id"
            value={formData.id}
            onChange={handleChange}
          >
            <option value={0} disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
          {renderError('category_id')}

          <label>Date</label>
          <p>Select a date</p>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {renderError('date')}

          <label>Start Time</label>
          <p>Select the event start time</p>
          <input
            type="time"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
          />
          {renderError('time_start')}

          <label>End Time</label>
          <p>Select the event end time</p>
          <input
            type="time"
            name="time_end"
            value={formData.time_end}
            onChange={handleChange}
          />
          {renderError('time_end')}

          <label>Location</label>
          <p>The city of the event</p>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {renderError('location')}

          <label>Latitude</label>
          <p>Search for the coordinates on Google Maps</p>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          {renderError('latitude')}

          <label>Longitude</label>
          <p>Search for the coordinates on Google Maps</p>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          {renderError('longitude')}

          {generalError && <p className="error-message">{generalError}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddEvent;
