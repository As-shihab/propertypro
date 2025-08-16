import { useState } from "react";
import Welcome from "./slideList/welcome";
import LocationFeature from "./slideList/LocationFeature";
import MediaPricing from "./slideList/MediaPricing";
import ReviewSubmit from "./slideList/ReviewSubmit";

function ListingContainer() {
  const [currentStep, setCurrentStep] = useState(2);
  const [hotelData, setHotelData] = useState<Record<string, any>>({});

  const totalSteps = 5; // Welcome + 4 steps

  const handleWelcomeComplete = () => {
    setCurrentStep(2);
  };

  const handleStep1Complete = (data: any) => {
    setHotelData(prev => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep2Complete = (data: any) => {
    setHotelData(prev => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handleStep3Complete = (data: any) => {
    setHotelData(prev => ({ ...prev, ...data }));
    setCurrentStep(5);
  };

  const handleSubmit = () => {
    console.log("Final submission:", hotelData);
    alert("Hotel submitted successfully!");
  };

  const goBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className=" h-[calc(100vh-79px)]   flex flex-col items-center justify-between p-4">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center w-full">
        hello
        {/* {currentStep === 1 && <Welcome onNext={handleWelcomeComplete} />}
        {currentStep === 2 && (
          <Welcome onNext={handleStep1Complete} initialData={hotelData} />
        )}
        {currentStep === 3 && (
          <LocationFeature
            onNext={handleStep2Complete}
            onBack={goBack}
            initialData={hotelData}
          />
        )}
        {currentStep === 4 && (
          <MediaPricing
            onNext={handleStep3Complete}
            onBack={goBack}
            initialData={hotelData}
          />
        )}
        {currentStep === 5 && (
          <ReviewSubmit
            data={hotelData}
            onSubmit={handleSubmit}
            onBack={goBack}
          />
        )} */}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mt-6">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          {["Welcome", "Basic Info", "Location", "Media", "Review"].map(
            (label, index) => (
              <span
                key={index}
                className={`${
                  currentStep >= index + 1 ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {label}
              </span>
            )
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-2 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ListingContainer;
