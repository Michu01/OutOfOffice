import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7186",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});