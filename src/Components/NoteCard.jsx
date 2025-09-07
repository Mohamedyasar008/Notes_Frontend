import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../libs/Axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, refresh }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent going to details page
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${note._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Note deleted successfully!");
      refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/note/${note._id}`)}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow cursor-pointer mt-6 hover:border-amber-200"
    >
      <h3 className="text-white font-semibold text-xl">{note.title}</h3>
      <p className="text-gray-300 mt-3">{note.content}</p>
      <div className="flex justify-between items-center text-gray-300 text-sm mt-5">
        <span>{formattedDate}</span>
        <button
          onClick={handleDelete}
          className="rounded-full transition-transform transform hover:scale-110"
        >
          <Trash2 className="w-5 h-5 hover:text-red-500 transition-transform transform" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;