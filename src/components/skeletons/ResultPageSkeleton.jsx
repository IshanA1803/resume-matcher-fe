import React from "react";
import { Brain } from "lucide-react";

export const ResultPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 flex flex-col items-center animate-pulse">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex justify-between items-center">
          <div className="w-20 h-8 bg-gray-700 rounded"></div>
          <div className="w-2/3 h-8 bg-gray-700 rounded"></div>
        </div>

        <div className="flex gap-6 w-full">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full flex flex-col justify-center items-center gap-6"
              >
                 <div className="w-16 h-16 rounded-full bg-gray-700"></div>
                <div className="w-28 h-5 bg-gray-700 rounded"></div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex justify-center items-center gap-3">
          <Brain className="w-6 h-6 text-gray-600" />
          <div className="w-40 h-6 bg-gray-700 rounded"></div>
        </div>
        <div className="w-40 h-40 rounded-full bg-gray-700"></div>
      </div>

      <div className="mt-12 w-full max-w-2xl">
        <div className="w-1/2 h-6 bg-gray-700 rounded mb-4"></div>
        <ul className="space-y-3">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <li key={idx} className="w-full h-4 bg-gray-700 rounded"></li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPageSkeleton;