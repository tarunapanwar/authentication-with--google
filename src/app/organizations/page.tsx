"use client"
import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "../Components";

const AddOrganization = () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const steps = [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
    { id: 5, label: '5' },
    { id: 6, label: '6' }
  ];

  const getProgressBarWidth = () => {
    switch (currentStep) {
      case 1:
        return 'w-0';
      case 2:
        return 'w-1/5';
      case 3:
        return 'w-2/5';
      case 4:
        return 'w-3/5';
      case 5:
        return 'w-4/5';
      case 6:
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div>
        <div className="relative w-35 h-1 bg-gray-300 rounded-full">
            <div
            className={`absolute h-full bg-darkestGreen rounded-full transition-width duration-500 ease-in-out ${getProgressBarWidth()}`}
            ></div>
        </div>
        <div className="absolute top-0 w-35 flex justify-between mt-5">
            {steps.map((step) => (
            <div
                key={step.id}
                className={`flex items-center justify-center w-10 h-10 border rounded-full transition-colors duration-500 ease-in-out 
                ${currentStep >= step.id ? 'bg-darkestGreen text-white' : 'bg-gray-50 text-gray-500'}`}
            >
                {step.label}
            </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-between w-35 m-auto p-10 mt-20 shadow-xl rounded-xl">
        {currentStep === 1 ? <Step1 /> : currentStep === 2 ? <Step2 /> : currentStep === 3 ? <Step3 /> : currentStep === 4 ? <Step4 /> : currentStep === 5 ? <Step5 /> : <Step6 />}
       <div className="w-full mt-10 pt-2">
            <div className="float-right">
                <button className="border bg-gray-100 py-1 px-5 rounded mr-2" onClick={() => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev))}>Back</button>
                <button className="border bg-darkestGreen text-white py-1 px-5 rounded" onClick={() => setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev))}>Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrganization;
