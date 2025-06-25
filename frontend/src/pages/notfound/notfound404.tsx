import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGhost } from "react-icons/fa";

export default function NotFound404() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white text-gray-800 p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaGhost className="inline-block text-indigo-500" />
        </motion.div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Page not found. Don’t be scared!</p>
        <Link
          to="/"
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
