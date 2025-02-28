"use client";

import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";

interface PopupusermanageProps {
  student: any;
  onClose: () => void;
}

interface StudentData {
  id_card?: string;
  first_name?: string;
  last_name?: string;
  nfc_id?: string;
  pin?: string;
  email?: string;
  line_id?: string;
  position?: string;
  teleiphone?: string;
  date_of_birth?: string;
  blood_group?: string;
  guardian_fname?: string;
  guardian_lname?: string;
  guardian_phone?: string;
  student_id?: string;
  photograph?: string;
}

export default function Index({ student, onClose }: PopupusermanageProps) {
  const [userData, setUserData] = useState<StudentData>();  // Use student as initial state
  const bloodGroupOptions = ["A", "B", "AB", "O"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setUserData({ ...userData, photograph: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    console.log("Data updated successfully:", userData);
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user_info/id_card/${userData?.id_card}`,
        userData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("บันทึกข้อมูลสำเร็จ! 🎉");
      onClose(); // Close the popup after saving
      setTimeout(() => {
        window.location.reload(); // รีโหลดหน้าเว็บ
      }, 500); // รอ 0.5 วินาทีเพื่อให้ popup ปิดก่อน
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล ❌");
      console.error("Error updating user data:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };
  

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  useEffect(() => {
    setUserData(student);
  }, [student]);  // Only update when student changes
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <Toaster position="bottom-left" />
      <div className="flex flex-col bg-white rounded pt-5 mx-3 mt-14 shadow-lg max-w-[1200px] w-full h-screen max-h-[75vh] overflow-y-auto">
        <div className="py-6 px-4 sm:px-[50px]">
          <div className="flex justify-between items-center border-b border-stroke mb-5 pb-5">
            <h3 className="text-center sm:text-left font-semibold text-black ">
              {student.first_name} {student.last_name}
            </h3>
            <button onClick={onClose}>
              <MdOutlineCancel size={28} color="gray" />
            </button>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  ไอดีการ์ด NFC
                </label>
                <input
                  name="nfc_id"
                  value={userData?.nfc_id || ""}
                  placeholder="ไม่มีข้อมูล"
                  onChange={handleInputChange}
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  PIN เข้าห้อง
                </label>
                <input
                  name="pin"
                  value={userData?.pin || ""}
                  placeholder="ไม่มีข้อมูล"
                  onChange={handleInputChange}
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  เลขบัตรประชาชน
                </label>
                <input
                  name="id_card"
                  value={userData?.id_card || ""}
                  placeholder="ไม่มีข้อมูล"
                  onChange={handleInputChange}
                  disabled
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  รหัสนักศึกษา
                </label>
                <input
                  name="student_id"
                  value={userData?.student_id || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">ชื่อ</label>
                <input
                  name="first_name"
                  value={userData?.first_name || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">นามสกุล</label>
                <input
                  name="last_name"
                  value={userData?.last_name || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  อีเมลสถาบัน
                </label>
                <input
                  name="email"
                  value={userData?.email || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  ไอดีไลน์
                </label>
                <input
                  name="line_id"
                  value={userData?.line_id || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  ตำแหน่ง
                </label>
                <input
                  name="position"
                  value={userData?.position || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  เบอร์โทร
                </label>
                <input
                  name="teleiphone "
                  value={userData?.teleiphone || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  Date of birth (วันเดือนปีที่เกิด)
                </label>
                <input
                  type="date"
                  name="date_of_birth"        
                  value={userData?.date_of_birth || ""}
                  onChange={handleInputChange}
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  Blood Type (กรุ๊ปเลือด)
                </label>
                <select
                  name="blood_group"
                  value={userData?.blood_group}
                  onChange={handleSelectChange}
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                >
                  <option value="" disabled>
                    Blood Type (กรุ๊ปเลือด)
                  </option>
                  {bloodGroupOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  ชื่อจริงผู้ปกครอง
                </label>
                <input
                  name="guardian_fname"
                  value={userData?.guardian_fname || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  นามสกุลผู้ปกครอง
                </label>
                <input
                  name="guardian_lname"
                  value={userData?.guardian_lname || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  เบอร์ติดต่อของผู้ปกครอง
                </label>
                <input
                  name="guardian_phone"
                  value={userData?.guardian_phone || ""}
                  onChange={handleInputChange}
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm text-black block mb-1">อัพโหลดรูป</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black"
            />
          </div>       

          <div className="flex justify-between gap-28 mt-6">
            <button
              onClick={onClose}
              className="w-full py-3  rounded-xl bg-gray-300 text-black hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-primary text-white hover:bg-secondary"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
