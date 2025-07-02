import { useEffect, useRef, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import Dialog from "./dialogs/Dialog";
import OtpVerification from "../Auth/OtpVerification";
import { AnimatePresence } from "framer-motion";
import Signup from "../Auth/SignUp";
import Login from "../Auth/Login";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "otp">("login");
  const [email, setEmail] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setMode("login"), 300);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b pb-3 border-slate-200">
      {/* Top Navigation */}
      <div className="flex items-center justify-around list-none py-3">
        <h1>PropertyPro</h1>

        <div className="flex gap-3">
          <li className="nav cursor-pointer">
            <NavLink to="/">Stays</NavLink>
          </li>
          <li className="nav cursor-pointer">Properties</li>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <AiOutlineGlobal />
            <span>Find your best</span>
          </div>

          <div className="relative" ref={menuRef}>
            {/* Avatar Button */}
            <div
              className="rounded-full flex cursor-pointer py-2 px-4 items-center gap-3 shadow-md hover:shadow-lg transition duration-200 bg-white border"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <FaBarsStaggered />
              <FaUserCircle className="text-2xl text-slate-600" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 shadow-xl rounded-xl z-50 animate-fade-in-up">
                {/* Triangle Arrow */}
                <div className="absolute top-[-8px] right-4 w-3 h-3 bg-white transform rotate-45 border-t border-l border-slate-200 z-0" />

                <div className="py-2">
                  <button
                    onClick={() => {
                      setMode("login");
                      setOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition rounded-md"
                  >
                    🔐 Login
                  </button>

                  <button
                    onClick={() => {
                      setMode("signup");
                      setOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition rounded-md"
                  >
                    ✍️ Signup
                  </button>

                  <NavLink
                    to="/about"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition rounded-md"
                  >
                    ℹ️ About
                  </NavLink>

                  <NavLink
                    to="/contact"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition rounded-md"
                  >
                    📞 Contact
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full text-center text-slate-600">
        <div className="w-[60%] m-auto border p-2 px-5 border-slate-200 rounded-full">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex cursor-pointer flex-col">
              <span>Filter your location</span>
              <span className="text-xs">click to filter location</span>
            </div>

            <div className="flex cursor-pointer gap-4">
              <div className="flex flex-col gap-1">
                <div>Check In</div>
                <span className="text-xs">Select date</span>
              </div>

              <div className="flex flex-col gap-1">
                <div>Check Out</div>
                <span className="text-xs">Select date</span>
              </div>
            </div>

            <div className="flex cursor-pointer flex-col">
              <span>Guests</span>
              <span className="text-xs">Add guests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog
        isOpen={open}
        onClose={handleClose}
        title={
          mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : mode === "otp"
            ? "OTP Verification"
            : ""
        }
      >
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <Login key="login" switchToSignup={() => setMode("signup")} />
          ) : mode === "signup" ? (
            <Signup key="signup" switchToLogin={() => setMode("login")} otpEmail={setEmail}  switchOtp={()=>setMode('otp')} />
          ) : (
            mode === "otp" && <OtpVerification  email={email}/>
          )}
        </AnimatePresence>
      </Dialog>
    </header>
  );
}
