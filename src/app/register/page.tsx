"use client";

import { ChangeEvent, useState } from "react";
import Step1 from "./Step1Login";
import Step2 from "./Step2PersonalInfo";
import Step3 from "./Step3Preview";

const StepperForm = () => {
  const Subjectsteps = [
    {
      id: "Step 1",
      name: "Username Password",
    },
    {
      id: "Step 2",
      name: "ข้อมูลส่วนตัว",
    },
    { id: "Step 3", name: "ตรวจสอบ" },
  ];

  const totalSteps = 4;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    id_card: "",
    student_id: "",
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    phone: "",
    line_id: "",
    position: "",
    teleiphone: "",
    date_of_birth: "",
    blood_group: "",
    guardian_fname: "",
    guardian_lname: "",
    guardian_phone: "",
  });

  // ฟังก์ชันตรวจสอบข้อมูลที่กรอกในแต่ละ Step
  const isStepValid = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        // ตรวจสอบว่า Step 1 (Username, Password) กรอกข้อมูลครบหรือไม่
        return (
          formData.username !== "" &&
          formData.password !== "" &&
          formData.confirmPassword !== ""
        );
      case 2:
        // ตรวจสอบว่า Step 2 (ข้อมูลส่วนตัว) กรอกข้อมูลครบหรือไม่
        return (
          formData.id_card !== "" &&
          formData.student_id !== "" &&
          formData.first_name !== "" &&
          formData.last_name !== "" &&
          formData.nick_name !== "" &&
          formData.email !== "" &&
          formData.phone !== "" &&
          formData.line_id !== "" &&
          formData.position !== "" &&
          formData.teleiphone !== "" &&
          formData.date_of_birth !== "" &&
          formData.blood_group !== "" &&
          formData.guardian_fname !== "" &&
          formData.guardian_lname !== "" &&
          formData.guardian_phone !== ""
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStepChange = (newStep: number) => {
    // ตรวจสอบว่า newStep อยู่ในช่วงที่ถูกต้องหรือไม่
    if (newStep >= 1 && newStep <= totalSteps) {
      // ตรวจสอบว่าเป็นการเปลี่ยนไปยังขั้นตอนถัดไปและ formData password กับ confirmPassword ไม่ตรงกัน
      if (newStep > step) {
        if (formData.password !== formData.confirmPassword) {
          alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบข้อมูล");
          return; // หยุดการเปลี่ยนขั้นตอน
        }
  
        if (!isStepValid(step)) {
          // หากขั้นตอนปัจจุบันยังไม่ครบ จะไม่ให้ไปขั้นตอนถัดไป
          alert("กรุณากรอกข้อมูลให้ครบก่อนที่จะไปยังขั้นตอนถัดไป");
          return; // หยุดการเปลี่ยนขั้นตอน
        }
      }
  
      // เมื่อถึง Step 3 ให้แสดง alert และไม่เปลี่ยนไปยังขั้นตอนถัดไป
      if (newStep === totalSteps) {
        alert("สำเร็จ");
        return; // หยุดการเปลี่ยนขั้นตอน
      }
  
      setStep(newStep); // เปลี่ยนไปขั้นตอนใหม่
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* Stepper Navigation */}

      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 lg:flex lg:space-x-8 lg:space-y-0">
          {Subjectsteps.map((Subjectsteps, index) => (
            <li
              key={Subjectsteps.name}
              className="lg:flex-1 border-stroke bg-slate-400 shadow-default dark:border-strokedark dark:bg-boxdark px-10 py-5 rounded-[20px] cursor-pointer"
              onClick={() => handleStepChange(index+1)}
              >
              {step > index+1 ? (
                <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors lg:border-l-0 lg:border-t-4 lg:pb-0 lg:pl-0 lg:pt-4">
                  <span className="text-sm font-medium text-primary transition-colors ">
                    {Subjectsteps.id}
                  </span>
                  <span className="text-sm font-medium">{Subjectsteps.name}</span>
                </div>
              ) : step === index+1 ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 lg:border-l-0 lg:border-t-4 lg:pb-0 lg:pl-0 lg:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary">
                    {Subjectsteps.id}
                  </span>
                  <span className="text-sm font-medium">{Subjectsteps.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors lg:border-l-0 lg:border-t-4 lg:pb-0 lg:pl-0 lg:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {Subjectsteps.id}
                  </span>
                  <span className="text-sm font-medium">{Subjectsteps.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step 1: Username, Password */}
      {step === 1 && (
        <Step1 formData={formData} handleInputChange={handleInputChange} />
      )}

      {/* Step 2: Personal Information */}
      {step === 2 && (
        <Step2 formData={formData} handleInputChange={handleInputChange} />
      )}

      {/* Step 3: Preview Data */}
      {step === 3 && <Step3 formData={formData} />}

      {/* Step control buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleStepChange(step - 1)}
          disabled={step === 1}
          className="py-2 px-4 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={() => handleStepChange(step + 1)}
          // disabled={!isStepValid(step)}
          className="py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepperForm;
