// DeleteButton.js

import React from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const DeleteButton = ({ eventId, creatorId }) => {
  const handleDelete = () => {
    // Logica di eliminazione, ad esempio una chiamata API DELETE
    axios
      .delete(apiUrl + `/api/events/${eventId}`)
      .then((response) => {
        console.log("Evento eliminato con successo");

        // Aggiorna la pagina dopo l'eliminazione dell'evento
        window.location.reload();
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione dell'evento", error);
        // Gestisci gli errori di eliminazione se necessario
      });
  };

  // Mostra il pulsante di eliminazione solo se l'utente corrente è il creatore dell'evento
  if (creatorId === parseInt(localStorage.getItem("userId"), 10)) {
    return (
<button
  onClick={handleDelete}
  id="delete-btn"
  style={{
    background: "none",  // Rimuove lo sfondo
    border: "none",      // Rimuove il bordo
    padding: 0,          // Rimuove il padding
    cursor: "pointer",   // Cambia il cursore al passaggio del mouse
  }}
>
  <img
    src="https://chistoviki.com/static/images/nomark.png"
    alt="Icon"
    style={{
      width: "30px",      // Riduci la larghezza dell'icona
      height: "30px",     // Riduci l'altezza dell'icona
    }}
  />
</button>

    );
  } else {
    // Non mostrare nulla se l'utente corrente non è il creatore dell'evento
    return null;
  }
};

export default DeleteButton;
