import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/registerSlice";
import { loginWithGoogle, loginUser } from "../features/auth/loginSlice";
import { mergeCart, mergeCartBackend, fetchCart } from "../features/cart/cartSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { EyeIcon, EyeSlashIcon, UserIcon, KeyIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.register);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ---------- Helper: merge guest cart safely ----------
  const handleCartMerge = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart"));

    if (guestCart?.items?.length > 0) {
      dispatch(mergeCart(guestCart));
      try {
        await dispatch(mergeCartBackend()).unwrap();
      } catch (err) {
        console.error("Failed to sync guest cart with backend:", err);
      }
      localStorage.removeItem("guestCart");
    }
    await dispatch(fetchCart());
  };

  // ---------- Email/Password registration ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser({ email, password })).unwrap();
      if (result?.id) {
        // Auto-login after registration
        await dispatch(loginUser({ email, password })).unwrap();
        await handleCartMerge();
        navigate("/");
      }
    } catch (err) {
      console.error("Registration/Login failed:", err);
    }
  };

  // ---------- Google login ----------
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const access_token = tokenResponse.access_token;
        await dispatch(loginWithGoogle(access_token)).unwrap();
        await handleCartMerge();
        navigate("/");
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: (err) => console.error("Google login failed:", err),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Join us today and unlock all features</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-center border border-red-200">
            {error.detail || error}
          </div>
        )}

        <button
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 mb-6 text-gray-700 font-medium shadow-sm hover:shadow"
        >
          <img src="/google-logo.png" alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 text-sm">Or register with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors duration-200"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
