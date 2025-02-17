import React from "react";

interface Step3Props {
  formData: any;
  prevStep: () => void;
}

const Step3Preview: React.FC<Step3Props> = ({ formData, prevStep }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">พรีวิวข้อมูล</h2>
      <pre className="p-4 bg-gray-100 rounded">{JSON.stringify(formData, null, 2)}</pre>

      <div className="flex justify-between mt-4">
        <button className="btn-secondary" onClick={prevStep}>ย้อนกลับ</button>
        <button className="btn-success">ยืนยัน</button>
      </div>
    </div>
  );
};

export default Step3Preview;
