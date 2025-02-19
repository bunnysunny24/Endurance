#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "BluhWiFi";     
const char* password = "Bunny1234";  

// FastAPI server URL
const char* serverURL = "http://192.168.26.176:8000/add-imu-data/";

WiFiServer server(80); // Start Web Server on port 80

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);  

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\n✅ Connected to WiFi!");
  Serial.print("📡 IP Address: ");
  Serial.println(WiFi.localIP()); 

  server.begin();
}

void loop() {
  WiFiClient client = server.available(); 
  if (client) {
    Serial.println("\n🌐 New Client Connected");

    String requestLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (c == '\r') continue; 
        if (c == '\n') break;    
        requestLine += c; 
      }
    }

    Serial.println("📩 Request Line: " + requestLine);

    if (requestLine.indexOf("GET /favicon.ico") != -1) {
      Serial.println("🛑 Ignored favicon request.");
      client.stop();
      return;
    }

    // Extract message
    String message = extractMessage(requestLine);

    if (message.length() > 0) {
      Serial.println("📨 Extracted Message: " + message); 
      sendToFastAPI(message); 
    } else {
      Serial.println("⚠️ No message received!");
    }

    sendHTMLResponse(client, message);
    client.stop();
    Serial.println("🔌 Client Disconnected.");
  }
}

// Function to extract message
String extractMessage(String requestLine) {
  String message = "";
  int messageIndex = requestLine.indexOf("GET /?message=");
  if (messageIndex != -1) {
    int startIndex = messageIndex + 14;  // Adjusted index
    int endIndex = requestLine.indexOf(' ', startIndex); 
    if (endIndex == -1) endIndex = requestLine.length();
    
    message = requestLine.substring(startIndex, endIndex);
    message.replace("%20", " "); 
  }

  if (message.startsWith("=")) message = message.substring(1); // Fix extra "="
  return message;
}

// Function to send HTML response
void sendHTMLResponse(WiFiClient& client, String message) {
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
    client.println("<p><b>Last Message Sent:</b> " + message + "</p>");
  }
  client.println("</body></html>");
  client.println();
}

// Function to send data to FastAPI
void sendToFastAPI(String message) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    doc["message"] = message;
    doc["sensor"] = "IMU_1";
    doc["timestamp"] = millis() / 1000;  

    String jsonPayload;
    serializeJson(doc, jsonPayload);

    Serial.println("📡 Sending Data to FastAPI:");
    Serial.println(jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);
    String response = http.getString();
    
    if (httpResponseCode > 0) {
      Serial.println("✅ Server Response:");
      Serial.println(response);
    } else {
      Serial.print("❌ Error Sending Data: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("🚨 WiFi Disconnected! Unable to send data.");
  }
}
