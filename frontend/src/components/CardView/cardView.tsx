import { useState } from "react";
import { motion } from "framer-motion";
import ImageGalleryDialog from "./ImageGallery";

export default function ProductOverview() {
  const [date, setDate] = useState(new Date());
  const [showGallery, setShowGallery] = useState(false);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        Private Room in the Center of Kuala Lumpur
      </motion.h1>





      {/* Image Gallery */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
      {/* Large Image with Button */}
      <div className="relative">
        <motion.img
          src="/room1.jpg"
          alt="Main Room View"
          whileHover={{ scale: 1.02 }}
          className="rounded-xl shadow-xl object-cover h-full w-full max-h-[500px]"
        />

        {/* Button */}
        <button
          className="absolute bottom-4 right-4 cursor-pointer bg-white/80 text-gray-800 hover:bg-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300"
          onClick={() => {setShowGallery(true)}}
        >
          View All Photos
        </button>
      </div>

      {/* Grid of 4 smaller images */}
      <div className="grid grid-cols-2 gap-4">
        {[2, 3, 4, 5].map((img, i) => (
          <motion.img
            key={i}
            src={`/room${img}.jpg`}
            alt={`Room view ${img}`}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-md object-cover h-48 w-full"
          />
        ))}
      </div>
    </div>




      {/* Ratings and Reviews */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-lg font-medium text-gray-600">Hosted by John Doe</p>
          <p className="text-sm text-gray-500">Superhost · 4.93 stars (178 reviews)</p>
        </div>
        {/* <Button className="bg-pink-600 hover:bg-pink-700 text-white">Reserve</Button> */}
      </motion.div>

      {/* About the Place */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2">About this place</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Enjoy a stylish experience at this centrally-located place in Bukit Bintang. Great location near KL Tower, Alor Street, and major shopping and dining. Fast WiFi, premium linens, and city views make your stay unforgettable.
          </p>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2">What this place offers</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>High speed Wi-Fi</li>
            <li>Air Conditioning</li>
            <li>Private Bathroom</li>
            <li>City View</li>
            <li>Washer</li>
            <li>Dedicated workspace</li>
          </ul>
        </motion.div>
      </div>

      {/* Calendar */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Choose your date</h2>
        {/* <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border w-max" /> */}
      </div>

      {/* Guest Rating Summary */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-yellow-50 rounded-xl p-6 border text-center"
      >
        <h2 className="text-4xl font-bold text-yellow-700 mb-2">4.93</h2>
        <p className="text-gray-700 text-sm">Average rating from 178 guest reviews</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
          <span>Cleanliness: 4.9</span>
          <span>Accuracy: 4.9</span>
          <span>Communication: 5.0</span>
          <span>Location: 4.8</span>
          <span>Check-in: 5.0</span>
          <span>Value: 4.9</span>
        </div>
      </motion.div>



      <ImageGalleryDialog open={showGallery} handleClose={()=>{setShowGallery(false)}}/>
    </div>
  );
}
