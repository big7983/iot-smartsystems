"use client";

import { useState } from "react";
import Step1Login from "./Step1Login";
import Step2PersonalInfo from "./Step2PersonalInfo";
import Step3Preview from "./Step3Preview";

export default function SteperForm() {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]); // เก็บขั้นตอนที่เคยผ่านแล้ว
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
    guardian_phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // เช็กว่าข้อมูลของแต่ละ Step ครบถ้วนหรือไม่
  const isStepValid = (step: number) => {
    if (step === 1) return formData.username && formData.password ;
    if (step === 2) return formData.id_card && formData.student_id && formData.first_name && formData.last_name;
    return true;
  };

  // ไปยังขั้นตอนถัดไปเมื่อข้อมูลครบถ้วน
  const nextStep = () => {
    if (isStepValid(step)) {
      setStep((prev) => {
        const next = prev + 1;
        if (!completedSteps.includes(next)) {
          setCompletedSteps([...completedSteps, next]); // บันทึกว่าเคยเข้าถึง Step นี้แล้ว
        }
        return next;
      });
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ไปยังขั้นตอนที่เคยกรอกแล้วเท่านั้น
  const goToStep = (targetStep: number) => {
    if (completedSteps.includes(targetStep)) {
      setStep(targetStep);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        {["ล็อกอิน", "ข้อมูลส่วนตัว", "พรีวิว"].map((label, index) => {
          const stepIndex = index + 1;
          return (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${
                step === stepIndex ? "bg-blue-500 text-white" : completedSteps.includes(stepIndex) ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => goToStep(stepIndex)}
              disabled={!completedSteps.includes(stepIndex)} // ป้องกันการข้าม Step
            >
              {label}
            </button>
          );
        })}
      </div>

      {step === 1 && <Step1Login formData={formData} handleChange={handleChange} nextStep={nextStep} />}
      {step === 2 && <Step2PersonalInfo formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3Preview formData={formData} prevStep={prevStep} />}
    </div>
  );
}
