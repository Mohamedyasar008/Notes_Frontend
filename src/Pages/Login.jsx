import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Hand } from "lucide-react";
import toast from "react-hot-toast";
import api from "../libs/Axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/"); // go to Home after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false)
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center px-4 py-10">
      {/* Container */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
        {/* Left: Welcome */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          {/* Page Name */}

          <Hand className="w-24 h-24 text-yellow-400 mb-2 animate-bounce" />
          <h2 className="text-4xl font-bold text-white">Welcome Back!</h2>
          <p className="text-gray-300 max-w-sm">
            Login to continue your notes journey and keep track of your ideas.
          </p>
        </div>

        {/* Right: Login Form */}
        <div
          ref={formRef}
          className="flex-1 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-300 text-center font-medium">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-yellow-400 hover:underline cursor-pointer font-medium"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
