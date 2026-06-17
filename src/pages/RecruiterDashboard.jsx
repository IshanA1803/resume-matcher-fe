import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { TabNavigation } from "../components/TabNavigation";
import { JDCard } from "../components/JDCard";
import { HistoryCard } from "../components/HistoryCard";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

export const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("jd");
  const [jobDescription, setJobDescription] = useState("");

  const { mutate: HrAnalyse, isPending: HrAnalysisLoading } = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post("/hr/upload", { description: jobDescription });
    },
    onSuccess: (response) => {
      toast.success("Analysis complete");
      navigate(`/recruiter/results/${response?.data?.data?._id}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Analysis failed");
    }
  });

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["HrHistory"],
    queryFn: async () => await axiosInstance.get("/hr/history")
  });

  const JDhistory = historyData?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleHistoryItemClick = (item) => {
    navigate(`/recruiter/results/${item._id}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-teal-500 to-indigo-600"} text-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header user={user} darkMode={darkMode} />

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          tabs={[
            { id: "jd", label: "Job Description" },
            { id: "history", label: "Analysis History" }
          ]}
        />

        {activeTab === "jd" ? (
          <JDCard
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            history={JDhistory}
            loading={HrAnalysisLoading}
            darkMode={darkMode}
            onFetchTopResumes={HrAnalyse}
          />
        ) : (
          <HistoryCard
            history={JDhistory}
            loading={isHistoryLoading}
            darkMode={darkMode}
            onViewResumes={handleHistoryItemClick}
          />
        )}
      </div>
    </div>
  );
};