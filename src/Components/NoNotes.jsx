import { FileText } from "lucide-react";

const NoNotes = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-300">
      <FileText className="w-16 h-16 mb-4 text-yellow-400 animate-bounce" />
      <h2 className="text-2xl font-semibold mb-2">No Notes Yet</h2>
      <p>Create your first note to get started!</p>
    </div>
  );
};

export default NoNotes;



