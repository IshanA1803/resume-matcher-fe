import React, { useEffect, useState } from "react";
import { GraduationCap, BadgeCheck, Briefcase, FolderOpen, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import ResultLoading from "../components/skeletons/ResultLoading";

const scoreTemplate = [
  { label: "Skills Score", key: "skill_score", icon: <BadgeCheck className="w-5 h-5 text-blue-600" /> },
  { label: "Degree Score", key: "degree_score", icon: <GraduationCap className="w-5 h-5 text-green-600" /> },
  { label: "Experience Score", key: "experience_score", icon: <Briefcase className="w-5 h-5 text-yellow-600" /> },
  { label: "Project Score", key: "project_score", icon: <FolderOpen className="w-5 h-5 text-purple-600" /> },
];

export const ResultPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const { historyid } = useParams();

  const { data: historyData, isLoading } = useQuery({
    queryKey: [`history-${historyid}`],
    queryFn: async () => await axiosInstance.get(`/student/history/${historyid}`),
  });

  const { data: suggestionsData, isLoading: isSuggestionLoading } = useQuery({
    queryKey: [`suggestion-${historyid}`],
    queryFn: async () => await axiosInstance.get(`/suggestion/${historyid}`),
  });

  const scores = !isLoading && historyData?.data?.score
    ? scoreTemplate.map((item) => ({
        label: item.label,
        score: Math.round((historyData.data.score[item.key] ?? 0) * 100),
        icon: item.icon,
      }))
    : scoreTemplate.map((item) => ({ label: item.label, score: 0, icon: item.icon }));

  const finalScore = historyData?.data?.score?.result || 0;
  const suggestions = suggestionsData?.data?.suggestions;

  useEffect(() => {
    if (!isLoading && historyData) {
      const timeout = setTimeout(() => {
        setProgress(scores.map((s) => s.score));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, historyData]);

  if (isLoading || isSuggestionLoading) return <ResultLoading />;

  if (!historyData?.data?.score) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">No Match History Found</h2>
          <p className="text-gray-400 mt-2">Please upload your resume and job description to view results.</p>
          <button onClick={() => navigate("/student")} className="mt-6 px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <button onClick={() => navigate("/student")} className="bg-blue-700 px-4 py-2 rounded-lg text-white hover:bg-blue-800 transition">
          Home
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-center md:mr-auto md:ml-auto">
          Resume vs JD Match Result
        </h1>
        <div className="hidden md:block w-20"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {scores.map((item, i) => (
          <div key={i} className="flex flex-col justify-center items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#374151" strokeWidth="10" fill="transparent" />
                <motion.circle
                  cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="10" fill="transparent" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress[i] / 100 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {progress[i]}%
              </div>
            </div>
            <div className="flex items-center justify-center text-sm">
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-semibold">Final Match Score</h2>
        </div>
        <motion.div
          className="mx-auto w-40 h-40 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          {finalScore.toFixed(0)}%
        </motion.div>
      </div>

      <div className="mt-12 w-full max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-600 pb-2">
          🔍 AI Suggestions
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {suggestions?.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPage;