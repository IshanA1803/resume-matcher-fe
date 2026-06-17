import { Link } from "react-router-dom";
import { RoleCard } from "../components/RoleCard";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-indigo-600 flex flex-col items-center justify-center px-4 font-sans">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-white/20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow tracking-tight whitespace-nowrap">
          Resume Matcher
        </h1>
        <p className="mb-8 sm:mb-10 text-base sm:text-lg text-indigo-100">
          Choose your role to get started
        </p>

        <div className="grid gap-4 sm:gap-6">
          <RoleCard
            title="I’m a Student"
            description="Looking for job opportunities"
            link="/signup?role=Student"
          />
          <RoleCard
            title="I’m a Recruiter"
            description="Hiring talented candidates"
            link="/signup?role=HR"
          />
        </div>
        <p className="mt-3">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-blue-700 cursor-pointer">Login</span>
          </Link>
        </p>
      </div>

      <footer className="mt-6 text-xs text-indigo-100/80">
        © 2025 Resume Matcher. All rights reserved.
      </footer>
    </div>
  );
}