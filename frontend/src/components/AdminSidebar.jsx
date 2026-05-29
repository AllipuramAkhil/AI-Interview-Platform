import { NavLink } from "react-router-dom";

const items = [
  { name: "Dashboard", to: "/admin/dashboard" },
  { name: "Questions", to: "/admin/questions" },
  { name: "Users", to: "/admin/users" },
  { name: "Interviews", to: "/admin/interviews" },
  { name: "Analytics", to: "/admin/analytics" },
  { name: "Settings", to: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-slate-800/60 border-r border-slate-700 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-cyan-400 mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition text-sm ${isActive ? "bg-cyan-500 text-black" : "text-slate-200 hover:bg-slate-700/40"}`
            }
          >
            {it.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8">
        <button
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}
          className="w-full px-4 py-2 bg-red-600 rounded-lg text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}




