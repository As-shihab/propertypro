import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  FaEnvelope,
  FaInfoCircle,
  FaMoon,
  FaPhone,
  FaSignInAlt,
  FaSun,
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
import { useTheme } from "../Context/Theme.context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "otp">("login");
  const [email, setEmail] = useState<string>("");
  const http = new httpClient();
  const { user, gfilter } = useContext(GlobalContext);
  console.log(user, "user in header");
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setMode("login"), 300);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, toggleTheme } = useTheme();


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
    <header className="border-b pb-3  bg-white border-slate-200">
      {/* Top Navigation */}
      <div className="flex items-center cursor-pointer justify-around list-none py-3">

        <h1
          onClick={() => { location.href = "/"; }}
          className="flex items-center gap-3 text-3xl font-extrabold cursor-pointer group select-none"
          aria-label="Aptigen Home"
        >
          {/* Animated Icon */}
          <div className="relative">
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-full blur-md bg-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></span>

            <svg
              className="relative z-10 w-10 h-10 text-blue-600 group-hover:text-blue-800 transition-colors duration-300 transform group-hover:rotate-12 group-hover:scale-110"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l1.5 1.5L12 4l8.5 4.5L22 7l-10-5z" />
              <path d="M12 12l-8.5 4.5L2 17l10 5 10-5-1.5-1.5L12 12z" />
            </svg>
          </div>

          {/* Brand Text */}
          <span className="relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 
      group-hover:from-blue-800 group-hover:via-blue-700 group-hover:to-blue-600 
      transition-all duration-700 group-hover:scale-105 inline-block">
              Aptigen
            </span>

            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
      animate-[shimmer_2s_infinite] bg-clip-text text-transparent"></span>
          </span>
        </h1>



        <div className="flex gap-3">
          <li className="nav cursor-pointer">
            <NavLink to="/">Stays</NavLink>
          </li>
          <li className="nav cursor-pointer">
            {" "}
            <NavLink to="/propertys">Propertys</NavLink>
          </li>
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

                  {http.isAuthenticated() && user ? (
                    !user?.verified ? (
                      <button
                        onClick={() => {
                          setMode("otp");
                          setOpen(true);
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                        role="menuitem"
                      >
                        <FaEnvelope className="text-slate-500 text-xl" /> Verify
                        Email
                      </button>
                    ) : (
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <button
                          className="flex items-center gap-2 w-full text-left px-5 py-2.5 text-md text-slate-700 hover:bg-slate-100 transition rounded-md"
                          role="menuitem"
                        >
                          <FaUserCheck className="text-slate-500 text-xl" />
                          Profile
                        </button>
                      </Link>
                    )
                  ) : null}

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

                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-md transition
                 text-slate-700 dark:text-slate-200
                 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {resolvedTheme === "dark" ? (
                      <>
                        <FaSun className="text-yellow-400 text-lg" /> Light
                      </>
                    ) : (
                      <>
                        <FaMoon className="text-slate-500 text-lg" /> Dark
                      </>
                    )}
                  </button>

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
      {gfilter ? (
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
      ) : null}

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
