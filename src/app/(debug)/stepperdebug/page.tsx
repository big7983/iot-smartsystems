"use client";
import { useState } from "react";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

export default function StepperComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Stepper ด้านซ้ายบน Desktop และด้านบนใน Mobile */}
      <div className="lg:w-1/4 w-full bg-gray-200 p-4">
        <ol className="relative text-gray-500 border-s border-gray-200 ">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`mb-10 ms-6 ${
                index > currentStep ? " bg-gray-300 " : "bg-blue-500text-white"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white ">
                <svg
                  className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
              <h3 className="font-medium leading-tight">{step}</h3>
              <p className="text-sm">Step details here</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ส่วนเนื้อหาที่เปลี่ยนไปตาม Step */}
      <div className="md:w-3/4 w-full p-6">
        <h1 className="text-xl font-bold">Step {currentStep + 1} Content</h1>
        <p className="mt-2">รายละเอียดของ {steps[currentStep]}</p>

        <div className="mt-4 flex gap-2">
          {currentStep > 0 && (
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              ย้อนกลับ
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              ถัดไป
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
