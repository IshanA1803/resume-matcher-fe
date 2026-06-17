import React from "react";
import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center text-white p-10 rounded-2xl bg-white/10 border border-white/30 shadow-2xl max-w-3xl w-full mx-4 animate-fade-in">
          <h1 className="text-6xl font-serif font-extrabold mb-6 tracking-wide drop-shadow-md">
            Resume ↔ JD Matcher
          </h1>
          <p className="text-xl text-gray-200 mb-10 px-4">
            Match the right candidates to the right jobs using intelligent AI.
            Say goodbye to manual screening and hello to smart hiring.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-4 text-xl font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black hover:from-yellow-300 hover:to-pink-400 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}