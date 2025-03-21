import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

interface ArrowProps {
  onClick: () => void; // Type for the onClick prop, which is a function
}

// Custom left arrow
const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow text-xl" onClick={onClick}>
    <FaArrowCircleLeft />
  </div>
);

// Custom right arrow
const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow text-xl " onClick={onClick}>
    <FaArrowCircleRight />
  </div>
);

const GlobalFilter: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow onClick={() => {}} />, // Use your custom prev arrow
    nextArrow: <CustomNextArrow onClick={() => {}} />, // Use your custom next arrow
  };

  return (
    <div className="shadow-sm ">
      <div className="grid grid-cols-4 w-[98%] items-center m-auto py-5">
        <div className="col-span-3 px-4 ">
          <div className="carousel-container px-9">
            <Slider {...settings}>
              <div>
                <img src="car1.jpg" alt="Car 1" />
              </div>
              <div>
                <img src="car2.jpg" alt="Car 2" />
              </div>
              <div>
                <img src="car3.jpg" alt="Car 3" />
              </div>
              {/* Add more images as needed */}
            </Slider>
          </div>
        </div>
        <div className="w-full flex   items-center">
          <div className="border gap-2 cursor-pointer border-slate-300 px-4 py-2 rounded-lg flex items-center">
            <IoFilterSharp/><b>Filter</b>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GlobalFilter;
