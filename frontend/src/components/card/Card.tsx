
import { CiStar } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Img from '../../assets/images/loign.jpg';
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import ProfilePic from '../../assets/images/loign.jpg'; // Replace with actual image
import { useContext } from "react";
import { GlobalContext } from "../../guard/GlobalContext";

export default function Card() {
  const images = Array.from({ length: 4 }, () => Img);
 const {loading} = useContext(GlobalContext);
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute z-10 top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition"
      >
        <IoIosArrowDropright size={24} className="text-gray-800" />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute z-10 top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition"
      >
        <IoIosArrowDropleft size={24} className="text-gray-800" />
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

  return (
    <div className="w-full sm:w-[90%] md:w-[350px] mx-auto">
      <div className="relative group overflow-hidden rounded-xl shadow-xl transition-all hover:shadow-2xl duration-300 border border-gray-300">
        {/* Image Slider */}
        <div className="relative h-[250px] w-full">
          <Slider {...sliderSettings}>
            {images.map((src, idx) => (
              <div key={idx}>
                <LazyLoadImage
                  src={src}
                  effect="blur"
                  className="w-full h-[250px] animate-pulse object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </Slider>

          {/* Hover Book Tag */}
          <div className="">
           <button onClick={()=>{alert()}} className="absolute bottom-3 left-3 bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"> Book Now</button>
          </div>

          {/* User profile pic with hover effect */}
          <img
            src={ProfilePic}
            alt="Host"
            className="absolute bottom-3 right-3 w-12 h-12 rounded-full border-4 border-white shadow-md transition-transform transform group-hover:scale-110 group-hover:border-indigo-500"
          />
        </div>

        {/* Content */}
        <div className="p-4 bg-white space-y-4">
          <div className="flex justify-between items-start">
            <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition">
              Beautiful Beachside Stay
            </Link>
            <span className="flex items-center gap-1 text-sm text-gray-700">
              <CiStar className="text-yellow-500 text-xl" />
              4.9
            </span>
          </div>

          <div className="text-sm text-gray-600">Hosted by <span className="font-semibold">Shihab</span></div>
          <div className="text-sm text-gray-500">Oct 4 - Oct 10</div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold text-indigo-800">
              $343 <span className="text-sm text-gray-600">/ night</span>
            </span>
           
           <Link to="/product-overview">
            <button className="text-sm bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Book Now
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
