import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Welcome from "../listing/slideList/welcome";
import BasicInfo from "./slideList/BasicInfo";
import LocationFeature from "./slideList/LocationFeature";
import MediaSection from "./slideList/MediaSection";
import PricingSection from "./slideList/PricingSection";
import { ListingContext } from "../../../../Context/ListingContext";
import { httpClient } from "../../../../services/http";

function ListingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const steps = ["Welcome", "Basic Info", "Location", "Media", "Review"];
  const http =new httpClient();
  // Track user selection
  const [listingType, setListingType] = useState<"property" | "hotel" | "local" | null>(null);

  const handleSelectListing = (type: "property" | "hotel" | "local") => {
    setListingType(type);
    setCurrentStep(2); // Move to next step
  };


  const [category, setCategory] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const FetchListingData = async () => {
      if(currentStep ===1) {
       if(!category) {
        console.log("Fetching categories...");
          setLoading(true);
         await http.get("/odata/Categorys").then((response:any) => {
           setCategory(response.data.value);
            setLoading(false);
         }).catch((error) => {
           console.error("Error fetching categories:", error);
         });
        }
      }
    }

    FetchListingData();
  },[currentStep])



  return (
    <ListingContext.Provider value={{ listingType, setListingType , category ,isLoading }}>
    <div className="relative h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto gap-8 px-6">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {currentStep === 1 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Welcome onSelectListing={handleSelectListing} />
            </motion.div>
          )}

          {/* Basic Info Step */}
          {currentStep === 2 && listingType && (
            <motion.div
              key="basicInfo"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <BasicInfo listingType={listingType} />
            </motion.div>
          )}

          {/* Placeholder for future steps */}
          {currentStep == 3 && (
            // inside your ListingContainer component's JSX
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <LocationFeature />
            </motion.div>
          )}

 {currentStep == 4 && (
            // inside your ListingContainer component's JSX
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
             <MediaSection/>
            </motion.div>
          )}


 {currentStep == 5 && (
            // inside your ListingContainer component's JSX
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <PricingSection />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-4/5 backdrop-blur-lg bg-white/30 dark:bg-gray-900/40 rounded-3xl shadow-2xl py-5 px-6 flex justify-between items-center z-50 border border-white/20 dark:border-gray-700"
      >
        {/* Previous */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 12px #3b82f6" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
          disabled={currentStep <= 1}
          className="bg-blue-600/90 text-white px-6 py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </motion.button>

        {/* Progress Bar */}
        <div className="flex-1 mx-6 flex flex-col justify-center">
          <div className="flex justify-between mb-2 text-sm text-gray-200 dark:text-gray-400">
            {steps.map((label, index) => (
              <motion.span
                key={index}
                animate={{
                  color: currentStep >= index + 1 ? "#3b82f6" : "#9ca3af",
                  scale: currentStep === index + 1 ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="font-medium text-center flex-1"
              >
                {label}
              </motion.span>
            ))}
          </div>
          <div className="w-full bg-gray-300/50 dark:bg-gray-700/40 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-blue-500 h-3 rounded-full shadow-[0_0_10px_#3b82f6]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5, type: "spring" }}
            />
          </div>
        </div>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 12px #3b82f6" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentStep(Math.min(currentStep + 1, totalSteps))}
          disabled={currentStep >= totalSteps}
          className="bg-blue-600/90 text-white px-6 py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </motion.button>
      </motion.div>
    </div>
    </ListingContext.Provider>
  );
}

export default ListingContainer;
