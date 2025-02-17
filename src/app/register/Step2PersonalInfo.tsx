import React from "react";

interface Step2Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2PersonalInfo: React.FC<Step2Props> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ข้อมูลส่วนตัว</h2>
      <input type="text" name="citizenId" placeholder="เลขบัตรประชาชน" value={formData.citizenId} onChange={handleChange} className="input-field" />
      <input type="text" name="studentId" placeholder="รหัสนักศึกษา" value={formData.studentId} onChange={handleChange} className="input-field" />
      <input type="text" name="firstName" placeholder="ชื่อจริง" value={formData.firstName} onChange={handleChange} className="input-field" />
      <input type="text" name="lastName" placeholder="นามสกุล" value={formData.lastName} onChange={handleChange} className="input-field" />
      <input type="text" name="nickname" placeholder="ชื่อเล่น" value={formData.nickname} onChange={handleChange} className="input-field" />
      <input type="email" name="email" placeholder="อีเมลสถาบัน" value={formData.email} onChange={handleChange} className="input-field" />
      <input type="text" name="phone" placeholder="เบอร์โทร" value={formData.phone} onChange={handleChange} className="input-field" />

      <div className="flex justify-between mt-4">
        <button className="btn-secondary" onClick={prevStep}>ย้อนกลับ</button>
        <button className="btn-primary" onClick={nextStep}>ถัดไป</button>
      </div>
    </div>
  );
};

export default Step2PersonalInfo;
