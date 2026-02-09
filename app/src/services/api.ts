import axios from "axios";

export const api = axios.create({
  baseURL: "http://YOUR_SERVER_IP:3000",
});
