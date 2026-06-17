import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

export const ErrorPage = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.title = "Error | Resume Matcher";
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'}`}>
      <div className={`px-8 py-12 rounded-3xl shadow-2xl backdrop-blur-md ${darkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/20 border border-white/30'}`}>
        <h1 className="text-7xl md:text-9xl font-bold mb-4">404</h1>
        <h2 className="text-3xl md:text-5xl font-semibold mb-2">Page Not Found</h2>
        <p className={`text-base md:text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-white/80'}`}>
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className={`inline-block px-6 py-3 rounded-full font-medium transition ${
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-white text-indigo-700 hover:bg-white/90'
          }`}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}