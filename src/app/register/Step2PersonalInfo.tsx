import ProfileInput from "@/components/Inputs";
import Selects from "@/components/Selects";
import { ChangeEvent } from "react";

// Step2.tsx
interface Step2Props {
  formData: any;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Step2 = ({ formData, handleInputChange }: Step2Props) => {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="bg-white rounded-2xl shadow-xl p-5">
        <h4 className="mb-2 text-lg font-semibold text-primary text-left">
          ข้อมูลส่วนบุคคล
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          <ProfileInput
            title="ID Card (รหัสบัตรประชาชน)"
            values={formData.id_card}
            onChanges={handleInputChange}
            names="id_card"
          />
          <ProfileInput
            title="Student ID (รหัสนักศึกษา)"
            values={formData.student_id}
            onChanges={handleInputChange}
            names="student_id"
          />
          <ProfileInput
            title="First Name (ชื่อ)"
            values={formData.first_name}
            onChanges={handleInputChange}
            names="first_name"
          />
          <ProfileInput
            title="Last Name (นามสกุล)"
            values={formData.last_name}
            onChanges={handleInputChange}
            names="last_name"
          />
          <ProfileInput
            title="Nickname (ชื่อเล่น)"
            values={formData.nick_name}
            onChanges={handleInputChange}
            names="nick_name"
          />
          <ProfileInput
            title="Date of birth (วันเดือนปีที่เกิด)"
            values={formData.date_of_birth}
            onChanges={handleInputChange}
            names="date_of_birth"
          />
          <ProfileInput
            title="LineID (ไอดีไลน์)"
            values={formData.line_id}
            onChanges={handleInputChange}
            names="line_id"
          />
          <ProfileInput
            title="Phone Number (เบอร์โทร)"
            values={formData.phone}
            onChanges={handleInputChange}
            names="phone"
          />
          <Selects
            values={formData.blood_group}
            onChanges={handleInputChange}
            names="blood_group"
            title="Blood Type (กรุ๊ปเลือด)"
            options={["A", "B", "AB", "O"]}
          />
        </div>
      </div>

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
          />
          <ProfileInput
            title="Guardian Last Name (นามสกุลผู้ปกครอง)"
            values={formData.guardian_lname}
            onChanges={handleInputChange}
            names="guardian_lname"
          />
          <ProfileInput
            title="Guardian Phone (เบอร์โทรผู้ปกครอง)"
            values={formData.guardian_phone}
            onChanges={handleInputChange}
            names="guardian_phone"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
