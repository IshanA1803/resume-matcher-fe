import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import { ResumeUploader } from "../components/ResumeUploader";
import { ResumeHistoryItem } from "../components/ResumeHistoryItem";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import ResultPage from "./ResultsPage";
import ResultLoading from "../components/skeletons/ResultLoading";

export const CandidateDashboard = ({ user }) => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analyzer");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const {
    mutate: analyzeMutate,
    isPending: analysisLoading,
  } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("JobDescription", jobDescription);
      const response = await axiosInstance.post("/student/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisResult(response?.data?.data);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Uploaded successfully");
      navigate(`/student-result/${data?.data?.data?.history_id}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Upload failed");
    },
  });

  const { data: historyData } = useQuery({
    queryKey: ["history"],
    queryFn: async () => await axiosInstance.get("/student/history")
  });

  const resumeHistory = historyData?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => await axiosInstance.post("/user/logout"),
    onSuccess: () => {
      toast.success("Logged Out");
      localStorage.removeItem("user");
      window.location.href = "/login";
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed");
    },
  });

  const handleFileUpload = (file) => setResumeFile(file);

  const activeClass = "text-white border-b-2 border-white";
  const inactiveClass = darkMode ? "text-gray-400 hover:text-gray-200" : "text-white/70 hover:text-white";

  useEffect(() => {
    document.title = "Dashboard | Resume Matcher";
  }, []);

  if (analysisLoading) return <ResultLoading />;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-teal-500 to-indigo-600"} text-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-extrabold">Resume Matcher</h1>
            <p className="mt-1 text-lg text-gray-300">
              Welcome back, {user?.name || "Candidate"}!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={logoutMutate}
              className={`px-4 py-2 rounded-lg font-medium transition ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-white hover:bg-gray-100 text-gray-900"}`}
            >
              Log Out
            </button>
            <DarkModeToggle />
          </div>
        </div>

        <div className="flex border-b border-gray-300 dark:border-gray-600 mb-8">
          <button
            onClick={() => setActiveTab("analyzer")}
            className={`flex-1 py-3 text-center font-semibold transition ${activeTab === "analyzer" ? activeClass : inactiveClass}`}
          >
            Resume Analyzer
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-center font-semibold transition ${activeTab === "history" ? activeClass : inactiveClass}`}
          >
            Resume History
          </button>
        </div>

        {activeTab === "analyzer" ? (
          <div className={`relative grid lg:grid-cols-2 gap-8 ${darkMode ? "" : "bg-white/20 backdrop-blur-md"} rounded-xl p-6`}>
            {!analysisResult ? (
              <>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description..."
                    className={`w-full h-64 p-4 rounded-lg border focus:outline-none transition ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500"}`}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>
                  <div className={`p-6 rounded-lg border transition-colors ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
                    {!resumeFile ? (
                      <ResumeUploader onFileUpload={handleFileUpload} darkMode={darkMode} />
                    ) : (
                      <div className="flex flex-col items-center">
                        <p className="font-medium mb-2 text-black dark:text-gray-100">{resumeFile.name}</p>
                        <button onClick={() => setResumeFile(null)} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                          Remove File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 text-center mt-4">
                  <button
                    onClick={() => analyzeMutate()}
                    disabled={!jobDescription || !resumeFile || analysisLoading}
                    className={`px-8 py-3 rounded-lg font-semibold transition ${!jobDescription || !resumeFile || analysisLoading ? "bg-gray-400 cursor-not-allowed text-gray-200" : darkMode ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-400 text-white"}`}
                  >
                    {analysisLoading ? "Analyzing..." : "Analyze"}
                  </button>
                </div>
              </>
            ) : (
              <ResultPage analysisResult={analysisResult} />
            )}
          </div>
        ) : (
          <div className={`${darkMode ? "" : "bg-white/20 backdrop-blur-md"} rounded-xl p-6 space-y-6`}>
            {resumeHistory && resumeHistory.length > 0 ? (
              resumeHistory.map((r) => (
                <ResumeHistoryItem key={r._id} resume={r} darkMode={darkMode} />
              ))
            ) : (
              <div className={`flex items-center justify-center h-[60vh] w-full rounded-lg shadow-inner px-4 ${darkMode ? "bg-gradient-to-br from-gray-900 via-[#111827] to-gray-800" : "bg-white"}`}>
                <p className={`text-2xl font-medium text-center ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                  You Haven't Uploaded Any Resumes Yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};