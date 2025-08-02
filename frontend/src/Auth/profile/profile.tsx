
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaHeart, FaShareAlt } from "react-icons/fa";

// Dummy review data
const reviews = [
  {
    user: "Samantha J.",
    date: "June 2025",
    rating: 5,
    comment: "Absolutely incredible stay! Rooms were clean, staff was friendly, and the view was breathtaking.",
  },
  {
    user: "Mohammed K.",
    date: "May 2025",
    rating: 4,
    comment: "Very nice experience overall. Only downside was the pool timing.",
  },
];

export default function HotelProfile() {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden mt-10">
      {/* Cover + Avatar + Actions */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Hotel Banner"
          className="w-full h-80 object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-r from-black/70 to-transparent text-white p-6 w-full">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold">The Royal Mirage Hotel</h1>
              <p className="flex items-center gap-2 text-sm mt-1">
                <FaMapMarkerAlt />
                Dubai, UAE
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-gray-800 px-3 py-1 rounded-full shadow hover:bg-gray-100 flex items-center gap-1">
                <FaHeart className="text-red-500" /> Save
              </button>
              <button className="bg-white text-gray-800 px-3 py-1 rounded-full shadow hover:bg-gray-100 flex items-center gap-1">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Host"
          className="absolute bottom-[-40px] left-6 w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      <div className="px-6 py-10">
        {/* Host Info */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Hosted by John Ali</h2>
            <p className="flex items-center gap-3 text-gray-600 mt-1">
              <FaStar className="text-yellow-500" />
              4.9 Rating
              <FaCheckCircle className="text-green-500" />
              Verified Premium Host
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Contact Host
          </button>
        </div>

        {/* Gallery */}
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Photo Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((id) => (
              <img
                key={id}
                src={`https://source.unsplash.com/random/400x300?hotel,${id}`}
                className="rounded-xl object-cover h-40 w-full"
                alt="Gallery"
              />
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-gray-800">About This Hotel</h3>
          <p className="text-gray-600 leading-relaxed">
            Nestled in Dubai’s vibrant cityscape, The Royal Mirage offers a luxury escape with modern amenities and authentic Arabian charm. With beachfront access, world-class cuisine, and full-service spa treatments, this is your perfect destination for vacation or business retreats.
          </p>
        </section>

        {/* Amenities */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-700">
            {["Free Wi-Fi", "Swimming Pool", "Spa", "Airport Shuttle", "Restaurant", "Fitness Center", "Mini Bar", "24/7 Room Service"].map((amenity) => (
              <div key={amenity} className="bg-gray-100 px-3 py-2 rounded-lg">{amenity}</div>
            ))}
          </div>
        </section>

        {/* Rooms */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Room Types & Pricing</h3>
          <div className="space-y-4">
            <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-xl">
              <span className="font-medium text-gray-700">Deluxe Sea View Room</span>
              <span className="text-blue-600 font-bold">$299 / night</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-xl">
              <span className="font-medium text-gray-700">Executive Suite</span>
              <span className="text-blue-600 font-bold">$499 / night</span>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Guest Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <strong>{review.user}</strong>
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaStar /> {review.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Hotel Policies</h3>
          <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
            <li>Check-in: 2:00 PM | Check-out: 11:00 AM</li>
            <li>Free cancellation within 48 hours</li>
            <li>No pets allowed</li>
            <li>Guests must be 18+ to check in</li>
          </ul>
        </section>

        {/* Map */}
        <section className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Location</h3>
          <div className="rounded-xl overflow-hidden h-64 w-full">
            <iframe
              title="Hotel Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Dubai+UAE"
            ></iframe>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-10">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Contact & Support</h3>
          <div className="flex flex-col gap-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-600" />
              +971 55 123 4567
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              contact@royalmirage.com
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
