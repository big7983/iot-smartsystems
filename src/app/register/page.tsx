"use client";

import axios from "axios";
import Information from "./Information";
import Parent from "./Parent";
import UploadPhoto from "./Step3Preview";
import Username from "./Username";
import { GoArrowLeft } from "react-icons/go";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    id_card: "",
    student_id: "",
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    password: "1",
    token_id: "1",
    line_id: "",
    user_line_id: "",
    position: "Student",
    teleiphone: "",
    date_of_birth: "",
    blood_group: "",
    guardian_fname: "",
    guardian_lname: "",
    guardian_phone: "",
    nfc_id: "null",
    pin: "",
    photograph: "/avatar-user.jpg"
  });

  const [loading, setLoading] = useState(false); // เพิ่ม state สำหรับโหลดข้อมูล
  const [tokenuser, setTokenuser] = useState(null); // New state to track if the username is confirmed
  

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "id_card",
      "student_id",
      "first_name",
      "last_name",
      "nick_name",
      "email",
      "password",
      "token_id",
      "position",
      "teleiphone",
      "date_of_birth",
      "blood_group",
      "guardian_fname",
      "guardian_lname",
      "guardian_phone",
      "pin",
      "photograph"
    ];
  
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]?.trim()) {
        toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return false;
      }
    }
    return true;
  };
  

  const handleSaveData = async () => {
    setLoading(true); // เริ่มโหลด
    if (!validateForm()) return; // ถ้ายังกรอกไม่ครบ ให้หยุดทำงาน

    console.log("token : 111" , tokenuser)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user_info`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenuser}`,
          },
        }
      );

      if (response.status == 200) {
        toast.success("บันทึกข้อมูลสำเร็จ!");
      }
      console.log("fd", formData);
      router.back()

    } catch (error: any) {
      if (error.response?.status === 413) {
        toast.error("ไฟล์รูปมีขนาดเกิน 100KB");
      } else {
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
      console.log(error);
      console.log("fd", formData);
    } finally {
      setLoading(false); // หยุดโหลด
    }
  };

  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 my-5 xl:p-0 p-5">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex flex-row items-center gap-5">
        <div
          className="bg-primary hover:bg-secondary p-3 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          <GoArrowLeft className="text-white text-2xl" />
        </div>

        <h3 className="text-primary text-3xl font-extrabold my-5 ">
          สมัครสมาชิก / เพิ่มผู้ใช้ใหม่
        </h3>
      </div>

      <Username setTokenuser={setTokenuser} />
      {tokenuser && (
        <>
          <Information
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <Parent formData={formData} handleInputChange={handleInputChange} />
          <UploadPhoto formData={formData} />

          <div className="flex justify-between gap-28 mt-6">
            <button
              onClick={() => router.back()}
              className="w-full py-3  rounded-xl bg-gray-300 text-black hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={handleSaveData}
              className="w-full py-3  rounded-xl bg-primary text-white hover:bg-secondary"
            >
              {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
