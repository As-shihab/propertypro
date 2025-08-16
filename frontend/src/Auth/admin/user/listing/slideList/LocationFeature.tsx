import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa";
import { FiMapPin, FiWifi, FiDroplet, FiCoffee, FiHeart } from "react-icons/fi";

interface Step2LocationFeaturesProps {
  onNext: (data: HotelFormData) => void;
  onBack: () => void;
  initialData: Partial<HotelFormData>;
}

interface HotelFormData {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  features: string[];
}

interface Amenity {
  icon: React.ReactNode;
  name: string;
}

const LocationFeature: React.FC<Step2LocationFeaturesProps> = ({ 
  onNext, 
  onBack, 
  initialData 
}) => {
  const [formData, setFormData] = useState<HotelFormData>({
    address: initialData.address || "",
    city: initialData.city || "",
    country: initialData.country || "",
    postalCode: initialData.postalCode || "",
    features: initialData.features || []
  });

  const amenities: Amenity[] = [
    { icon: <FiWifi className="text-2xl" />, name: "Free WiFi" },
    { icon: <FiDroplet className="text-2xl" />, name: "Swimming Pool" },
    { icon: <FiCoffee className="text-2xl" />, name: "Restaurant" },
    { icon: "💆", name: "Spa" },
    { icon: "🏋️", name: "Gym" },
    { icon: <FaCar className="text-2xl" />, name: "Parking" },
    { icon: "❄️", name: "AC" },
    { icon: <FiHeart className="text-2xl" />, name: "Pet Friendly" }
  ];

  const [activeField, setActiveField] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-[calc(100vh-490px)] w-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto h-full flex items-center px-4 lg:px-10">
        <AnimatePresence>
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Progress Bar */}
            <motion.div 
              className="h-2 bg-blue-100"
              initial={{ width: "25%" }}
              animate={{ width: "50%" }}
              transition={{ duration: 1, type: "spring" }}
            >
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: "50%" }} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left Column - Form */}
              <motion.div 
                className="p-6 lg:p-10"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2 
                  className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Location Details
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-500 mb-8"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Where is your property located?
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: "address", label: "Street Address", icon: "📍" },
                    { name: "city", label: "City", icon: "🏙️" },
                    { name: "country", label: "Country", icon: "🌎" },
                    { name: "postalCode", label: "Postal Code", icon: "#️⃣" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <label className="block text-gray-700 mb-2 flex items-center">
                        <span className="mr-2">{field.icon}</span>
                        {field.label}
                      </label>
                      <motion.div
                        className={`relative border-2 rounded-xl overflow-hidden transition-all ${
                          activeField === field.name 
                            ? "border-blue-500 shadow-md" 
                            : "border-gray-200"
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        {field.name === "country" ? (
                          <select
                            name="country"
                            className="w-full p-4 bg-transparent focus:outline-none"
                            value={formData.country}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField(field.name)}
                            onBlur={() => setActiveField(null)}
                            required
                          >
                            <option value="">Select a country</option>
                            <option value="USA">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            name={field.name}
                            className="w-full p-4 bg-transparent focus:outline-none"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            value={formData[field.name as keyof HotelFormData] as string}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField(field.name)}
                            onBlur={() => setActiveField(null)}
                            required
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-6"
                  >
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FiHeart className="mr-2 text-pink-500" /> 
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {amenities.map((amenity, index) => (
                        <motion.button
                          key={amenity.name}
                          type="button"
                          className={`p-3 rounded-xl flex flex-col items-center transition-all ${
                            formData.features.includes(amenity.name)
                              ? "bg-blue-100 border-2 border-blue-500"
                              : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                          }`}
                          onClick={() => toggleFeature(amenity.name)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.1 + index * 0.05 }}
                        >
                          <span className="text-2xl mb-1">{amenity.icon}</span>
                          <span className="text-sm">{amenity.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </form>
              </motion.div>

              {/* Right Column - Map Visual */}
              <div className="hidden lg:block relative bg-gradient-to-br from-blue-100 to-purple-100">
                <AnimatePresence>
                  {!mapLoaded ? (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        className="text-6xl"
                      >
                        <FiMapPin className="text-blue-500" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="h-full w-full relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Map placeholder with animated pins */}
                      <div className="absolute inset-0 bg-blue-50 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
                        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
                        
                        <motion.div
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="relative">
                            <div className="w-16 h-16 bg-blue-600 rounded-full opacity-20 animate-ping absolute inset-0" />
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl relative">
                              <FiMapPin />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                        <motion.div
                          className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center"
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <span className="mr-2">📍</span>
                          <span className="font-medium">Your property location</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Buttons */}
            <motion.div
              className="px-6 lg:px-10 pb-6 lg:pb-8 pt-4 lg:pt-6 border-t border-gray-100 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.button
                type="button"
                onClick={onBack}
                className="px-6 lg:px-8 py-2 lg:py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium flex items-center"
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back
              </motion.button>
              
              <motion.button
                type="button"
                onClick={handleSubmit}
                className="px-6 lg:px-8 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(to right, #3b82f6, #8b5cf6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Next Step →
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LocationFeature;