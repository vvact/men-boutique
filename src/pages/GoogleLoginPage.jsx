import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../features/auth/loginSlice";

const GoogleLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Google gives us their access token
        const googleAccessToken = tokenResponse.access_token;

        // Send to backend -> backend verifies with Google -> returns JWTs + user
        await dispatch(loginWithGoogle(googleAccessToken)).unwrap();

        navigate("/");
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to Manwell
          </h2>
          <p className="text-gray-500">
            Use your Google account to continue
          </p>
        </div>

        <button
          onClick={() => login()}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium shadow-sm hover:shadow"
        >
          <img
            src="/google-logo.png"
            alt="Google Logo"
            className="h-6 w-6"
          />
          Continue with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
