import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7186/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});