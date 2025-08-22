import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ListingContext } from "../../../../../Context/ListingContext";
import { FaHotel } from "react-icons/fa6";

interface WelcomeProps {
  onSelectListing: (type: "property" | "hotel" | "local") => void;
}

const Welcome = ({ onSelectListing }: WelcomeProps) => {
  const [selected, setSelected] = useState<null | "property" | "hotel" | "local">(null);
  const { category, isLoading, setCatId } = useContext(ListingContext);

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6 text-center h-full">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-4">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">Aptigen</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Start creating your listings today! Choose what you want to list:
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {isLoading || !category ? (
          // Loading state (3 skeleton cards matching your actual listing count)
          [...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center gap-3 py-8 rounded-2xl border-2 border-slate-700 bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="h-6 w-24 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </motion.div>
          ))
        ) : (
          // Actual content
          Object.values(category).map((option: any) => (
            <motion.button
              key={option?.name}
              onClick={() => {
                setCatId(option?.id);
                setSelected('hotel' as any);
                onSelectListing(String(option?.name).toLowerCase()as any);
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #3b82f6" }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center gap-3 py-8 rounded-2xl transition-all border-2
                ${selected === option?.name
                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900"
                  : "border-gray-300 bg-white dark:bg-gray-800"
                } shadow-lg`}
            >
              <div className="text-indigo-600 dark:text-indigo-400"> {<FaHotel size={28} />}</div>
              <span
                className={`text-lg font-semibold ${selected === option?.name
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-200"
                  }`}
              >
                {option?.name}
              </span>
            </motion.button>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;