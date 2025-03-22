import React from "react";
import { CiStar } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Img from "/rain.png";
import { Common } from "../../services/commonservice";
import { IoIosArrowDropright } from "react-icons/io";
export default function Card(data: any) {
  const service = new Common();
  const arr = Array.from({ length: 8 }, (_, i) => {
    i + 1;
  });
  function Next_Photos(props: any) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className=" carus top-[50%] absolute  right-6">
        <IoIosArrowDropright className="w-[25px] shadow-lg cursor-pointer h-[25px] rounded-full bg-white text-slate-600" />
      </div>
    );
  }

  function Prev_Photos(props: any) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className=" carus top-[50%] absolute  right-6">
        <IoIosArrowDropright className="w-[25px] shadow-lg cursor-pointer h-[25px] rounded-full bg-white text-slate-600" />
      </div>
    );
  }

  const single_product = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Prev_Photos />,
    nextArrow: <Next_Photos />,
  };
  return (
    <div>
      <div className="product-img relative rounded-lg border border-transparent shadow-sm  hover:border-white hover:ring-2 hover:ring-white">
    
          <Slider {...single_product} className="relative">
            {arr.map((items) => {
              return (
                <div className="xl:h-[240px] overflow-hidden rounded-lg">
                  <LazyLoadImage
                    src={Img}
                    height="100%"
                    width="100%"
                    effect="blur"
                    className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
                  />
                </div>
              );
            })}
          </Slider>

        <div className="p-4 bg-white rounded-b-lg">
          <div className="flex justify-between items-start">
            <Link
              to="/"
              className="text-lg font-[500] transition-all duration-300 ease-in-out"
            >
              <span>
                {service.textreducing(
                  "helll wold new transformatoin going to impolement",
                  18
                )}
              </span>
            </Link>

            <span className="flex items-center text-gray-800">
              <CiStar className="text-yellow-700 text-[30px] text-bold px-1 drop-shadow-md" />
              <b className="text-lg font-extrabold">5.0</b>
            </span>
          </div>

          <div className="text-sm text-gray-700 mt-1 transition-opacity duration-300 hover:opacity-100">
            Hosted by <span className=" font-bold">Shihab</span>
          </div>

          <span className=" text-xs py-1 ">Oct 4 to Infinite</span>

          <div className="  pt-1 flex justify-between items-center">
            <span className="text-md text-indigo-900 font-bold">
              $343 per day
            </span>

            {/* ✅ Simple Button without too much styling */}
            <button className="px-2 py-2 text-sm cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
