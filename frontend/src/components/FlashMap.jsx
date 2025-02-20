import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const FlashMap = () => {
  const [position, setPosition] = useState([19.840454, 75.200152]); // Default location

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-[900px] bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
      {/* Full-width card & centered map */}
      
      <h2 className="absolute top-6 text-2xl font-semibold text-white">Live Flash Map</h2>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "850px", width: "100%" }} // Full width, fixed height
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            <b>Your Location</b>
            <br />
            Latitude: {position[0]} <br />
            Longitude: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default FlashMap;
