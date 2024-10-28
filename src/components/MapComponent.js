// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Default center of the map
const center = [20, 0];

const MapComponent = ({ locations, cases }) => {
  return (
    <MapContainer center={center} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.Lat.map((lat, index) => (
        <Circle 
          key={index}
          center={[lat, locations.Long[index]]} 
          radius={cases[index] * 100} // Scale radius based on cases
          pathOptions={{
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.5,
          }}
        >
          <Popup>
            <strong>Location</strong><br />
            Latitude: {lat}, Longitude: {locations.Long[index]}<br />
            Cases: {cases[index]}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
