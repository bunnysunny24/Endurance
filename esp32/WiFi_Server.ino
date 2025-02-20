#include <Wire.h>
#include <MPU6050.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "BluhWiFi";     
const char* password = "Bunny1234";  

// FastAPI server URL (Update with your server IP)
const char* serverURL = "http://192.168.26.176:8000/add-imu-data/";

MPU6050 mpu;
const float alpha = 0.98;  // Complementary filter constant
const float stepThreshold = 1.2;  // Step detection threshold
const float gravity = 9.81;  // Gravity in m/s²

// Variables
long prevTime;
float angleX = 0, angleY = 0, angleZ = 0;
float velocityX = 0, velocityY = 0, velocityZ = 0;
float prevAccX = 0, prevAccY = 0, prevAccZ = 0;
int stepCount = 0;

void setup() {
    Serial.begin(115200);
    Wire.begin(23, 22);  // ESP32 I2C pins
    Serial.println("Initializing MPU6050...");
    
    mpu.initialize();
    if (!mpu.testConnection()) {
        Serial.println("MPU6050 connection failed!");
        while (1);
    }
    Serial.println("MPU6050 connected!");

    WiFi.begin(ssid, password);  
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\n✅ Connected to WiFi!");
    Serial.print("📡 IP Address: ");
    Serial.println(WiFi.localIP());

    prevTime = millis();
}

void loop() {
    int16_t ax, ay, az, gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

    // Convert raw values to SI units
    float accX = ax / 16384.0 * gravity;
    float accY = ay / 16384.0 * gravity;
    float accZ = az / 16384.0 * gravity;
    
    float gyroX = gx / 131.0;
    float gyroY = gy / 131.0;
    float gyroZ = gz / 131.0;

    // Compute accelerometer-based angles
    float accAngleX = atan2(accY, accZ) * (180 / PI);
    float accAngleY = atan2(accX, accZ) * (180 / PI);

    // Time difference (dt)
    long currentTime = millis();
    float dt = (currentTime - prevTime) / 1000.0;
    prevTime = currentTime;

    // Integrate gyroscope data to estimate angles
    float gyroAngleX = angleX + (gyroX * dt);
    float gyroAngleY = angleY + (gyroY * dt);
    float gyroAngleZ = angleZ + (gyroZ * dt);  

    // Complementary filter for better angle estimation
    angleX = alpha * gyroAngleX + (1 - alpha) * accAngleX;
    angleY = alpha * gyroAngleY + (1 - alpha) * accAngleY;
    angleZ = gyroAngleZ;  

    // Remove gravity to get linear acceleration
    float linAccX = accX - sin(angleX * PI / 180) * gravity;
    float linAccY = accY - sin(angleY * PI / 180) * gravity;
    float linAccZ = accZ - cos(angleX * PI / 180) * gravity;

    // Thresholding to prevent drift in velocity
    velocityX = (abs(linAccX) > 0.01) ? velocityX + linAccX * dt : 0;
    velocityY = (abs(linAccY) > 0.01) ? velocityY + linAccY * dt : 0;
    velocityZ = (abs(linAccZ) > 0.01) ? velocityZ + linAccZ * dt : 0;

    // Step detection
    if (abs(accZ - prevAccZ) > stepThreshold) {
        stepCount++;
    }

    prevAccX = accX;
    prevAccY = accY;
    prevAccZ = accZ;

    // Print results
    Serial.print("Angle X: "); Serial.print(angleX);
    Serial.print(" | Angle Y: "); Serial.print(angleY);
    Serial.print(" | Angle Z: "); Serial.print(angleZ);
    Serial.print(" | Velocity X: "); Serial.print(velocityX);
    Serial.print(" | Velocity Y: "); Serial.print(velocityY);
    Serial.print(" | Velocity Z: "); Serial.print(velocityZ);
    Serial.print(" | Steps: "); Serial.println(stepCount);

    // Send data to FastAPI server
    sendToFastAPI(angleX, angleY, angleZ, velocityX, velocityY, velocityZ, linAccX, linAccY, linAccZ, stepCount);

    delay(1500);
}

// Function to send data to FastAPI
void sendToFastAPI(float angleX, float angleY, float angleZ, float velocityX, float velocityY, float velocityZ, 
                   float accelerationX, float accelerationY, float accelerationZ, int steps) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("🚨 WiFi Disconnected! Reconnecting...");
        WiFi.disconnect();
        WiFi.reconnect();
        delay(1000);
        return;
    }

    HTTPClient http;
    Serial.println("🔍 Connecting to: " + String(serverURL));

    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    // Create JSON payload
    StaticJsonDocument<300> doc;
    doc["sensor"] = "IMU_1";
    doc["timestamp"] = millis() / 1000;
    doc["angleX"] = angleX;
    doc["angleY"] = angleY;
    doc["angleZ"] = angleZ;
    doc["velocityX"] = velocityX;
    doc["velocityY"] = velocityY;
    doc["velocityZ"] = velocityZ;
    doc["accelerationX"] = accelerationX;  
    doc["accelerationY"] = accelerationY;  
    doc["accelerationZ"] = accelerationZ;  
    doc["steps"] = steps;

    String jsonPayload;
    serializeJson(doc, jsonPayload);

    Serial.println("📡 JSON Payload:");
    Serial.println(jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);
    String response = http.getString();

    Serial.print("🔄 HTTP Response Code: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode > 0) {
        Serial.println("✅ Server Response:");
        Serial.println(response);
    } else {
        Serial.print("❌ Error Sending Data: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}
