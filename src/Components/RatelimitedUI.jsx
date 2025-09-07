import { AlertTriangle } from "lucide-react";

function RatelimitedUI() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-lg max-w-xl mx-auto my-6">
      
      {/* Big Icon */}
      <AlertTriangle className="w-20 h-20 text-yellow-500 mb-6 animate-bounce" />

      {/* Title */}
      <h2 className="text-2xl font-bold text-yellow-600 mb-2 text-center">
        You're Temporarily Rate Limited
      </h2>

      {/* Description */}
      <p className="text-center text-yellow-700 px-4 sm:px-0 mb-6 max-w-s">
        Too many requests have been made from your account. Please wait a few seconds and try again.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition font-medium"
      >
        Retry
      </button>
    </div>
  );
}

export default RatelimitedUI;
