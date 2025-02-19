import ProfileInput from "@/components/Inputs";
import { ChangeEvent } from "react";

// Step2.tsx
interface Step2Props {
  formData: any;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Parent = ({ formData, handleInputChange }: Step2Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">
      <h4 className="mb-2 text-lg font-semibold text-primary text-left">
        ข้อมูลส่วนผู้ปกครอง
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <ProfileInput
          title="Guardian First Name (ชื่อผู้ปกครอง)"
          values={formData.guardian_fname}
          onChanges={handleInputChange}
          names="guardian_fname"
          editable={true}
        />
        <ProfileInput
          title="Guardian Last Name (นามสกุลผู้ปกครอง)"
          values={formData.guardian_lname}
          onChanges={handleInputChange}
          names="guardian_lname"
          editable={true}
        />
        <ProfileInput
          title="Guardian Phone (เบอร์โทรผู้ปกครอง)"
          values={formData.guardian_phone}
          onChanges={handleInputChange}
          names="guardian_phone"
          editable={true}
        />
      </div>
    </div>
  );
};

export default Parent;
