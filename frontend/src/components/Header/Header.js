import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css"; // Assicurati di collegare il foglio di stile dell'header

const Header = ({ handleFilter, userType }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(0);
  const [organizer, setOrganizer] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const userRole = localStorage.getItem("userRole");
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleSearch = () => {
    axios
      .get(apiUrl + "/api/events/filtered", {
        params: {
          title,
          location,
          category,
          organizer,
          minParticipants,
          maxParticipants,
          date,
          time,
        },
      })
      .then((response) => {
        navigate("/filtered-search", { state: { events: response.data } });
      })
      .catch((error) => {
        console.error("Errore nel recupero degli eventi filtrati:", error);
      });
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleAddEvent = () => {
    navigate("/add-event");
  };

  const handlePersonalArea = () => {
    navigate("/personal-area");
  };

  const handleLogout = () => {
    // Rimuovi il token dalla localStorage o da dove è memorizzato
    localStorage.removeItem("token");
    // Reindirizza l'utente alla pagina di accesso
    navigate("/");
  };

  useEffect(() => {
    // Esegui la richiesta API per ottenere le categorie
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  return (
    <nav className="header">
      <button onClick={() => setShowFilters(!showFilters)}>
        <img src="https://th.bing.com/th/id/R.036b29831800a3d8652ad79a429cc493?rik=29CzYKAUCdr%2fYg&pid=ImgRaw&r=0" />
      </button>
      {showFilters && (
        <div className={`filters ${showFilters ? "show" : ""}`}>
          <input
            type="text"
            placeholder="Event name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            name="category_id"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={0} disabled>
              Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Min participants"
            value={minParticipants}
            onChange={(e) => setMinParticipants(e.target.value)}
          />
          <input
            type="text"
            placeholder="Max participants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />


          <button onClick={handleSearch}>➤</button>
        </div>
      )}
      <button id="home" onClick={handleHome}>
        <img src="https://e7.pngegg.com/pngimages/176/371/png-clipart-computer-icons-house-real-estate-building-home-house-angle-furniture.png" />
      </button>
      {userRole === "creator" && (
        <button id="add-event" onClick={handleAddEvent}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1004/1004759.png?w=1380"
            alt="Icon"
          />
        </button>
      )}
      <button id="personal-area" onClick={handlePersonalArea}>
        <img src="https://th.bing.com/th/id/OIP.6n0kc6LUYBKIU39n7uLrNgHaHa?pid=ImgDet&rs=1" />
      </button>

      <button onClick={handleLogout} id="log-out">
        <img src="https://icon-library.com/images/logout-icon-android/logout-icon-android-29.jpg" />
      </button>
    </nav>
  );
};

export default Header;
