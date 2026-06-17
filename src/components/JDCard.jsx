import React from 'react';

export const JDCard = ({
  jobDescription,
  setJobDescription,
  history,
  loading,
  darkMode,
  onFetchTopResumes
}) => {
  return (
    <div className={`p-6 rounded-2xl shadow-xl border border-white/20 ${darkMode ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-md text-white'}`}>
      <h2 className="text-2xl font-semibold mb-6">Job Description</h2>

      <div className="mb-6">
        <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>
          Paste Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description here..."
          className={`w-full h-48 p-4 rounded-lg border focus:outline-none transition ${darkMode
            ? "bg-gray-700 border-gray-600 focus:border-blue-400 text-gray-100 placeholder-gray-400"
            : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            }`}
        />
      </div>

      <div className="mb-8">
        <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>
          Select Previous JD
        </label>
        <select
          onChange={(e) => {
            const selected = history.find(h => h._id === e.target.value);
            if (selected) setJobDescription(selected.JDId?.description);
          }}
          className={`w-full p-3 rounded-lg border ${darkMode
            ? "bg-gray-700 border-gray-600 text-gray-100"
            : "bg-white border-gray-300 text-gray-900"
            }`}
        >
          <option value="">Select from history</option>
          {history?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.JDId?.description?.substring(0, 100)}
              {item.JDId?.description?.length > 100 ? "..." : ""}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onFetchTopResumes}
        disabled={loading || !jobDescription.trim()}
        className={`w-full py-3 rounded-lg font-semibold transition ${loading
          ? "bg-gray-500 cursor-not-allowed"
          : !jobDescription.trim()
            ? `${darkMode ? "bg-gray-600" : "bg-gray-400"} cursor-not-allowed`
            : darkMode
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-400 text-white"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : "Fetch Top Resumes"}
      </button>

      <p className={`mt-4 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>
        Matching resumes will appear in the History tab
      </p>
    </div>
  );
};