import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiSearch,
  FiGlobe,
  FiMail,
} from "react-icons/fi";

const LocationFeature: React.FC = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fields = [
    {
      name: "address",
      label: "Street Address",
      placeholder: "e.g., 123 Main St",
      icon: <FiMapPin />,
    },
    {
      name: "city",
      label: "City",
      placeholder: "e.g., New York",
      icon: <FiGlobe />,
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Select a country",
      icon: <FiGlobe />,
      isSelect: true,
    },
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "e.g., 10001",
      icon: <FiSearch />,
    },
  ];

  const mapVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <motion.div
        className="w-full max-w-6xl mx-auto bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Column: Form */}
        <div className="p-8 lg:p-12 w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
              <FiMapPin className="text-blue-500" /> Location Details
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Help us find your amazing property.
            </p>
          </motion.div>

          <form className="space-y-6">
            {fields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <label
                  htmlFor={field.name}
                  className="text-sm text-gray-300 mb-2 block font-medium flex items-center gap-2"
                >
                  {field.icon} {field.label}
                </label>
                {field.isSelect ? (
                  <motion.select
                    id={field.name}
                    name={field.name}
                    value={formData.country}
                    onChange={handleChange}
                    onFocus={() => setActiveField(field.name)}
                    onBlur={() => setActiveField(null)}
                    className={`w-full p-4 rounded-xl border ${
                      activeField === field.name
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-700"
                    } focus:outline-none transition-all bg-gray-700 text-white`}
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </motion.select>
                ) : (
                  <motion.input
                    id={field.name}
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    onFocus={() => setActiveField(field.name)}
                    onBlur={() => setActiveField(null)}
                    className={`w-full p-4 rounded-xl border ${
                      activeField === field.name
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-700"
                    } focus:outline-none transition-all bg-gray-700 text-white`}
                  />
                )}
              </motion.div>
            ))}
          </form>
        </div>

        {/* Right Column: Visual Map Representation */}
        <motion.div
          className="relative hidden lg:flex w-full lg:w-1/2 min-h-[400px] rounded-r-3xl"
          initial="hidden"
          animate="visible"
          variants={mapVariants}
        >
          <div className="absolute inset-0 bg-gray-700 rounded-3xl p-8 flex items-center justify-center">
            <img
              src="https://via.placeholder.com/800x600.png?text=Interactive+Map+Placeholder"
              alt="Interactive Map Placeholder"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80"
            />
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0],
                  boxShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0px 8px 15px rgba(0,0,0,0.2)",
                    "0px 0px 0px rgba(0,0,0,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <FiMapPin />
              </motion.div>
              <motion.div
                className="mt-4 bg-gray-800 rounded-full shadow-md px-6 py-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="font-semibold text-gray-200">
                  Your amazing location!
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocationFeature;