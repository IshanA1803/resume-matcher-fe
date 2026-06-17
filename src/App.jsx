import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

// Pages & Components
import { HomePage } from "./pages/HomePage";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import { RecruiterDashboard } from "./pages/RecruiterDashboard";
import { ErrorPage } from "./pages/ErrorPage";
import { AnalysisResultsPage } from "./pages/AnalysisResultsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EntryPage from "./pages/EntryPage";
import ResultPage from "./pages/ResultsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Contexts & Utils
import { AuthProvider } from "./contexts/AuthProvider";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import axiosInstance from "./utils/axios";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const { data: userData } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/user/me");
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        return response;
      } catch (error) {
        if (error?.response?.status === 401) {
          setUser(null);
        }
        return null;
      }
    },
  });

  return (
    <AuthProvider>
      <DarkModeProvider>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <EntryPage />
              ) : (
                <Navigate
                  to={`/${user.role === "HR" ? "recruiter" : "student"}`}
                />
              )
            }
          />
          <Route path="/auth" element={<HomePage />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="Student" user={user}>
                <CandidateDashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute requiredRole="HR" user={user}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route path="/student-result/:historyid" element={<ResultPage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUpPage />}
          />
          <Route
            path="/recruiter/results/:analysisId"
            element={
              <ProtectedRoute requiredRole="HR" user={user}>
                <AnalysisResultsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </DarkModeProvider>
    </AuthProvider>
  );
}