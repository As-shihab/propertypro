// components/OtpVerification.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RiLoader4Fill, RiMailSendLine } from "react-icons/ri";
import { sentUserOtp } from "../config/OtpSender";
import { GlobalContext } from "../guard/GlobalContext";

const OtpVerification: React.FC<{ email?: string }> = ({ email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [isSentLoading, setSentLoading] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(GlobalContext);
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  const HandleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setDisable(true);
    }

    try {
      setLoading(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SentOtp = async () => {
    // Check localStorage for cooldown
    const cooldown = localStorage.getItem("otpCooldown");
    if (cooldown && Date.now() < parseInt(cooldown)) {
      console.log("OTP cooldown active. Skipping...");
      return;
    }

    setSentLoading(true);
    try {
      const res = await sentUserOtp(); // your API call
      email = user?.data?.email;
      // Set local cooldown for 5 minutes
      const expiry = Date.now() + 60 * 1000;
      localStorage.setItem("otpCooldown", expiry.toString());
    } catch (err) {
      console.error("OTP send failed", err);
      setMessage("Faild to sent otp");
    } finally {
      setSentLoading(false);
    }
  };

  // ========= counter

  const [cooldownLeft, setCooldownLeft] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const cooldown = localStorage.getItem("otpCooldown");
      if (cooldown) {
        const diff = parseInt(cooldown) - Date.now();
        if (diff > 0) {
          setCooldownLeft(Math.floor(diff / 1000));
        } else {
          setCooldownLeft(null);
          localStorage.removeItem("otpCooldown");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // end

  const hasSentRef = useRef(false);

  useEffect(() => {
    if (!hasSentRef.current && !user?.data?.email_verified) {
      SentOtp();
      hasSentRef.current = true;
    }
  }, [user?.data?.email_verified]);

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      {message ? (
        <h2 className="text-lg font-semibold text-red-400 text-center mb-4">
          {message}
        </h2>
      ) : (
        <h2 className="text-lg font-semibold text-center mb-4">
          Verify your account
        </h2>
      )}
      {isSentLoading ? (
        <div className="flex flex-col items-center gap-2 py-6">
          <RiMailSendLine className="text-4xl text-blue-600 animate-bounce" />
          <p className="text-slate-600 text-sm animate-pulse">
            Sending OTP to your email...
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 text-center mb-6">
            We’ve sent a 6-digit verification code to{" "}
            {user?.data?.email ?? "your email or phone"}.
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
        </div>
      )}
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
          disabled={isSentLoading}
          onClick={HandleVerifyOtp}
          className={`w-full bg-blue-600 text-white cursor-pointer py-2 rounded-md mb-3 ${
            isSentLoading && `animate-pulse`
          }`}
        >
          {isSentLoading ? `Sending code ...` : `Verify Code`}
        </button>
      )}

      <p className="text-center text-sm text-gray-600">
        Didn’t receive it?{"  "}
        {cooldownLeft ? (
          <b>Try after {cooldownLeft} Seconds</b>
        ) : (
          <button
            onClick={SentOtp}
            className="text-blue-600 hover:underline"
            type="button"
          >
            Resend code
          </button>
        )}
      </p>
    </motion.div>
  );
};

export default OtpVerification;
