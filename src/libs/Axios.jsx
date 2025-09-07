import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5001/api",
// });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});


// ✅ Attach JWT to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // read token from browser storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // add header
  }
  return config;
});

export default api;
