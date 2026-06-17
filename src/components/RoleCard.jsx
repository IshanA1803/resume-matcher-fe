import { Link } from "react-router-dom";

export function RoleCard({ title, description, link }) {
  return (
    <Link
      to={link}
      className="block p-5 md:p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-shadow duration-200 ease-out text-center"
    >
      <h2 className="text-lg md:text-xl font-bold text-white mb-1 drop-shadow">
        {title}
      </h2>
      <p className="text-indigo-100 text-sm">
        {description}
      </p>
    </Link>
  );
}