#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

const float alpha = 0.98;  // Complementary filter constant
const float stepThreshold = 1.2;  // Adjust based on testing
const float gravity = 9.81;  // Earth's gravity in m/s²

// Variables for angles
long prevTime;
float angleX = 0, angleY = 0, angleZ = 0;
float velocityX = 0, velocityY = 0, velocityZ = 0;
float prevAccX = 0, prevAccY = 0, prevAccZ = 0;
int stepCount = 0;

void setup() {
    Serial.begin(115200);
    Wire.begin(23, 22);  // Use ESP32 I2C pins

    Serial.println("Initializing MPU6050...");
    mpu.initialize();

    if (mpu.testConnection()) {
        Serial.println("MPU6050 connected!");
    } else {
        Serial.println("MPU6050 connection failed!");
        while (1);
    }

    prevTime = millis();
}

void loop() {
    int16_t ax, ay, az, gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

    // Convert raw values to actual units
    float accX = ax / 16384.0 * gravity;
    float accY = ay / 16384.0 * gravity;
    float accZ = az / 16384.0 * gravity;
    
    float gyroX = gx / 131.0;
    float gyroY = gy / 131.0;
    float gyroZ = gz / 131.0;

    // Compute angles from accelerometer
    float accAngleX = atan2(accY, accZ) * (180 / PI);
    float accAngleY = atan2(accX, accZ) * (180 / PI);

    // Time difference (dt)
    long currentTime = millis();
    float dt = (currentTime - prevTime) / 1000.0;
    prevTime = currentTime;

    // Integrate gyroscope data to calculate angle change
    float gyroAngleX = angleX + (gyroX * dt);
    float gyroAngleY = angleY + (gyroY * dt);
    float gyroAngleZ = angleZ + (gyroZ * dt);  // Yaw estimation

    // Complementary filter
    angleX = alpha * gyroAngleX + (1 - alpha) * accAngleX;
    angleY = alpha * gyroAngleY + (1 - alpha) * accAngleY;
    angleZ = gyroAngleZ;  // No accelerometer correction for yaw

    // Remove gravity to get linear acceleration
    float linAccX = accX - sin(angleX * PI / 180) * gravity;
    float linAccY = accY - sin(angleY * PI / 180) * gravity;
    float linAccZ = accZ - cos(angleX * PI / 180) * gravity;

    // Estimate velocity by integrating acceleration
    velocityX += linAccX * dt;
    velocityY += linAccY * dt;
    velocityZ += linAccZ * dt;

    // Step detection (basic threshold-based method)
    if (abs(accZ - prevAccZ) > stepThreshold) {
        stepCount++;
    }

    prevAccX = accX;
    prevAccY = accY;
    prevAccZ = accZ;

    // Print results
    Serial.print("Angle X: "); Serial.print(angleX);
    Serial.print(" | Angle Y: "); Serial.print(angleY);
    Serial.print(" | Angle Z (Yaw): "); Serial.print(angleZ);
    Serial.print(" | Linear Acc X: "); Serial.print(linAccX);
    Serial.print(" | Linear Acc Y: "); Serial.print(linAccY);
    Serial.print(" | Linear Acc Z: "); Serial.print(linAccZ);
    Serial.print(" | Velocity X: "); Serial.print(velocityX);
    Serial.print(" | Velocity Y: "); Serial.print(velocityY);
    Serial.print(" | Velocity Z: "); Serial.print(velocityZ);
    Serial.print(" | Steps: "); Serial.println(stepCount);

    delay(1500);
}
