import React from "react";
import { CiStar } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Img from "/rain.png";
export default function Card(data: any) {
  const { itemperpage } = data;
  function Next_Photos(props: any) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className=" carus top-[50%] absolute  right-6">
        <i className="fa  right-5   hover:text-white   p-2 rounded-full hover:bg-slate-700 bg-slate-100 cursor-grab fa-arrow-right"></i>
      </div>
    );
  }

  const single_product = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <Next_Photos />,
  };
  return (
    <div className={`grid grid-cols-${itemperpage}`}>
      <div className="product-img relative rounded-lg   border border-slate-100  shadow-sm">
        <Slider {...single_product} className="relative    ">
          {
            <div className="xl:h-[240px] overflow-hidden">
              <LazyLoadImage
              
                src={Img}
                height="100%"
                width="100%"
                effect="blur"
                className=" w-full bg-cover size-fit h-full  rounded-lg"
              />
            </div>
          }
        </Slider>

        <div className="single-slider-info p-4">
          <div className="flex justify-between px-2  fw-bold">
            <Link to="/">
              {" "}
              <b className="fw-bold hover:text-sky-500 cursor-pointer">
                datas
                <b> data</b>
              </b>
            </Link>

            <span className="flex items-center ">
              <CiStar className="fw-bold text-black text-[23px] px-1" />
              5.0
            </span>
          </div>
          <div className="text-sm px-2 text-slate-500">Hosted by shihab</div>
          <div className="text-md px-2 flex text-slate-500">
            <span>Oct 4 to infinite</span>
          </div>

          <div className="text-lg px-2 fw-bold items-center justify-between  flex text-slate-700">
            <span>$343 per day</span>
            <Link to="booking-view">
              {" "}
              <button className="text-sm border rounded-lg py-1 px-2 fw-300 hover:bg-sky-100  text-sky-400 ">
                {" "}
                To Enroll
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
