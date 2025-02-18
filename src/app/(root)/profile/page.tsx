"use client";

import ProfileInput from "@/components/Inputs";
// import Selects from "@/components/Selects";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any[]>([]); // กำหนดให้ userData เป็น array

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user_info`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);

        console.log(response.data);

        console.log("sa", process.env.NEXT_PUBLIC_API_URL);
        console.log("sa2", token);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const handleSave = async () => {
  //   try {
  //     await axios.put("/api/user", userData);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //   }
  // };

  return (
    <div className="flex justify-center w-full ">
      {userData.map((user , index) => (
        <div key={index} className="w-full max-w-[1200px] flex flex-col  justify-center gap-5">
          <div className="bg-white rounded-xl shadow-xl p-5">
            <div className="flex flex-col items-center w-full gap-6 md:flex-row">
              <div className="w-20 h-20  border-gray-200 rounded-full dark:border-gray-800">
                <Image
                  width={80}
                  height={80}
                  src="/avatar-user.jpg"
                  alt="user"
                />
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold text-center text-primary md:text-left">
                  {user.first_name} {user.last_name}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center md:flex-row md:gap-3 md:text-left">
                  <p className="text-sm text-gray-500 ">{user.position}</p>
                  <div className="hidden h-3.5 w-px bg-gray-300  md:block"></div>
                  <p className="text-sm text-gray-500 ">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto w-full md:max-w-[150px] border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 "
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-5">
            <h4 className="mb-2 text-lg font-semibold text-primary text-left">
              ข้อมูลส่วนบุคคล
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <ProfileInput
                names={user.id_card}
                title="ID Card (รหัสบัตรประชาชน)"
                values={user.id_card}
                onChanges={handleChange}
                // editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Student ID (รหัสนักศึกษา)"
                values={user.student_id || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="First Name (ชื่อ)"
                values={user.first_name || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Last Name (นามสกุล)"
                values={user.last_name || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Nickname (ชื่อเล่น)"
                values={user.nick_name || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Position (ตำแหน่ง)"
                values={user.position || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Date of birth (วันเดือนปีที่เกิด)"
                values={user.date_of_birth || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="LineID (ไอดีไลน์)"
                values={user.line_id || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Phone Number (เบอร์โทร)"
                values={user.position || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Blood Type (กรุ๊ปเลือด)"
                values={user.blood_group || ""}
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
                names={user.student_id}
                title="Guardian First Name (ชื่อผู้ปกครอง)"
                values={user.guardian_fname || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Guardian Last Name (นามสกุลผู้ปกครอง)"
                values={user.guardian_lname || ""}
                onChanges={handleChange}
                editable={isEditing}
              />
              <ProfileInput
                names={user.student_id}
                title="Guardian Phone (เบอร์โทรผู้ปกครอง)"
                values={user.guardian_phone}
                onChanges={handleChange}
                editable={isEditing}
              />
            </div>
          </div>
          {isEditing && (
            <div className="">
              <button className="px-4 py-2 rounded-2xl text-white text-sm bg-danger mt-5">
                ยกเลิก
              </button>
              <button className="px-4 py-2 rounded-2xl text-white text-sm bg-success mt-5">
                บันทึก
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
