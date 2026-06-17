import React, { useState } from "react";
import { ArrowUpRight, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export const ResumeHistoryItem = ({ resume, darkMode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`student/history/${resume._id}`);
    },
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return (
    <div
      className={`p-5 rounded-lg border transition-all ${darkMode
        ? "bg-gray-800 border-gray-600 hover:border-gray-500"
        : "bg-white border-gray-200 hover:border-gray-300"
        }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          className={`font-bold text-lg ${darkMode ? "text-white" : "text-black"}`}
        >
          {resume?.fileName || "Uploaded Resume"}
        </h3>

        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/student-result/${resume._id}`)}
            className={`p-1.5 rounded-lg bg-blue-500 text-white font-semibold ${darkMode ? "hover:bg-gray-600" : "hover:bg-blue-400"}`}
          >
            OPEN
          </button>
          <button
            onClick={() => deleteMutation()}
            className={`p-1.5 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
            aria-label="Delete resume"
          >
            {!isDeleting ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            ) : (
              <Loader className="w-5 h-5 animate-spin text-red-500" />
            )}
          </button>
        </div>
      </div>

      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Uploaded: {new Date(resume?.createdAt).toUTCString()}
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-3">
        <div className="relative group w-full md:w-1/3 max-h-[220px] overflow-hidden rounded border">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              resume?.resume?.Resume
            )}&embedded=true`}
            width="100%"
            height="220px"
            title="Resume Preview"
            className="rounded-lg shadow"
          />
          <div
            onClick={() => window.open(resume?.resume?.Resume, "_blank")}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
          >
            <div className="flex items-center gap-2 text-lg font-semibold">
              <ArrowUpRight className="w-5 h-5" />
              OPEN
            </div>
          </div>
        </div>

        <p
          onClick={() => setExpanded(!expanded)}
          className={`w-full md:w-2/3 font-medium cursor-pointer ${darkMode ? "text-white" : "text-black"} ${!expanded ? "line-clamp-5" : ""}`}
        >
          {resume?.job_description}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Match Progress
          </span>
          <span className={darkMode ? "text-blue-300" : "text-blue-600"}>
            {resume?.score?.result}%
          </span>
        </div>
        <div
          className={`w-full rounded-full h-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}
        >
          <div
            className={`h-2 rounded-full ${resume?.score?.result < 40
              ? "bg-red-500"
              : resume?.score?.result < 70
                ? "bg-yellow-500"
                : "bg-green-500"
              }`}
            style={{ width: `${resume?.score?.result}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}