// components/Signup.tsx
import React from "react";
import { motion } from "framer-motion";

type SignupProps = {
  switchToLogin: () => void;
};

const Signup: React.FC<SignupProps> = ({ switchToLogin }) => {
  return (
    <motion.form
      key="signup"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button className="w-full bg-green-600 text-white py-2 rounded-md">
        Sign Up
      </button>

      {/* OR Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300" />
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {/* Google Signup */}
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

      <div className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </div>
    </motion.form>
  );
};

export default Signup;
