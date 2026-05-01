import { useState } from "react";
import { Button } from "../components/ui/Button";
import { User, Bell, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export default function Settings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeTab, setActiveTab] = useState("Profile");
  const [toast, setToast] = useState(null);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: "",
  });
  const [notifications, setNotifications] = useState({ replies: true, summary: true, badges: true, newsletter: false });
  const [passwordData, setPasswordData] = useState({ current: "", newPass: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = () => {
    const newErrors = {};
    if (!profileData.name.trim()) newErrors.name = "Name is required.";
    if (!profileData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) newErrors.email = "Valid email is required.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    showToast("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    showToast("Notification preferences saved!");
  };

  const handleUpdatePassword = () => {
    const newErrors = {};
    if (!passwordData.current) newErrors.current = "Current password is required.";
    if (!passwordData.newPass || passwordData.newPass.length < 8) newErrors.newPass = "New password must be at least 8 characters.";
    if (passwordData.newPass !== passwordData.confirm) newErrors.confirm = "Passwords do not match.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setPasswordData({ current: "", newPass: "", confirm: "" });
    showToast("Password updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/expert/login");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 bg-white rounded-xl border border-gray-100 p-4 space-y-2 h-fit">
          {["Profile", "Notifications", "Security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {tab === "Profile" && <User size={18} />}
              {tab === "Notifications" && <Bell size={18} />}
              {tab === "Security" && <Shield size={18} />}
              {tab}
            </button>
          ))}
          <div className="border-t border-gray-100 my-2 pt-2">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Public Profile</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  {profileData.name?.charAt(0) || "E"}
                </div>
                <div>
                  <Button variant="outline" className="border-gray-200 text-gray-700 mb-2">Change Picture</Button>
                  <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Display Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 ${errors.name ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 h-24"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveProfile} className="bg-[#4CAF50] text-white">Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: "replies", label: "Email me when someone replies to my answer" },
                  { key: "summary", label: "Email me daily summary of pending reviews" },
                  { key: "badges", label: "Notify me when I earn a new badge" },
                  { key: "newsletter", label: "Weekly newsletter with gardening tips" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveNotifications} className="bg-[#4CAF50] text-white">Save Preferences</Button>
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 ${errors.current ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.current && <p className="text-red-500 text-sm">{errors.current}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPass}
                    onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 ${errors.newPass ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.newPass && <p className="text-red-500 text-sm">{errors.newPass}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 ${errors.confirm ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={handleUpdatePassword} className="bg-[#4CAF50] text-white">Update Password</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}