"use client";

import ProfileInput from "@/components/Inputs";
import Loader from "@/components/LoaderPage";
// import Selects from "@/components/Selects";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface UserData {
  id_card: string;
  student_id: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  password: string;
  token_id: string;
  line_id: string;
  user_line_id: string;
  position: string;
  teleiphone: string;
  date_of_birth: string;
  blood_group: string;
  guardian_fname: string;
  guardian_lname: string;
  guardian_phone: string;
  nfc_id: string;
  pin: string;
  photograph: string;
}

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const bloodGroupOptions = ["A", "B", "AB", "O"];

  const [originalData, setOriginalData] = useState<UserData | null>(null);
  const [userData, setUserData] = useState<UserData>({
    id_card: "",
    student_id: "",
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    password: "",
    token_id: "",
    line_id: "",
    user_line_id: "",
    position: "",
    teleiphone: "",
    date_of_birth: "",
    blood_group: "",
    guardian_fname: "",
    guardian_lname: "",
    guardian_phone: "",
    nfc_id: "",
    pin: "",
    photograph: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (hasFetched) return; // ถ้าเคยดึงข้อมูลแล้ว ให้ return ออกไปเลย
      
      setHasFetched(true); // ตั้งค่าว่าโหลดข้อมูลไปแล้ว
      
      const token = sessionStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user_info/profile`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setOriginalData(response.data); // บันทึกค่าเดิมไว้ใช้ตอน cancel
        //console.log("User data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล ❌");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [hasFetched]); // ใช้ state แทน useRef เพื่อความเสถียร
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Data updated successfully:", userData);
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user_info/id_card/${userData.id_card}`,
        userData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("บันทึกข้อมูลสำเร็จ! 🎉");
      setIsEditing(false);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล ❌");
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setUserData({ ...originalData }); // รีเซ็ตค่า โดยการใช้ spread operator
    }
    setIsEditing(false); // ปิดโหมดแก้ไข
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // เก็บค่า Base64 ลงใน photograph
        setUserData((prevData) => ({
          ...prevData,
          photograph: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return <p className="text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>;
  }

  return (
    <div className="flex justify-center w-full ">
      <Toaster position="bottom-left" />
      <div className="w-full max-w-[1200px] flex flex-col  justify-center gap-5">
        <div className="bg-white rounded-xl shadow-xl p-5">
          <div className="flex flex-col items-center w-full gap-6 md:flex-row">
            <div className="flex items-center justify-center w-20 h-20 border-gray-200  rounded-full">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <Image
                  width={80}
                  height={80}
                  src={userData.photograph?.startsWith("data:image") ? userData.photograph : "/avatar-user.jpg"}
                  alt="user"
                  className="rounded-full"
               />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatar-upload"
                disabled={!isEditing}
              />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-center text-primary md:text-left">
                {userData.first_name} {userData.last_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center md:flex-row md:gap-3 md:text-left">
                <p className="text-sm text-gray-500 ">{userData.position}</p>
                <div className="hidden h-3.5 w-px bg-gray-300  md:block"></div>
                <p className="text-sm text-gray-500 ">{userData.email}</p>
              </div>
            </div>
            {isEditing ? (
              <div className="flex flex-col gap-5 md:flex-row md:max-w-[250px] w-full ml-auto">
                <button
                  onClick={handleCancel}
                  className=" w-full bg-warning hover:bg-slate-300 text-white border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 "
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className=" w-full bg-green-700 hover:bg-slate-300 text-black  border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 "
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto w-full md:max-w-[150px] bg-warning text-white hover:bg-slate-200 border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 "
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h4 className="mb-2 text-lg font-semibold text-primary text-left">
            ข้อมูลส่วนบุคคล
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            <ProfileInput
              names={"id_card"}
              title="ID Card (รหัสบัตรประชาชน)"
              values={userData.id_card}
              onChanges={handleChange}
            />
            <ProfileInput
              names={"email"}
              title="Email (อีเมล)"
              values={userData.email || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
            <ProfileInput
              names={"student_id"}
              title="Student ID (รหัสนักศึกษา)"
              values={userData.student_id || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
            <ProfileInput
              names={"first_name"}
              title="First Name (ชื่อ)"
              values={userData.first_name || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
            <ProfileInput
              names={"last_name"}
              title="Last Name (นามสกุล)"
              values={userData.last_name || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
            <ProfileInput
              names={"nick_name"}
              title="Nickname (ชื่อเล่น)"
              values={userData.nick_name || ""}
              onChanges={handleChange}
              editable={isEditing}
            />

            {/* <ProfileInput
              names={"date_of_birth"}
              title="Date of birth (วันเดือนปีที่เกิด)"
              values={userData.date_of_birth || ""}
              onChanges={handleChange}
              editable={isEditing}
            /> */}

            <div>
              <label className="text-sm text-black block mb-1">
                Date of birth (วันเดือนปีที่เกิด)
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={userData.date_of_birth}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-black block mb-1">
                Blood Type (กรุ๊ปเลือด)
              </label>
              <select
                name="blood_group"
                value={userData.blood_group}
                onChange={handleChange}
                disabled={!isEditing}
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

            <ProfileInput
              names={"line_id"}
              title="LineID (ไอดีไลน์)"
              values={userData.line_id || ""}
              onChanges={handleChange}
              editable={isEditing}
            />

            <ProfileInput
              names={"teleiphone"}
              title="Phone Number (เบอร์โทร)"
              values={userData.teleiphone || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h4 className="mb-2 text-lg font-semibold text-primary text-left">
            ข้อมูลส่วนผู้ปกครอง
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            <ProfileInput
              names={"guardian_fname"}
              title="Guardian First Name (ชื่อผู้ปกครอง)"
              values={userData.guardian_fname || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
            <ProfileInput
              names={"guardian_lname"}
              title="Guardian Last Name (นามสกุลผู้ปกครอง)"
              values={userData.guardian_lname || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
            <ProfileInput
              names={"guardian_phone"}
              title="Guardian Phone (เบอร์โทรผู้ปกครอง)"
              values={userData.guardian_phone}
              onChanges={handleChange}
              editable={isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
