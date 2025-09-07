import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5001/api",
// });

const api = axios.create({
  baseURL: "https://notes-backend-0njc.onrender.com/api",
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
