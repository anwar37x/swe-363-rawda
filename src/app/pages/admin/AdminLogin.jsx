import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username,   // 👈 username field = email
          password: password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid username/password");
        setIsLoading(false);
        return;
      }

      // 🔐 Allow only admin
      if (data.user.role !== "admin") {
        setError("Access denied. Admin only.");
        setIsLoading(false);
        return;
      }

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      showToast("Login Successfully");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (error) {
      setError("Server error. Make sure backend is running.");
    }

    setIsLoading(false);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#4CAF50] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🛡️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rawda Admin Panel</h1>
            <p className="text-gray-600">Secure administrator access</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Username (Email) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                      required
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm text-center">{error}</p>
                  </div>
              )}

              {/* Button */}
              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] disabled:bg-gray-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Logging in...
                    </>
                ) : (
                    "Login"
                )}
              </button>

            </form>

            {/* Real credentials */}
            <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
              <p>Use your MongoDB account:</p>
              <p>Email: <b>your_email@gmail.com</b></p>
              <p>Password: <b>your_password</b></p>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
            <div className="fixed top-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
              ✓ {toast}
            </div>
        )}
      </div>
  );
}
