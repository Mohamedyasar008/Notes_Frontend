import { Loader2 } from "lucide-react";

function Fetching() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-lg">
        {/* Spinner */}
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />

        {/* Loading text */}
        <p className="text-white font-medium text-lg text-center">
          Fetching your notes...
        </p>
      </div>
    </div>
  );
}

export default Fetching;

