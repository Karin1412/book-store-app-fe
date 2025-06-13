import axios from "axios";

const IP = "192.168.1.4";
const Axios = axios.create({
  baseURL: `http://${IP}:8080/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default Axios;
