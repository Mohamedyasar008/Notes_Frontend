import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../libs/Axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Both title and content are required");
      return;
    }
    try {
      setLoading(true);
      await api.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setTitle("");
    setContent("");
    toast("Form cleared!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex flex-col items-center px-4 py-10">
      {/* Header Buttons */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
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

      {/* Glassy Form Container */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
        <h1 className="sm:text-3xl text-2xl font-bold text-white mb-2">Create your note</h1>
        <p className="text-gray-300 mb-6">
          Write your note below and click Create to save it.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            rows={6}
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
