import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../libs/Axios";
import Loading from "../Components/Loading"

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch the note
  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  // Update the note
  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      await api.put(
        `/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update note");
    } finally {
      setUpdating(false);
      navigate("/")
    }
  };

  // Delete the note
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  if (loading)
    return <div className="text-white text-center mt-10">< Loading /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 flex justify-center items-start pt-10">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
        {/* Top Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 border border-white hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            <Trash2 className="w-5 h-5" /> Delete Note
          </button>
          </div>

        {/* Heading and Subtext */}
        <h1 className="sm:text-3xl text-2xl font-bold text-white mb-2">Edit your note</h1>
        <p className="text-gray-300 mb-6 ">
          Make changes to your note and click update.
        </p>

        {/* Editable Note */}
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-64 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={updating}
          className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Note"}
        </button>
      </div>
    </div>
  );
};

export default NoteDetails;