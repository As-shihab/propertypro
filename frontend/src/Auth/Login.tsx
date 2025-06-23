// components/Login.tsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

type LoginProps = {
  switchToSignup: () => void;
};

const Login: React.FC<LoginProps> = ({ switchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.form
      key="login"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Email or Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email or Phone
        </label>
        <input
          type="text"
          placeholder="example@email.com or +8801xxxxxxx"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2.5 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="text-right mt-1">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Login
      </button>

      {/* OR Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300" />
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {/* Google Login */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-sm text-gray-700">Continue with Google</span>
      </button>

      {/* Switch to Sign Up */}
      <div className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={switchToSignup}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </div>
    </motion.form>
  );
};

export default Login;
