import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaBed,
  FaStar,
  FaClock,
  FaLock,
  FaWifi,
  FaSwimmer,
  FaDumbbell,
  FaParking,
  FaUtensils,
  FaCocktail,
  FaSpa,
  FaPaw,
  FaSnowflake,
  FaConciergeBell,
  FaFacebook,
  FaInstagram,
  FaHotel,
  FaBuilding,
  FaHome,
  FaPlus,
  FaSearch,
  FaTimes,
  FaBriefcase,
  FaTshirt,
  FaCoffee,
} from "react-icons/fa";
import { FaChild } from "react-icons/fa6";
import { ListingContext } from "../../../../../Context/ListingContext";

type BasicInfoProps = {
  listingType: "property" | "hotel" | "local";
  onChange?: (data: any) => void;
};

// Styled helper components (keeping them for clarity)
const InputWithIcon = ({ icon, label, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative"
  >
    {label && (
      <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
        {label}
      </label>
    )}
    <div className="relative flex items-center">
      <div className="absolute left-3 text-gray-400 dark:text-gray-500">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      />
    </div>
  </motion.div>
);

const TextareaWithIcon = ({ icon, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative md:col-span-2"
  >
    <div className="absolute top-4 left-3 text-gray-400 dark:text-gray-500">
      {icon}
    </div>
    <textarea
      {...props}
      rows={4}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
    />
  </motion.div>
);

const SelectWithIcon = ({ icon, options, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative flex items-center"
  >
    <div className="absolute left-3 text-gray-400 dark:text-gray-500 z-10">
      {icon}
    </div>
    <select
      {...props}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-colors duration-200"
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </motion.div>
);

const BasicInfo = ({ listingType, onChange }: BasicInfoProps) => {
  const { setBasicinfoStep , basicinfoStep} = useContext(ListingContext);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    checkIn: "14:00",
    checkOut: "12:00",
    policies: "",
    rooms: 1,
    stars: 3,
    amenities: [] as string[],
    facebook: "",
    instagram: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const newAmenities = prev.amenities.includes(value)
          ? prev.amenities.filter((a) => a !== value)
          : [...prev.amenities, value];
        const newFormData = { ...prev, amenities: newAmenities };
        if (onChange) onChange(newFormData);
        return newFormData;
      });
    } else {
      setFormData((prev) => {
        const newFormData = { ...prev, [name]: value };
        if (onChange) onChange(newFormData);
        return newFormData;
      });
    }
  };

  const allSlides = [
    { title: "General Info", color: '', icon: <FaInfoCircle /> },
    { title: "Contact & Website", color: '', icon: <FaEnvelope /> },
    { title: "Amenities & Policies", color: '', icon: <FaLock /> },
    { title: "Social Links", color: '', icon: <FaFacebook /> },
  ];

  if (listingType.toLowerCase().trim() === "hotel") {
    allSlides.splice(2, 0, { title: "Rooms & Stars", color: '', icon: <FaBed /> });
  }

  const amenitiesOptions = [
    { label: "WiFi", icon: <FaWifi /> },
    { label: "Pool", icon: <FaSwimmer /> },
    { label: "Gym", icon: <FaDumbbell /> },
    { label: "Parking", icon: <FaParking /> },
    { label: "Restaurant", icon: <FaUtensils /> },
    { label: "Bar", icon: <FaCocktail /> },
    { label: "Spa", icon: <FaSpa /> },
    { label: "Pet Friendly", icon: <FaPaw /> },
    { label: "Air Conditioning", icon: <FaSnowflake /> },
    { label: "Room Service", icon: <FaConciergeBell /> },
    { label: "Breakfast Included", icon: <FaCoffee /> },
    { label: "Laundry Service", icon: <FaTshirt /> },
    { label: "Concierge", icon: <FaConciergeBell /> },
    { label: "Family Rooms", icon: <FaChild /> },
    { label: "Business Center", icon: <FaBriefcase /> },
  ];

  const filteredAmenities = amenitiesOptions.filter((amenity) =>
    amenity.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full h-full max-w-6xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 -z-10"></div>

      {/* Form Content Area */}
      <div className="flex-1 overflow-auto pr-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white flex items-center gap-3">
          {allSlides[basicinfoStep].icon} {allSlides[basicinfoStep].title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Provide the basic details for your **{listingType}** listing.
        </p>

        <AnimatePresence mode="wait">
          {basicinfoStep ===
            allSlides.findIndex((s) => s.title === "General Info") && (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <InputWithIcon
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={
                    listingType.toLocaleLowerCase().trim() === "hotel" ? "Hotel Name" : "Property Name"
                  }
                  icon={listingType === "hotel" ? <FaHotel /> : <FaHome />}
                />
                <InputWithIcon
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  icon={<FaBuilding />}
                />
                <TextareaWithIcon
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  icon={<FaInfoCircle />}
                />
              </motion.div>
            )}

          {basicinfoStep ===
            allSlides.findIndex((s) => s.title === "Contact & Website") && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <InputWithIcon
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="Contact Email"
                  icon={<FaEnvelope />}
                />
                <InputWithIcon
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="Contact Phone"
                  icon={<FaPhone />}
                />
                <InputWithIcon
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website URL"
                  icon={<FaGlobe />}
                />
              </motion.div>
            )}

          {listingType === "hotel" &&
            basicinfoStep ===
            allSlides.findIndex((s) => s.title === "Rooms & Stars") && (
              <motion.div
                key="rooms"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <InputWithIcon
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder="Number of Rooms"
                  icon={<FaBed />}
                  min={1}
                />
                <SelectWithIcon
                  name="stars"
                  value={formData.stars}
                  onChange={handleChange}
                  icon={<FaStar />}
                  options={[1, 2, 3, 4, 5].map((n) => ({
                    value: n,
                    label: `${n} Star${n > 1 ? "s" : ""}`,
                  }))}
                />
                <InputWithIcon
                  type="time"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  label="Check-in"
                  icon={<FaClock />}
                />
                <InputWithIcon
                  type="time"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  label="Check-out"
                  icon={<FaClock />}
                />
              </motion.div>
            )}

          {basicinfoStep ===
            allSlides.findIndex(
              (s) => s.title === "Amenities & Policies"
            ) && (
              <motion.div
                key="amenities"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesOptions.slice(0, 6).map((amenity) => (
                      <label
                        key={amenity.label}
                        className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors duration-200
                      bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                      >
                        <input
                          type="checkbox"
                          value={amenity.label}
                          checked={formData.amenities.includes(amenity.label)}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-200
                        ${formData.amenities.includes(amenity.label)
                              ? "bg-indigo-600 border-indigo-600"
                              : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                            }`}
                        >
                          {formData.amenities.includes(amenity.label) && (
                            <motion.svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <path d="M9.707 14.293a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 12.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-.083.123z" />
                            </motion.svg>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          {amenity.icon}
                          <span className="text-sm font-medium">
                            {amenity.label}
                          </span>
                        </div>
                      </label>
                    ))}
                    {amenitiesOptions.length > 6 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAmenitiesModal(true)}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer transition-colors duration-200 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200"
                      >
                        <FaPlus />
                        Add More
                      </motion.button>
                    )}
                  </div>
                </div>
                <TextareaWithIcon
                  name="policies"
                  value={formData.policies}
                  onChange={handleChange}
                  placeholder="Policies & rules"
                  icon={<FaLock />}
                />
              </motion.div>
            )}

          {basicinfoStep ===
            allSlides.findIndex((s) => s.title === "Social Links") && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <InputWithIcon
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  icon={<FaFacebook />}
                />
                <InputWithIcon
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                  icon={<FaInstagram />}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Steps Sidebar */}
      <div className="w-full md:w-64 pt-8 md:p-8 flex-shrink-0 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white hidden md:block">
          Your Progress
        </h3>
        <div className="flex md:flex-col gap-2 md:gap-4 w-full justify-center">
          {allSlides.map((slide, index) => (
            <motion.div
              key={index}
              onClick={() => { setBasicinfoStep(index) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-4 px-4 py-2 rounded-xl cursor-pointer transition-colors duration-300
                ${basicinfoStep === index
                  ? "text-indigo-600 font-bold dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-indigo-500"
                }
              `}
            >
              <span
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                ${basicinfoStep === index
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900"
                    : "border-gray-300 dark:border-gray-600"
                  }`}
              >
                {slide.icon}
              </span>
              <span className="hidden md:block">{slide.title}</span>
              {basicinfoStep === index && (
                <motion.span
                  layoutId="sidebar-indicator"
                  className="absolute inset-0 bg-blue-500/20 rounded-xl -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Amenities Modal */}
      <AnimatePresence>
        {showAmenitiesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/30"
            onClick={() => setShowAmenitiesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  All Amenities
                </h3>
                <motion.button
                  onClick={() => setShowAmenitiesModal(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-transform"
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  type="text"
                  placeholder="Search amenities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
              </div>

              {/* Amenities List */}
              <motion.div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {filteredAmenities.length > 0 ? (
                    filteredAmenities.map((amenity, index) => (
                      <motion.label
                        key={amenity.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                        }}
                        className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors duration-200 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                      >
                        <input
                          type="checkbox"
                          value={amenity.label}
                          checked={formData.amenities.includes(amenity.label)}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-200
                          ${formData.amenities.includes(amenity.label)
                              ? "bg-indigo-600 border-indigo-600"
                              : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                            }`}
                        >
                          {formData.amenities.includes(amenity.label) && (
                            <motion.svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <path d="M9.707 14.293a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 12.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-.083.123z" />
                            </motion.svg>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          {amenity.icon}
                          <span className="text-sm font-medium">
                            {amenity.label}
                          </span>
                        </div>
                      </motion.label>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-500 dark:text-gray-400 col-span-2 mt-4"
                    >
                      No amenities found.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAmenitiesModal(false)}
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold transition-colors hover:bg-blue-700"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BasicInfo;