import {useState } from "react";
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
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setMode("login"), 300); // reset after close
  };

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

          <div
            className="rounded-full flex cursor-pointer py-3 px-4 items-center gap-3 shadow-sm"
            onClick={() => setOpen(true)}
          >
            <FaBarsStaggered />
            <FaUserCircle className="text-2xl" />
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
        title={mode === "login" ? "Login" : "Sign Up"}
      >
          {/* <OtpVerification email="study.shihab@gmail.com"/> */}

        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <Login key="login" switchToSignup={() => setMode("signup")} />
          ) : (
            <Signup key="signup" switchToLogin={() => setMode("login")} />
          )}
        </AnimatePresence>
      </Dialog>
    </header>
  );
}
