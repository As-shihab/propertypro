import { CiStar } from "react-icons/ci";
import { FaWifi, FaSwimmingPool, FaCar, FaDumbbell, FaUtensils, FaSnowflake } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import ProfilePic from "../../assets/images/loign.jpg"; // Replace with actual profile image
import { httpClient } from "../../services/http";

export default function Card(items: any) {
  const http = new httpClient();
  const medias = items.medias || [];

  const sortImages = Object.values(medias)?.filter(
    (m: any) => m?.fileType?.startsWith("image/")
  );

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute z-10 top-1/2 right-3 transform -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer hover:bg-indigo-500 hover:text-white transition"
      >
        <IoIosArrowDropright size={22} />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute z-10 top-1/2 left-3 transform -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer hover:bg-indigo-500 hover:text-white transition"
      >
        <IoIosArrowDropleft size={22} />
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Amenity List
  const amenities = [
    { icon: <FaWifi className="text-indigo-600" />, label: "WiFi" },
    { icon: <FaSwimmingPool className="text-indigo-600" />, label: "Pool" },
    { icon: <FaSnowflake className="text-indigo-600" />, label: "AC" },
    { icon: <FaCar className="text-indigo-600" />, label: "Parking" },
    { icon: <FaDumbbell className="text-indigo-600" />, label: "Gym" },
    { icon: <FaUtensils className="text-indigo-600" />, label: "Breakfast" },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
        {/* Image Section */}
        <div className="relative h-[250px] w-full">
          <Slider {...sliderSettings}>
            {sortImages.map((img: any, idx: number) => (
              <div
                key={idx}
                className="relative w-full h-[250px] overflow-hidden"
              >
                <LazyLoadImage
                  src={http.image + img.fileName}
                  effect="blur"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </Slider>

          {/* Book Now Button */}
          <button
            className="absolute bottom-4 left-4 px-5 py-2 rounded-full text-sm font-semibold text-white 
              bg-indigo-600/90 backdrop-blur-3xl shadow-lg 
              transition-all duration-300
              hover:bg-indigo-600"
          >
            Book Now
          </button>

          {/* User Profile Pic */}
          <img
            src={ProfilePic}
            alt="Host"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full border-4 border-white shadow-md transition-transform transform group-hover:scale-110 group-hover:border-indigo-500"
          />
        </div>

        {/* Content */}
        <div className="p-4 bg-white space-y-3">
          <div className="flex justify-between items-start">
            <Link
              to="/"
              className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition"
            >
              Beautiful Beachside Stay
            </Link>
            <span className="flex items-center gap-1 text-sm text-gray-700">
              <CiStar className="text-yellow-500 text-lg" />
              4.9
            </span>
          </div>

          <div className="text-sm text-gray-600">
            📍 Cox’s Bazar, Bangladesh
          </div>
          <div className="text-sm text-gray-500">Hosted by <span className="font-semibold">Shihab</span></div>
          <div className="text-sm text-gray-500">Oct 4 - Oct 10</div>

          {/* Amenities with Icons */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs text-gray-600">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full border border-gray-200"
              >
                {amenity.icon} {amenity.label}
              </span>
            ))}
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200 cursor-pointer">
              +{amenities.length - 4} More
            </span>
          </div>

          {/* Price + Book */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold text-indigo-800">
              $343 <span className="text-sm text-gray-600">/ night</span>
            </span>
            <Link to="/product-overview">
              <button className="text-sm bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Reserve
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
