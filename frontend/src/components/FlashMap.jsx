import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

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
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setPosition([lat, lon]);

          // Fetch location details from Flask backend
          setLoading(true);
          try {
            const response = await axios.post("http://127.0.0.1:5000/map", {
              latitude: lat,
              longitude: lon,
            });

            setLocationInfo(response.data);
          } catch (error) {
            console.error("Error fetching location data:", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-[900px] bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="absolute top-6 text-2xl font-semibold text-white">
        Live Flash Map
      </h2>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "850px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            <b>Your Location</b>
            <br />
            Latitude: {position[0]} <br />
            Longitude: {position[1]} <br />
            {loading ? "Fetching weather data..." : 
              locationInfo ? (
                <>
                  <b>Place:</b> {locationInfo.place_name} <br />
                  🌡️ Temperature: {locationInfo.temperature}°C <br />
                  ☁️ Weather: {locationInfo.weather_description}
                </>
              ) : (
                "No data available"
              )
            }
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default FlashMap;
