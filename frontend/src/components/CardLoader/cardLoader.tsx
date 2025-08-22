import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CardLoader() {
  return (
    <div className="w-full md:w-[380px] mx-auto p-4">
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
        {/* Image Placeholder */}
        <div className="h-[250px] bg-gray-300 animate-pulse"></div>

        {/* Content Placeholder */}
        <div className="p-4 space-y-3">
          <div className="h-6 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function LoadingGrid() {
  const [count, setCount] = useState(1);
  const maxCards = 12;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < maxCards ? prev + 1 : prev));
    }, 100); // every 0.4s add one card smoothly
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-5">
      <AnimatePresence>
        {[...Array(count)].map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <CardLoader />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
