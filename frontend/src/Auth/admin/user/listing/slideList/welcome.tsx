import { motion } from "framer-motion";
import { useState } from "react";

const Welcome = ({ onGetStarted }:any) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    "Easy Listing Process",
    "Real-time Analytics",
    "Premium Visibility",
    "Instant Booking"
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-white flex flex-col items-center justify-between p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Content */}
      <div className="max-w-2xl w-full text-center mt-16">
        {/* Welcome Message */}
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Welcome to PropertyPro
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-10"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enjoy these powerful features and much more with PropertyPro.
        </motion.p>

        {/* Feature Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <motion.button
            className="bg-blue-50 text-blue-600 p-4 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Ask Support
          </motion.button>
          
          <motion.button
            className="bg-purple-50 text-purple-600 p-4 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Create Listing
          </motion.button>
          
          <motion.button
            className="bg-green-50 text-green-600 p-4 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Pin Locations
          </motion.button>
        </div>

        {/* Get Started Button */}
        <motion.button
          onClick={onGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full mb-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Start Listing
        </motion.button>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Here's what you can do with PropertyPro
          </h2>
          
          {/* Feature Cards - Auto-rotating */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((item, index) => (
            
              <motion.div
                key={index}
                className={`h-32 rounded-lg flex flex-col items-center justify-center p-4 ${currentFeature === index ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                  {index + 1}
                  {item}
                </div>
                <p className="text-sm text-center font-medium">
                  {features[index]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section with Progress */}
      <div className="w-full max-w-2xl">
        {/* Progress Indicators */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4].map((_step, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            />
          ))}
        </div>
        
        {/* Search Bar */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <input
            type="text"
            placeholder="Search for properties..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Welcome;