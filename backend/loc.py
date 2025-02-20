from flask import Flask, render_template, request
import folium
from geopy.geocoders import Nominatim
import json

app = Flask(__name__)
geolocator = Nominatim(user_agent="geo_app")  # Create a geolocator instance

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map', methods=['POST'])
def map_view():
    # Get latitude and longitude from the submitted form
    latitude = float(request.form['latitude'])
    longitude = float(request.form['longitude'])
    
    # Reverse geocode to get the place name (address)
    location = geolocator.reverse((latitude, longitude), language='en')
    place_name = location.address if location else "Unknown Location"

    # Create a JSON object for logging
    location_data = {
        "latitude": latitude,
        "longitude": longitude,
        "place_name": place_name
    }
    
    # Print the JSON data to the terminal in a pretty format
    print(json.dumps(location_data, indent=4))
    
    # Create a popup text for the map using the place name and coordinates
    popup_text = f"<b>{place_name}</b><br>Latitude: {latitude}<br>Longitude: {longitude}"
    
    # Create a Folium map centered on the user's location and add a marker
    m = folium.Map(location=[latitude, longitude], zoom_start=13)
    folium.Marker([latitude, longitude], popup=popup_text).add_to(m)
    
    # Save the map to an HTML file (within the templates folder)
    map_html = "templates/map.html"
    m.save(map_html)
    
    # Render the map.html page
    return render_template('map.html')

if __name__ == '__main__':
    app.run(debug=True)
