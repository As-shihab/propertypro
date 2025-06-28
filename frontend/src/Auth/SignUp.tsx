// components/Signup.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import { httpClient } from "../services/http";

type SignupProps = {
  switchToLogin: () => void;
};

const Signup: React.FC<SignupProps> = ({ switchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>(
    {}
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const http = new httpClient();

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!regex.test(email)) return "Invalid email format";
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password))
      return "Password must include letters and numbers";
    return undefined;
  };

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
    let error: string | undefined;

    if (field === "name") error = validateName(value);
    if (field === "email") error = validateEmail(value);
    if (field === "password") error = validatePassword(value);

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const onSignup = () => {
    const nameError = validateName(user.name);
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);
    setErrors({ name: nameError, email: emailError, password: passwordError });

    if (nameError || emailError || passwordError) return;

    setLoading(true);

    http
      .post(http.authUrl +"/api/signup", user)
      .then((res: any) => {
        console.log("Signup successful:", res.data);
        // You can redirect or auto-login here
        switchToLogin(); // Optionally switch to login form
      })
      .catch((err) => {
        console.error("Signup failed:", err);
        const errorMsg = err.response?.data?.errors;
        if (errorMsg) {
          setErrors({
            name: errorMsg.name || errors.name,
            email: errorMsg.email || errors.email,
            password: errorMsg.password || errors.password,
          });
        } else {
          setErrors({ name: "Signup failed", email: "Signup failed", password: "Signup failed" });
        }
 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.form
      key="signup"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          value={user.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          value={user.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md pr-10`}
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2.5 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
      </div>

      {/* Sign Up Button */}
      {loading ? (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-md py-2"
          disabled
        >
          <RiLoader4Fill className="animate-spin text-2xl" />
          <span>Creating account...</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onSignup}
          className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      )}

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

      {/* Switch to Login */}
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
