// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { EventGrid } from "../../components"; 


const Home = () => {
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Effettua la chiamata API per ottenere la lista degli eventi
    axios
      .get(apiUrl + "/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero degli eventi:", error);
      });
  }, []);


  return (
    <EventGrid events={events} />
  );
};

export default Home;
