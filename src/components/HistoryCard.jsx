import React from 'react';
import { JDHistoryItem } from './JDHistoryItem';

export const HistoryCard = ({ history, loading, darkMode, onViewResumes }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/20 border-white/30'}`}>
      <h2 className="text-2xl font-semibold mb-6">Analysis History</h2>

      {history.length === 0 ? (
        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white/10'}`}>
          <svg
            className="w-12 h-12 mx-auto text-black mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-lg text-black">No analysis history yet</p>
          <p className="text-sm text-black mt-2">
            Analyze a job description to see results here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <JDHistoryItem
              key={item._id}
              item={item}
              darkMode={darkMode}
              onViewResumes={() => onViewResumes(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};