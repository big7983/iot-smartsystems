"use client"

import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    year: "3",
    studentId: "12345678",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("ข้อมูลถูกบันทึกแล้ว!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          ข้อมูลโปรไฟล์
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{profile.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              นามสกุล
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{profile.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ชั้นปี
            </label>
            {isEditing ? (
              <input
                type="text"
                name="year"
                value={profile.year}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{profile.year}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              รหัสนักศึกษา
            </label>
            {isEditing ? (
              <input
                type="text"
                name="studentId"
                value={profile.studentId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{profile.studentId}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                บันทึก
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              แก้ไข
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
