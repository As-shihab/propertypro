import { motion } from "framer-motion";
import { FiStar, FiCoffee, FiWifi, FiChevronRight } from "react-icons/fi";
import { FaBed } from "react-icons/fa";
const SimpleHotelPackage: React.FC = () => {
  const name = "Deluxe Package";
  const price = "$299";
  const billingCycle = "per night";
  const description = "Experience ultimate comfort with our most popular package.";
  
  const features = [
    "Deluxe Room (2 Guests)",
    "Complimentary Breakfast",
    "High-speed WiFi",
    "24-hour room service",
  ];
  
  const privileges = [
    "Early Check-in (12:00 PM)",
    "Late Check-out (2:00 PM)",
    "Complimentary Minibar",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <motion.div
        className="rounded-2xl p-6 shadow-xl flex flex-col transition-all duration-300 w-full max-w-sm
        bg-gray-800/50 border border-gray-700 text-white"
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-bold">{name}</h3>
          <span className="text-3xl font-extrabold text-blue-400">{price}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        <div className="flex items-end mb-6">
          <span className="text-lg text-gray-400">{billingCycle}</span>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-base mb-2">Features</h4>
          <ul className="text-gray-300 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaBed className="text-blue-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {privileges.length > 0 && (
          <div className="border-t border-gray-700 pt-4 mt-auto">
            <h4 className="font-bold text-base mb-2 flex items-center gap-1">
              <FiStar className="text-yellow-400" /> Privileges
            </h4>
            <ul className="text-gray-300 space-y-2">
              {privileges.map((privilege, index) => (
                <li key={index} className="flex items-center gap-2 font-medium">
                  <FiChevronRight className="text-blue-400" />
                  <span>{privilege}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <motion.button
          className={`w-full py-3 rounded-lg font-bold text-lg mt-6
            bg-blue-500 text-white hover:bg-blue-600
          `}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Book Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SimpleHotelPackage;