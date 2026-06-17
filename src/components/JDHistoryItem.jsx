import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export const JDHistoryItem = ({ item, darkMode, onViewResumes }) => {
  const [showFullJD, setShowFullJD] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteJD, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/hr/history/${item._id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["HrHistory"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${darkMode
        ? "bg-gray-700/50 border-gray-600 hover:border-gray-500"
        : "bg-white/10 border-gray-200 hover:border-gray-300"
        }`}
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="flex items-center mb-2">
            <span
              className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-gray-600 text-gray-300" : "bg-white/20 text-white"}`}
            >
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
            <span
              className={`ml-2 text-xs px-2 py-1 rounded ${darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-500/20 text-blue-600"}`}
            >
              {item.MatchedResumes?.length || 0} resumes
            </span>
          </div>

          <p
            className={`mb-3 text-sm font-medium ${darkMode ? "text-gray-300" : "text-white/90"}`}
          >
            {showFullJD
              ? item.JDId?.description
              : item.JDId?.description?.slice(0, 300) + "..."}
          </p>

          {item.JDId?.description?.length > 300 && (
            <button
              onClick={() => setShowFullJD(!showFullJD)}
              className={`mb-3 text-sm font-semibold underline ${darkMode ? "text-white" : "text-black"}`}
            >
              {showFullJD ? "View Less" : "View More"}
            </button>
          )}

          <div className="flex space-x-3 mt-2">
            <button
              onClick={onViewResumes}
              className={`px-4 py-2 rounded-lg font-medium ${darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-400 text-white"
                } transition`}
            >
              View Resumes
            </button>

            <button
              onClick={deleteJD}
              className={`px-4 py-2 rounded-lg font-medium ${darkMode
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-red-500 hover:bg-red-400 text-white"
                } transition flex items-center gap-2`}
            >
              {isDeleting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};