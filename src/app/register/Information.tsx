import ProfileInput from "@/components/Inputs";
import { ChangeEvent } from "react";

// Step2.tsx
interface Step2Props {
  formData: any;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Step2 = ({ formData, handleInputChange }: Step2Props) => {
  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    if (value.length <= 6) {
      handleInputChange(e);
    }
  };

  return (
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
          editable={true}
        />
        <ProfileInput
          title="Student ID (รหัสนักศึกษา)"
          values={formData.student_id}
          onChanges={handleInputChange}
          names="student_id"
          editable={true}
        />
        <ProfileInput
          title="Email (อีเมล)"
          values={formData.email}
          onChanges={handleInputChange}
          names="email"
          editable={true}
        />
        <ProfileInput
          title="First Name (ชื่อ)"
          values={formData.first_name}
          onChanges={handleInputChange}
          names="first_name"
          editable={true}
        />
        <ProfileInput
          title="Last Name (นามสกุล)"
          values={formData.last_name}
          onChanges={handleInputChange}
          names="last_name"
          editable={true}
        />
        <ProfileInput
          title="Nickname (ชื่อเล่น)"
          values={formData.nick_name}
          onChanges={handleInputChange}
          names="nick_name"
          editable={true}
        />
        <div>
          <label className="text-sm text-black block mb-1">
            Date of birth (วันเดือนปีที่เกิด)
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
          />
        </div>
        <ProfileInput
          title="ชื่อไลน์"
          values={formData.user_line_id}
          onChanges={handleInputChange}
          names="user_line_id"
          editable={true}
        />
        <ProfileInput
          title="LineID (ไอดีไลน์)"
          values={formData.line_id}
          onChanges={handleInputChange}
          names="line_id"
          editable={true}
        />
        <ProfileInput
          title="Phone Number (เบอร์โทร)"
          values={formData.teleiphone}
          onChanges={handleInputChange}
          names="teleiphone"
          editable={true}
        />
        <div>
          <label className="text-sm text-black block mb-1">
            Blood Type (กรุ๊ปเลือด)
          </label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleInputChange}
            className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
          >
            <option value="" disabled>
              Blood Type (กรุ๊ปเลือด)
            </option>
            {["A", "B", "AB", "O"].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-black block mb-1">
            PIN สำหรับ NFC
          </label>
          <input
            name={"pin"}
            value={formData.pin}
            onChange={handlePinChange}
            maxLength={6}
            placeholder="PIN"
            className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
