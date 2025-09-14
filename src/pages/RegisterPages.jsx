import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/registerSlice";
import { loginWithGoogle } from "../features/auth/loginSlice";
import { mergeCart, fetchCart } from "../features/cart/cartSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { EyeIcon, EyeSlashIcon, UserIcon, KeyIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.register);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser({ email, password })).unwrap();
      // Save user & tokens in localStorage
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("access", result.access);
      localStorage.setItem("refresh", result.refresh);

      // Merge guest cart and fetch
      await dispatch(mergeCart()).unwrap();
      await dispatch(fetchCart()).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const access_token = tokenResponse.access_token;
        const result = await dispatch(loginWithGoogle(access_token)).unwrap();

        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);

        await dispatch(mergeCart()).unwrap();
        await dispatch(fetchCart()).unwrap();

        navigate("/");
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: (err) => console.error("Google login failed:", err),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Create Account</h1>
          <p className="text-navy-600">Join us today and unlock all features</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        <button
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center gap-2 bg-white border border-navy-200 py-3 px-4 rounded-xl hover:bg-navy-50 transition-all duration-200 mb-6 text-navy-800 font-medium shadow-sm hover:shadow"
        >
          <img src="/google-logo.png" alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-navy-200"></div>
          <span className="mx-4 text-navy-500 text-sm">Or register with email</span>
          <div className="flex-grow border-t border-navy-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-navy-400" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-navy-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-navy-400 hover:text-navy-600 transition-colors duration-200"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 ${
              loading
                ? "bg-navy-400 cursor-not-allowed"
                : "bg-navy-700 hover:bg-navy-800 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-navy-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-gold hover:text-gold-600 font-medium cursor-pointer transition-colors duration-200"
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
