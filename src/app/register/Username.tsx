import React, { useState } from "react";
import ProfileInput from "@/components/Inputs";
// import axios from "axios";

export default function Username() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleCheck = async () => {
  //   const { username, password, confirmPassword } = formData;

  //   if (!username || !password || !confirmPassword) {
  //     alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
  //       {
  //         username,
  //         password,
  //       }
  //     );

  //     console.log(response);

  //     alert("ผ่าน");
  //   } catch (error: any) {
  //     alert(
  //       `เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`
  //     );
  //   }
  // };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">
      <h4 className="text-lg font-semibold text-primary text-left">
        ข้อมูลบัญชีผู้ใช้
      </h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 items-center">
        <ProfileInput
          title="Username"
          values={formData.username}
          onChanges={handleInputChange}
          names="username"
          editable={true}
        />
        <ProfileInput
          title="Password"
          values={formData.password}
          onChanges={handleInputChange}
          names="password"
          editable={true}
        />
        <ProfileInput
          title="Confirm Password"
          values={formData.confirmPassword}
          onChanges={handleInputChange}
          names="confirmPassword"
          editable={true}
        />
      </div>
      <div className="flex justify-between gap-28 mt-7">
        <button className="w-full py-3  rounded-xl bg-gray-300 text-primary hover:bg-gray-400">
          ย้อนกลับ
        </button>
        <button
          className="w-full py-3  rounded-xl bg-primary text-white hover:bg-secondary"
        >
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
}
