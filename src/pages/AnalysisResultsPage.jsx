import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';

export const AnalysisResultsPage = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const { data: HrResultData, isLoading, error } = useQuery({
    queryKey: ["HrHistory", analysisId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/hr/history/${analysisId}`);
      return response.data;
    },
    enabled: !!analysisId,
  });

  if (isLoading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading data</p>;
  if (!HrResultData) return <p className="text-center mt-10 text-white">No data found.</p>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600'} transition-colors`}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate('/recruiter')}
            className="px-4 py-2 rounded-md text-white bg-black bg-opacity-20 hover:bg-opacity-30 backdrop-blur-md transition duration-200"
          >
            ← Back to Dashboard
          </button>
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Analysis Results</h1>
          <div className="w-32" />
        </div>

        <div className={`mb-10 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white bg-opacity-20 text-black'} backdrop-blur-md`}>
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="mb-4 whitespace-pre-wrap">{HrResultData?.JDId?.description}</p>
          <p className="text-sm opacity-80">
            Analyzed on: {new Date(HrResultData?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-6`}>
            Matching Resumes ({HrResultData?.MatchedResumes?.length || 0})
          </h2>

          {HrResultData?.MatchedResumes?.map((resumeObj, index) => {
            const resume = resumeObj?.resumeId;
            const score = resumeObj?.score;
            const studentName = resume?.StudentId?.name || "Student";

            return (
              <div
                key={index}
                className={`flex justify-between items-center flex-wrap gap-4 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white bg-opacity-20 text-black'} backdrop-blur-md`}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{studentName}</h3>
                  <div className="flex gap-6 text-sm mb-2 flex-wrap">
                    <p><strong>Skill Score:</strong> {(score?.skill_score * 100).toFixed(2)}%</p>
                    <p><strong>Degree Score:</strong> {(score?.degree_score * 100).toFixed(2)}%</p>
                    <p><strong>Project Score:</strong> {(score?.project_score * 100).toFixed(2)}%</p>
                    <p><strong>Experience Score:</strong> {(score?.experience_score * 100).toFixed(2)}%</p>
                  </div>
                  <p className="text-base font-bold opacity-90">
                    Final Score: {score?.result}%
                  </p>
                </div>

                <div>
                  <a
                    href={resume?.Resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-cyan-500 text-black hover:bg-cyan-300 text-sm transition"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};