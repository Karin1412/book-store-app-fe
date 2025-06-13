# 📱 Expo React Native App Setup Guide

This is a mobile application built using [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/). Follow the instructions below to set up and run the project on your local machine and mobile device.

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (if not, install using `npm install -g expo-cli`)
- A physical phone with Expo Go app installed (iOS/Android)

---

## 🚀 Setup Instructions

### 1. Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

### 2. Configure Axios Base URL

To connect the mobile app with your backend, you need to set your local IP address in the Axios config file.

## 🔍 Find Your Local IP Address:

On Windows:

```bash
ipconfig
```

Look under your Wi-Fi adapter for the IPv4 Address (e.g., 192.168.1.2).

## ✏️ Update Axios Config:

Open the Axios configuration file (e.g., src/config/axios.js or similar) and update the baseURL as follows:

```ts
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://<YOUR_WIFI_IP_ADDRESS>:8080/v1", // Replace <YOUR_WIFI_IP_ADDRESS> with your actual IP (e.g., 192.168.1.4)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default Axios;
```

✅ Replace <YOUR_WIFI_IP_ADDRESS> with the IP address you found in the step above.

### 3. Run the App with Correct Host Binding

Use your IP address as the REACT_NATIVE_PACKAGER_HOSTNAME to allow your mobile device to connect to the development server:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=<YOUR_LOCAL_IP> npx expo start
```

Example:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.4 npx expo start
```

### ⚠️ Important Notes

- Ensure **both your PC and your mobile device are connected to the same Wi-Fi network**.

- If the app fails to load on your device, verify:
  - Your IP address is correct
  - Your backend server is running
  - Your firewall allows local network traffic
  - Your Expo Go app is up-to-date
