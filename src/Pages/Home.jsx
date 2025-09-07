import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import api from "../libs/Axios";
import NoteCard from "../Components/NoteCard";
import NoNotes from "../components/NoNotes";
import Fetching from "../Components/Fetching";
import RateLimitedUI from "../Components/RatelimitedUI";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setIsRateLimited(false);
      const res = await api.get("/notes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotes(res.data);
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative flex flex-col items-center px-4 py-8">
      {/* Top Actions */}
      <div className="w-full max-w-6xl flex flex-wrap justify-between items-center gap-2 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex-shrink-0">
          Keep Notes
        </h1>
        <div className="flex gap-3 flex-wrap flex-shrink-0">
          <button
            onClick={() => navigate("/create")}
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition text-sm sm:text-base"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" /> Add Note
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition text-sm sm:text-base"
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6" /> Logout
          </button>
        </div>
      </div>

      {/* Notes Section */}
      {loading ? (
        <Fetching />
      ) : isRateLimited ? (
        <RateLimitedUI />
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center gap-4 mt-16 sm:mt-20">
          <NoNotes />
          <button
            onClick={() => navigate("/create")}
            className="flex items-center justify-center gap-2 mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition text-sm sm:text-base"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" /> Create Your First Note
          </button>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} refresh={fetchNotes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
