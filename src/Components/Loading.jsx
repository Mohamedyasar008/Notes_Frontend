import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">  
        {/* Spinner */}
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
    </div>
  );
}

export default Loading;

