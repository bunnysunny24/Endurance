# 🚗 Project-OnBoardX - IoT-Based Vehicle Monitoring System

## 📌 Overview
**Endurance** is a real-time **IoT-based vehicle monitoring system** that integrates **ESP32, Raspberry Pi, Firebase, FastAPI, Flask, and Machine Learning** to ensure vehicle safety and efficient monitoring.

## 🔥 Features
### 🚀 Real-Time Data Collection
- **ESP32 + Gyro Sensor** collects **acceleration & velocity** data.
- Data is stored in **Firebase** and processed using **FastAPI**.

### 📊 Data Processing & Visualization
- **FastAPI generates graphs** from raw sensor data (stored as bits).
- **ML Model** calculates **average acceleration & velocity**.
- **React UI + Flask** displays real-time **location tracking (latitude & longitude)**.

### 🚨 Speed & Acceleration Alerts
- If high acceleration/velocity is detected, alerts are sent via **EmailJS / Twilio**.
- Helps prevent **accidents by notifying drivers to slow down**.

### 🆘 Accident Detection & Emergency Alerts
- **Raspberry Pi + Pressure Sensor** detects abnormal pressure.
- **Emergency signal is sent** via **ESP32 WiFi**.
- Nearby **hospitals, people, ambulances, and fire stations** receive alerts.

## 🖼️ System Architecture

![image](https://github.com/user-attachments/assets/1e3662e7-e4ad-41bc-9e32-7be377db5413)

![image](https://github.com/user-attachments/assets/7c31d06d-b148-4bdb-8247-8574d5cefa87

![image](https://github.com/user-attachments/assets/062290f0-99e1-4221-bb83-66f84acdf3d5)

![image](https://github.com/user-attachments/assets/85ce79d9-0794-4bd1-9f0a-fd9d642b124b)

![image](https://github.com/user-attachments/assets/af127a8f-e339-4e1e-a7db-7d4235ec2ae0)

## 📸 Implementation Screenshots
### 🔹 ESP32 + Gyro Sensor Data Logging


![data1](https://github.com/user-attachments/assets/68505b7c-d11c-49f5-893e-0060870da7c1)


![data2](https://github.com/user-attachments/assets/62b5c172-f816-485b-9077-14f99ffeec46)


![data3](https://github.com/user-attachments/assets/041a5935-9e0b-48ca-b3e5-f50292a848f8)


### 🔹 Real-Time Dashboard


![board1](https://github.com/user-attachments/assets/d79fe7bb-121d-4e18-bb3b-2c1920e14e68)


![board2](https://github.com/user-attachments/assets/34fd7123-083f-4f00-8d31-65b44994f746)


![board4](https://github.com/user-attachments/assets/eb1daa28-e418-4615-9e3d-2d29d7e0a213)


![board3](https://github.com/user-attachments/assets/ea00d10b-3c32-4ce4-b8c1-c5b9e4d5e082)


![board5](https://github.com/user-attachments/assets/58164e0f-c30d-42c6-9204-6a426bf3ef8c)


![board6](https://github.com/user-attachments/assets/848659dc-a714-43df-a851-62607d69e8e8)


![board7](https://github.com/user-attachments/assets/2beda9e8-a2ee-4009-94b0-1575235e4946)


![board8](https://github.com/user-attachments/assets/65bd664d-badc-4174-9c6c-586d83a6c21a)


![board9](https://github.com/user-attachments/assets/06c9e640-611b-4a15-9176-af4df7c9296a)


### 🔹 Accident Detection System

![real](https://github.com/user-attachments/assets/ec786bc3-83b8-4ace-a0c2-d6dbf0168ab1) 


![real2](https://github.com/user-attachments/assets/75216f41-cdfc-472f-91e9-d6e1ee2d4e00)


## 🛠️ Tech Stack
| Component      | Technology |
|---------------|-----------|
| **Backend**   | FastAPI, Flask, Firebase |
| **Frontend**  | React.js, Tailwind CSS |
| **IoT Devices** | ESP32, Raspberry Pi, Gyro Sensor, Pressure Sensor |
| **Alerts**    | Twilio, EmailJS |
| **ML Model**  | Python, NumPy, SciPy |

## 🔧 Setup & Installation
```sh
# Clone the repository
git clone https://github.com/bunnysunny24/Endurance.git
cd Endurance

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install

# Run FastAPI backend
uvicorn backend.main:app --reload

# Run React frontend
npm start
```

## 🚀 Future Enhancements
- **AI-based predictive analytics** for accident prevention.
- **Improved emergency response system** with geolocation tracking.
- **Mobile App Integration** for instant alerts.
- 

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

