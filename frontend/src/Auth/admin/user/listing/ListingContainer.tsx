import { useState } from "react";
import Welcome from "./slideList/welcome";
import LocationFeature from "./slideList/LocationFeature";
import MediaPricing from "./slideList/MediaPricing";
import ReviewSubmit from "./slideList/ReviewSubmit";

function ListingContainer() {
  const [currentStep, setCurrentStep] = useState(2);
  const [hotelData, setHotelData] = useState<Record<string, any>>({});

  const handleWelcomeComplete = () => {
    setCurrentStep(2); // Proceed to basic info (Step 1 of form)
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
    // Here you would typically send data to your backend
    alert("Hotel submitted successfully!");
  };

  const goBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Welcome Screen */}
      {currentStep === 1 && <Welcome onNext={handleWelcomeComplete} />}

      {/* Step 1: Basic Information */}
      {currentStep === 2 && (
        <Welcome
          onNext={handleStep1Complete}
          initialData={hotelData}
        />
      )}

      {/* Step 2: Location & Features */}
      {currentStep === 3 && (
        <LocationFeature
          onNext={handleStep2Complete}
          onBack={goBack}
          initialData={hotelData}
        />
      )}

      {/* Step 3: Media & Pricing */}
      {currentStep === 4 && (
        <MediaPricing
          onNext={handleStep3Complete}
          onBack={goBack}
          initialData={hotelData}
        />
      )}

      {/* Step 4: Review & Submit */}
      {currentStep === 5 && (
        <ReviewSubmit
          data={hotelData}
          onSubmit={handleSubmit}
          onBack={goBack}
        />
      )}
    </div>
  );
}

export default ListingContainer;