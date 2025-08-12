
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Img from '../../assets/images/loign.jpg';  // Replace with actual images

const GalleryPage = () => {
  const images = Array.from({ length: 4 }, () => Img); // Example array, replace with actual images
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {/* First row of images (2 images) */}
          <div className="relative">
            <LazyLoadImage
              src={images[0]}
              effect="blur"
              className="w-full h-[250px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="relative col-span-2">
            <LazyLoadImage
              src={images[1]}
              effect="blur"
              className="w-full h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Second row of images (2 images) */}
          <div className="relative">
            <LazyLoadImage
              src={images[2]}
              effect="blur"
              className="w-full h-[250px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="relative">
            <LazyLoadImage
              src={images[3]}
              effect="blur"
              className="w-full h-[250px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
