import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  FaEnvelope,
  FaInfoCircle,
  FaPhone,
  FaSignInAlt,
  FaUserCheck,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

import { Link, NavLink } from "react-router-dom";
import Dialog from "./dialogs/Dialog";
import OtpVerification from "../Auth/OtpVerification";
import { AnimatePresence } from "framer-motion";
import Signup from "../Auth/SignUp";
import Login from "../Auth/Login";
import { httpClient } from "../services/http";
import { TbUserSquare } from "react-icons/tb";
import { GlobalContext } from "../guard/GlobalContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "otp">("login");
  const [email, setEmail] = useState<string>("");
  const http = new httpClient();
  const { user , setGfilter , gfilter} = useContext(GlobalContext);

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
      <div className="flex items-center cursor-pointer justify-around list-none py-3">
        <h1 onClick={()=>{location.href='/'}}>PropertyPro</h1>

        <div className="flex gap-3">
          <li className="nav cursor-pointer">
            <NavLink to="/">Stays</NavLink>
          </li>
          <li  className="nav cursor-pointer">Properties</li>
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
              <div
                className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 shadow-lg rounded-xl z-50 animate-fade-in-up"
                role="menu"
                aria-orientation="vertical"
                aria-label="User menu"
              >
                {/* Triangle Arrow */}
                <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white rotate-45 border-t border-l border-slate-200 shadow-sm z-0" />

                <div className="py-2 divide-y divide-slate-200">
                  {/* Verify Email */}

                  { 
                  http.isAuthenticated() && !user.data?.email_verified ? (
                    <button
                      onClick={() => {
                        setMode("otp");
                        setOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2  w-full text-left px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                      role="menuitem"
                    >
                      <FaEnvelope className="text-slate-500 text-xl" /> Verify
                      Email
                    </button>
                  ) : http.isAuthenticated() && user?.data.email_verified? (
                    <Link to="/profile" onClick={()=>{setDropdownOpen(false)}}>
                      <button
                        className="flex items-center gap-2  w-full text-left px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                        role="menuitem"
                      >
                        <FaUserCheck className="text-slate-500 text-xl" />
                        Profile
                      </button>
                    </Link>
                  ):null}

                  {/* Login */}

                  {http.isAuthenticated() ? null : (
                    <button
                      onClick={() => {
                        setMode("login");
                        setOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                      role="menuitem"
                    >
                      <FaSignInAlt className="text-slate-500 text-xl" /> Login
                    </button>
                  )}

                  {/* Signup */}
                  {http.isAuthenticated() ? null : (
                    <button
                      onClick={() => {
                        setMode("signup");
                        setOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                      role="menuitem"
                    >
                      <FaUserPlus className="text-slate-500 text-xl" /> Signup
                    </button>
                  )}

                  {/* About */}
                  <NavLink
                    to="/about"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                    role="menuitem"
                  >
                    <FaInfoCircle className="text-slate-500 text-xl" /> About
                  </NavLink>

                  {/* Contact */}
                  <NavLink
                    to="/contact"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-5 py-2.5 text-nd text-slate-700 hover:bg-slate-100 transition rounded-md"
                    role="menuitem"
                  >
                    <FaPhone className="text-slate-500 text-xl" /> Contact
                  </NavLink>
                  {http.isAuthenticated() ? (
                    <button
                      onClick={() => {
                        new httpClient().logout();
                      }}
                      className="flex items-center gap-2 w-full text-left cursor-pointer px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                      role="menuitem"
                    >
                      <FaSignInAlt className="text-slate-500 text-xl" /> Logout
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {http.isAuthenticated() ? null : (
            <button
              onClick={() => {
                setMode("login");
                setOpen(true);
              }}
              className="flex items-center justify-center cursor-pointer gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <TbUserSquare />
              Login
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
     {
      gfilter?(
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
      ):null
     }

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
            <Signup
              key="signup"
              switchToLogin={() => setMode("login")}
              otpEmail={setEmail}
              switchOtp={() => setMode("otp")}
            />
          ) : (
            mode === "otp" && <OtpVerification email={email} />
          )}
        </AnimatePresence>
      </Dialog>
    </header>
  );
}
