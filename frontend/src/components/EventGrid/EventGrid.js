import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreadBox, EventMap, Footer, Header, JoinButton, DeleteButton } from "../";
import "./EventGrid.css";

const EventGrid = ({ events }) => {
    const [section, setSection] = useState("generals");
    const token = localStorage.getItem("token");
    const changeSection = (newSection) => {
      setSection(newSection);
    };
  
  return (
    <div className="event-grid">
      <Header />
      <ul>
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} />
            <h2>{event.title}</h2>
            <h3>{event.location}</h3>
            <div className="event-details">
              <div className="event-header">
              <DeleteButton eventId={event.id} creatorId={event.creator.id} />
                <p>
                  Posted by {event.creator.name} {event.creator.surname}
                </p>
                <h1>{event.title}</h1>
                <JoinButton eventId={event.id} token={localStorage.getItem("token")} />
              </div>
              <div className="event-body">
                <div className="arrow-buttons">
                  <button onClick={() => changeSection("generals")}>
                    Generals
                  </button>
                  <button onClick={() => changeSection("location")}>
                    Location
                  </button>
                  <button onClick={() => changeSection("thread")}>
                    Thread
                  </button>
                </div>
                <div className="content">
                  {section === "generals" && (
                    <div>
                      <h1>Generals</h1>
                      <h4>{event.category.category}</h4>
                      <p>{event.description}</p>
                      <p>{event.date}</p>
                      <p>
                        {event.time_start.substring(0, 5)} -{" "}
                        {event.time_end.substring(0, 5)}
                      </p>
                      <h4>{event.participants_count} Participants</h4>
                    </div>
                  )}
                  {section === "location" && (
                    <div>
                      <h1>Location</h1>
                      <EventMap
                        latitude={event.latitude}
                        longitude={event.longitude}
                        eventId={event.id}
                      />
                    </div>
                  )}
                  {section === "thread" && (
                    <div>
                      <h1>Thread</h1>
                      <ThreadBox eventId={event.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
         {/* <Footer /> */}
    </div>
  );
};

export default EventGrid;
