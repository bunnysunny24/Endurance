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

    String requestLine = "";
    
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        
        if (c == '\r') continue; // Ignore carriage returns
        if (c == '\n') break;    // Stop at end of the first line
        
        requestLine += c; // Build the request line
      }
    }

    Serial.println("📩 Request Line: " + requestLine);

    // Ignore requests for favicon.ico
    if (requestLine.indexOf("GET /favicon.ico") != -1) {
      Serial.println("🛑 Ignored favicon request.");
      client.stop();
      return;
    }

    // Extract the "message" parameter from the first line
    String message = "";
    int messageIndex = requestLine.indexOf("GET /?message=");
    if (messageIndex != -1) {
      int startIndex = messageIndex + 13; // Start of the message value
      int endIndex = requestLine.indexOf(' ', startIndex); // Find end of message
      if (endIndex == -1) {
        endIndex = requestLine.length();
      }
      message = requestLine.substring(startIndex, endIndex);
      message.replace("%20", " "); // Replace encoded spaces
    }

    if (message.length() > 0) {
      Serial.println("📨 Extracted Message: " + message); // Print message in terminal
    } else {
      Serial.println("⚠️ No message received!");
    }

    // Serve HTML UI
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type:text/html");
    client.println();
    client.println("<!DOCTYPE html>");
    client.println("<html lang='en'>");
    client.println("<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    client.println("<title>ESP32 Web UI</title>");
    client.println("<style>body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }");
    client.println("input, button { padding: 10px; font-size: 16px; margin: 10px; }</style></head>");
    client.println("<body>");
    client.println("<h2>ESP32 Web Server</h2>");
    client.println("<form action='/' method='GET'>");
    client.println("<label>Enter Message:</label>");
    client.println("<input type='text' name='message'>");
    client.println("<button type='submit'>Send</button>");
    client.println("</form>");
    if (message.length() > 0) {
      client.println("<p><b>Last Message Received:</b> " + message + "</p>");
    }
    client.println("</body></html>");
    client.println();

    client.stop();
    Serial.println("🔌 Client Disconnected.");
  }
}
