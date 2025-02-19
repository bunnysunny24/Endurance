#include <WiFi.h>

// WiFi credentials
const char* ssid = "BluhWiFi";     
const char* password = "Bunny1234";  

WiFiServer server(80); // Web server on port 80

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);  // Connect to WiFi

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\n✅ Connected to WiFi!");
  Serial.print("📡 IP Address: ");
  Serial.println(WiFi.localIP()); // Print ESP32's IP

  server.begin(); // Start web server
}

void loop() {
  WiFiClient client = server.available(); // Check for client connection
  if (client) {
    Serial.println("\n🌐 New Client Connected");

    String request = "";
    while (client.available()) {
      char c = client.read();
      request += c;
    }

    Serial.println("📩 Received Data: " + request); // Print received data

    // Extract the "message" parameter
    int messageIndex = request.indexOf("message=");
    if (messageIndex != -1) {
      String message = request.substring(messageIndex + 8); // Extract message value
      int endIndex = message.indexOf(' '); // Find end of message
      if (endIndex != -1) {
        message = message.substring(0, endIndex);
      }
      Serial.println("📨 Extracted Message: " + message);
    }

    // Send HTTP response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type:text/plain");
    client.println();
    client.println("✅ Data Received!");
    client.println();

    client.stop();
    Serial.println("🔌 Client Disconnected.");
  }
}
