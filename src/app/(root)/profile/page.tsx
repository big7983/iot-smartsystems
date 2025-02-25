"use client";

import ProfileInput from "@/components/Inputs";
import Loader from "@/components/LoaderPage";
// import Selects from "@/components/Selects";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
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
        console.log(response.data);  
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // เมื่อโหลดข้อมูลเสร็จให้เปลี่ยนเป็น false
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    //const token = sessionStorage.getItem("token");
    try {
      // await axios.put(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/user_info/${userData.id_card}`,
      //   userData,
      //   {
      //     headers: {
      //       Accept: "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      console.log("Data updated successfully:", userData.id_card);
      console.log("Data updated successfully:", userData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="w-full max-w-[1200px] flex flex-col  justify-center gap-5">
        <div className="bg-white rounded-xl shadow-xl p-5">
          <div className="flex flex-col items-center w-full gap-6 md:flex-row">
            <div className="w-20 h-20  border-gray-200 rounded-full dark:border-gray-800">
              <Image width={80} height={80} src="/avatar-user.jpg" alt="user" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-center text-primary md:text-left">
                {userData.first_name} {userData.last_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center md:flex-row md:gap-3 md:text-left">
                <p className="text-sm text-gray-500 ">{userData.Position}</p>
                <div className="hidden h-3.5 w-px bg-gray-300  md:block"></div>
                <p className="text-sm text-gray-500 ">{userData.email}</p>
              </div>
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-5 md:flex-row md:max-w-[250px] w-full ml-auto">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className=" w-full bg-warning hover:bg-slate-300 text-white border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 "
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={handleSave}
                  className=" w-full bg-green-700 hover:bg-slate-300 text-white  border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 "
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

            <ProfileInput
              names={"date_of_birth"}
              title="Date of birth (วันเดือนปีที่เกิด)"
              values={userData.date_of_birth || ""}
              onChanges={handleChange}
              editable={isEditing}
            />
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
            <ProfileInput
              names={"blood_group"}
              title="Blood Type (กรุ๊ปเลือด)"
              values={userData.blood_group || ""}
              onChanges={handleChange}
              editable={isEditing}
            />

            {/* <Selects
              title="Position (ตำแหน่ง)"
              options={["อาจารย์", "นักศึกษา", "บุคลากร"]}
            /> */}

            {/* <Selects
              title="Blood Type (กรุ๊ปเลือด)"
              options={["A", "B", "AB", "O"]}
            /> */}
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
