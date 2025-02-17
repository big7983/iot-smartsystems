import React from "react";

interface Step1Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const Step1Login: React.FC<Step1Props> = ({ formData, handleChange, nextStep }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ล็อกอิน</h2>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input-field" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-field" />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="input-field" />
      <button className="btn-primary mt-4" onClick={nextStep}>ถัดไป</button>
    </div>
  );
};

export default Step1Login;
