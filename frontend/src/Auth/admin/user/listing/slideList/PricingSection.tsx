import { motion } from "framer-motion";
import { FiDollarSign, FiStar, FiChevronRight } from "react-icons/fi";
import { FaConciergeBell, FaBed, FaWifi, FaCoffee } from "react-icons/fa";
import { JSX } from "react";

interface Privilege {
  name: string;
  icon: JSX.Element;
}

interface HotelPackageProps {
  name: string;
  price: string;
  billingCycle: string;
  description: string;
  features: string[];
  privileges: Privilege[];
  isHighlighted?: boolean;
}

const HotelPackage: React.FC<HotelPackageProps> = ({
  name,
  price,
  billingCycle,
  description,
  features,
  privileges,
  isHighlighted = false,
}) => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1 },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className={`
        rounded-3xl p-8 shadow-xl flex flex-col transition-all duration-300
        ${isHighlighted
          ? "bg-gray-700/60 border border-blue-500 backdrop-blur-sm relative"
          : "bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
        }
      `}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-bold flex items-center gap-2">
          {isHighlighted && <FiStar className="text-yellow-400" />}
          {name}
        </h3>
        <span className="text-4xl font-extrabold text-blue-400">{price}</span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="flex items-end mb-8">
        <span className="text-2xl font-medium text-gray-400">{billingCycle}</span>
      </div>

      <div className="mb-8">
        <h4 className="font-bold text-lg mb-4 text-white">Features Included</h4>
        <ul className="text-gray-300 w-full space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3"
              variants={featureVariants}
              custom={index}
            >
              <FaBed className="text-blue-400 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {privileges.length > 0 && (
        <div className="border-t border-gray-600 pt-8 mt-auto">
          <h4 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
            <FiStar className="text-yellow-400" /> Exclusive Privileges
          </h4>
          <ul className="text-gray-300 w-full space-y-3">
            {privileges.map((privilege, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 font-semibold"
                variants={featureVariants}
                custom={index}
              >
                {privilege.icon}
                <span>{privilege.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <motion.button
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-8
          ${isHighlighted
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Now
      </motion.button>
    </motion.div>
  );
};

export default HotelPackage;