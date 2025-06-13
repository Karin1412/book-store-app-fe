import axios from "axios";
const Axios = axios.create({
  baseURL: "http://192.168.1.4:8080/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default Axios;
