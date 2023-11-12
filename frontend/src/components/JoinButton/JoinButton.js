import React, { useState, useEffect } from "react";
import axios from "axios";

const JoinButton = ({ eventId, token }) => {
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const method = isUserSubscribed ? "delete" : "post";

useEffect(() => {
  // Effettua la chiamata API per verificare se l'utente è iscritto all'evento
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/api/is-subscribed/${localStorage.getItem('userId')}/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setIsUserSubscribed(response.data.is_subscribed);
    })
    .catch((error) => {
      console.error("Errore nel recupero dello stato di iscrizione dell'utente:", error);
    });
}, [eventId, token]);


const handleButtonClick = () => {
  // Effettua la chiamata API per gestire il join/unjoin
  const apiEndpoint = isUserSubscribed
  ? `/api/unsubscribe/${localStorage.getItem('userId')}/${eventId}`
  : `/api/subscribe/${localStorage.getItem('userId')}/${eventId}`;

  axios({
    method: method,
    url: `${process.env.REACT_APP_API_BASE_URL}${apiEndpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      setIsUserSubscribed(!isUserSubscribed);
    })
    .catch((error) => {
      console.error("Errore durante la gestione dell'iscrizione:", error);
    });
};

  return (
    <button className="action-btn" onClick={handleButtonClick}>
      {isUserSubscribed ? "Unjoin" : "Join"}
    </button>
  );
};

export default JoinButton;
