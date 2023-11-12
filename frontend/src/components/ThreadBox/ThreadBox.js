import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ThreadBox.css";

const ThreadBox = ({ eventId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userColors = {};
  const userId = localStorage.getItem("userId");
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    // Ottieni i messaggi iniziali tramite API
    fetchMessages();

    // Imposta un intervallo per richiedere periodicamente nuovi messaggi
    const intervalId = setInterval(() => {
        fetchMessages();
    }, 5000); // Intervallo di 5 secondi( Aggiornamento con tecnica di Polling)

    // Pulisci l'intervallo quando il componente viene smontato
    return () => clearInterval(intervalId);
}, [eventId]);

const fetchMessages = () => {
    axios.get(`${apiUrl}/api/threads/${eventId}`)
        .then((response) => {
            setMessages(response.data);
        })
        .catch((error) => {
            console.error('Errore nel recupero dei messaggi:', error);
        });
};

  const handleMessageSend = () => {
    if (newMessage) {
      axios
        .post(`${apiUrl}/api/threads/send/${eventId}/${userId}`, { message: newMessage })
        .then((response) => {
          setMessages([...messages, response.data]);
          setNewMessage("");
        })
        .catch((error) => {
          console.error("Errore nell'invio del messaggio:", error);
        });
    }
  };

  const getColorForUser = (userId) => {
    if (userColors[userId]) {
      return userColors[userId];
    } else {
      const color = getRandomColor();
      userColors[userId] = color;
      return color;
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="thread-container">
      <div className="thread-messages">
      {messages.map((message, index) => (
  <div key={index} className={`message ${message.user && message.user.id != userId ? 'received' : 'sent'}`}>
    {message.user && message.user.id != userId && (
      <p
        className="username"
        style={{ color: getColorForUser(message.user.id) }}
      >
        <strong>{message.user.name + " " + message.user.surname}</strong>
      </p>
    )}
    {message.message}
  </div>
))}
      </div>

      <div className="thread-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="textbox"
          placeholder="Write a message..."
        />
        <button onClick={handleMessageSend} className="send-button">
          ➤
        </button>
      </div>
    </div>
  );
};

export default ThreadBox;
