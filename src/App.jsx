import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import Home from "./Pages/Home";
import CreateNote from "./Pages/CreateNote";
import Details from "./Pages/Details";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <ProtectedRoute><Home /></ProtectedRoute> : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/note/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;

