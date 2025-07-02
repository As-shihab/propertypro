// components/OtpVerification.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const OtpVerification: React.FC<{ email?: string  ,  }> = ({ email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-center mb-4">Verify your account</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        We’ve sent a 6-digit verification code to {email ?? "your email or phone"}.
      </p>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-blue-500"
          />
        ))}
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-3">
        Verify Code
      </button>

      <p className="text-center text-sm text-gray-600">
        Didn’t receive it?{" "}
        <button className="text-blue-600 hover:underline" type="button">
          Resend OTP
        </button>
      </p>
    </motion.div>
  );
};

export default OtpVerification;
