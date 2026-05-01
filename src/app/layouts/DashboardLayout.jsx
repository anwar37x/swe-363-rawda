import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, MessageSquare, Star, Users, Calendar, Settings, LogOut, Sprout, Bell, Search } from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isActive = (path) => {
    if (path === "/expert" && location.pathname === "/expert") return true;
    if (path !== "/expert" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/expert", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expert/answer", label: "Questions", icon: MessageSquare },
    { path: "/expert/review", label: "Reviews", icon: Star },
    { path: "/expert/badges", label: "Community", icon: Users },
    { path: "/expert/submit", label: "Schedule", icon: Calendar },
    { path: "/expert/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/expert/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center">
                <Sprout className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Rawda</h1>
                <p className="text-sm text-gray-600">Gardening Expert</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64 hidden lg:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md bg-gray-100 px-9 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <button className="relative text-gray-500 hover:text-green-700 p-2">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                  {user.name?.charAt(0) || "E"}
                </div>
                <div className="text-left leading-tight">
                  <p className="text-sm font-medium text-gray-900">{user.name || "Expert"}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role || "Expert"}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-[73px]">
        <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 bottom-0 top-[73px] overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-[#4CAF50] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 ml-64 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}