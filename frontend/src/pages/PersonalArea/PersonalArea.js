import React, { useState, useEffect } from "react";
import axios from "axios";
import { EventGrid } from "../../components";

const PersonalArea = () => {
  const [userEvents, setUserEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');  

  useEffect(() => {
    // Effettua la chiamata API per ottenere gli eventi dell'utente
    axios
      .get(`${apiUrl}/api/user-events/${userId}`)
      .then((response) => {
        setUserEvents(response.data); // Assicurati di estrarre gli eventi correttamente
      })
      .catch((error) => {
        console.error('Errore nel recupero degli eventi dell\'utente:', error);
      });
  }, [apiUrl, userId]);

  return (
    <EventGrid events={userEvents} />
  );
};

export default PersonalArea;
