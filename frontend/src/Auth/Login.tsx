// components/Login.tsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiLoader4Fill } from "react-icons/ri";
import { httpClient } from "../services/http";

type LoginProps = {
  switchToSignup: () => void;
};

const Login: React.FC<LoginProps> = ({ switchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string ,unauthorized?:string}>({});

  let http = new httpClient();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Email validation
  const validateEmail = (email: string): string | undefined => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!regex.test(email)) return "Invalid email format";
    return undefined;
  };

  // Password validation
  const validatePassword = (password: string): string | undefined => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password))
      return "Password must include letters and numbers";
    return undefined;
  };

  // Handle change
  const handleEmailChange = (value: string) => {
    setUser({ ...user, email: value });
    const error = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handlePasswordChange = (value: string) => {
    setUser({ ...user, password: value });
    const error = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const onLogin = () => {
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    setLoading(true);

    http
      .post(http.authUrl +"/api/login", user)
      .then((res :any) => {
        console.log( res.data);
         http.saveToken("token", res.data.token);
         if(http.getToken("token")){
           
         }
        
      })
      .catch((err) => {
        console.error("Login failed:", err);
       if(err.response?.data.message){
        setErrors((prev) => ({ ...prev, unauthorized: err.response?.data.message }));
       }
        if (err.response?.data?.error === "Email is required") {
          setErrors((prev) => ({ ...prev, email: "Email is required" }));
        } else if (err.response?.data?.error === "Password is required") {
          setErrors((prev) => ({ ...prev, password: "Password is required" }));
        }
        else if (err.response?.data?.error === "User not found") {
          setErrors((prev) => ({ ...prev, unauthorized: "User not found" }));
        }
        else if (err.response?.data?.error === "Invalid password") {
          setErrors((prev) => ({ ...prev, unauthorized: "Invalid password" }));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.form
      key="login"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email or Phone
        </label>
        <input
          type="text"
          placeholder="example@email.com or +8801xxxxxxx"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          onChange={(e) => handleEmailChange(e.target.value)}
          value={user.email}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
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
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md pr-10`}
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={user.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2.5 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password ? (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        ) : errors.unauthorized?(
          <p className="text-sm text-red-500 mt-1">{errors.unauthorized}</p>
        ):null}
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
      {loading ? (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
          disabled
        >
          <RiLoader4Fill className="animate-spin text-2xl" />
          <span>Loading...</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onLogin}
          className="w-full bg-blue-600 text-white rounded-md py-2 cursor-pointer hover:bg-blue-700 transition"
        >
          Login
        </button>
      )}

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
