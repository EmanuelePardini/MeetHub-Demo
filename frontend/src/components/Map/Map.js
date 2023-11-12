import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const EventMap = ({ latitude, longitude, eventId }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const map = L.map(`map-${eventId}`).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://th.bing.com/th/id/R.cfeb685873a3a5077dc10db481a6dc99?rik=teB5PdnarC%2fpkQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpaomedia%2fsmall-n-flat%2f1024%2fmap-marker-icon.png&ehk=pC%2fJ%2bLjlDSIfuJR2lALjyN0Z9Co8%2bYkDjrTFOL4oskc%3d&risl=&pid=ImgRaw&r=0',
      iconSize: [64, 64], 
    });
    L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

    // Funzione per ottenere l'indirizzo tramite reverse geocoding
    const getReverseGeocodingData = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        setAddress(data.display_name);
      } catch (error) {
        console.error('Errore durante la richiesta di reverse geocoding:', error);
      }
    };

    getReverseGeocodingData();

    return () => {
      map.remove();
    };
  }, [latitude, longitude, eventId]);

  return (
    <div>
      <div id={`map-${eventId}`} className="map"></div>
      <div>{address}</div>
    </div>
  );
};

export default EventMap;
