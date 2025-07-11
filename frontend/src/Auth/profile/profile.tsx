import  { useContext } from "react";
import { FaEdit, FaUserFriends, FaHeart, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import Img from "../../assets/images/loign.jpg"; // Adjust the path as necessary
import {LazyLoadImage } from "react-lazy-load-image-component";
import { GlobalContext } from "../../guard/GlobalContext";

export default function ProfilePage() {
  const {setGfilter}= useContext(GlobalContext)
  setGfilter(false)
  return (
    <div className="min-h-screen bg-white p-6">
      <LazyLoadImage src={Img} alt="Profile Background" className="w-full h-60 object-cover mb-6 rounded-lg shadow-lg" />
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden w-4/5">
        {/* Cover Image */}
        <div className="relative h-60 sm:h-80 md:h-96 bg-[url('/cover.jpg')] bg-cover bg-center">
          <div className="absolute bottom-4 left-4 bg-white/70 px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow">
            Energetic Profile
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="relative"
          >
            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition">
              <FaCamera size={14} />
            </button>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800">Shihab Rahman</h2>
            <p className="text-slate-500 mt-1">Full Stack Developer | Laravel & React Enthusiast</p>
            <p className="text-slate-600 mt-2">Location: Dhaka, Bangladesh</p>
            <p className="text-slate-600 mt-1">Email: shihab@example.com</p>

            <div className="flex justify-center md:justify-start gap-3 mt-3">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                Follow
              </button>
              <button className="bg-slate-200 text-slate-700 px-5 py-2 rounded-xl hover:bg-slate-300 transition flex items-center gap-2">
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-slate-100 text-center">
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600">120</h3>
            <p className="text-slate-500">Posts</p>
          </div>
          <div className="p-6 border-x border-slate-100">
            <h3 className="text-xl font-bold text-blue-600">2.3K</h3>
            <p className="text-slate-500">Followers</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600">980</h3>
            <p className="text-slate-500">Following</p>
          </div>
        </div>

        {/* Bio / About Section */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-slate-700 mb-2">About Me</h4>
          <p className="text-slate-600 leading-relaxed">
            Passionate full-stack developer with 3+ years of experience building enterprise apps. I'm
            skilled in modern technologies like Laravel, Node.js, React, and Tailwind CSS. I love to work
            on scalable applications, and I am constantly learning new things to stay ahead in tech.
          </p>

          <div className="mt-4">
            <h5 className="font-semibold text-slate-700">Skills:</h5>
            <ul className="list-disc pl-5 text-slate-600">
              <li>JavaScript (React, Node.js, Express)</li>
              <li>PHP (Laravel, Symfony)</li>
              <li>CSS (Tailwind CSS, Bootstrap)</li>
              <li>Databases (MySQL, MongoDB)</li>
              <li>Version Control (Git, GitHub)</li>
            </ul>
          </div>
        </div>

        {/* Purchased Tour Packages Section */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <h4 className="text-lg font-semibold text-slate-700 mb-2">Purchased Tour Packages</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <FaUserFriends size={24} className="text-blue-600" />
                <span className="text-slate-700">Tour to Paris - 7 Days</span>
              </div>
              <span className="text-sm text-slate-600">Purchased: 2023-05-10</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <FaUserFriends size={24} className="text-blue-600" />
                <span className="text-slate-700">Adventure in Bali - 5 Days</span>
              </div>
              <span className="text-sm text-slate-600">Purchased: 2023-03-15</span>
            </div>
          </div>
        </div>

        {/* Last Purchase Story Section */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <h4 className="text-lg font-semibold text-slate-700 mb-2">Last Purchase Story</h4>
          <p className="text-slate-600 leading-relaxed">
            Just returned from my **7-day Paris tour**. It was an incredible experience exploring the
            Eiffel Tower, Louvre Museum, and enjoying delicious French cuisine. Highly recommend this
            package to anyone looking to immerse themselves in the rich history and culture of Paris.
          </p>
        </div>

        {/* Social Links Section */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <h4 className="text-lg font-semibold text-slate-700 mb-2">Connect with Me</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://www.linkedin.com/in/shihabrahman" target="_blank" rel="noopener noreferrer">
              <FaUserFriends size={24} className="text-blue-600 hover:text-blue-700 transition" />
            </a>
            <a href="https://github.com/shihabrahman" target="_blank" rel="noopener noreferrer">
              <FaHeart size={24} className="text-red-600 hover:text-red-700 transition" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


