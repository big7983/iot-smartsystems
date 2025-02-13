"use client";
import React, { useState } from "react";
import Image from "next/image";
import Popupusermanage from "@/components/Popupusermanage";

type Student = {
  Student_ID: string;
  First_name: string;
  Last_name: string;
  Email: string;
};

const initialStudentsData: Student[] = [
  {
    Student_ID: "64200123",
    First_name: "บวรลักษณ์",
    Last_name: "ศิลป์สกุลเจริญ",
    Email: "64200123@kmitl.ac.th",
  },
  {
    Student_ID: "64200247",
    First_name: "สุทธิกานต์",
    Last_name: "ศรีเพชร",
    Email: "64200247@kmitl.ac.th",
  },
  {
    Student_ID: "64200255",
    First_name: "เสฎฐวุฒิ",
    Last_name: "กสิวุฒิเชิดชูชัย",
    Email: "64200123@kmitl.ac.th",
  },
  {
    Student_ID: "S002",
    First_name: "ขวัญจิตา",
    Last_name: "อำนวยสุข",
    Email: "แม่ของคุณ@gmail.com",
  },
  {
    Student_ID: "S003",
    First_name: "สมศักดิ์",
    Last_name: "รักประยุทธ",
    Email: "ไอ้โต๊ส@gmail.com",
  },
];

export default function Page() {
  const [data] = useState<Student[]>(initialStudentsData);
  const [search, setSearch] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [idstu, setIdstu] = useState<string>("");

  const handleOpenPopup = (id: string) => {
    setIdstu(id); // เก็บ id ของนักเรียนที่ต้องการแสดงใน Popup
    setIsPopupOpen(true); // เปิดป๊อปอัพ
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // ปิดป๊อปอัพ
  };

  const filteredStudents = data.filter((student) => {
    const query = search.toLowerCase();
    return (
      student.Student_ID.toLowerCase().includes(query) ||
      student.First_name.toLowerCase().includes(query) ||
      student.Last_name.toLowerCase().includes(query) ||
      student.Email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <h3 className="text-black text-xl font-semibold mt-5 sm:mt-1">
          จัดการสิทธิ์ผู้ใช้
        </h3>

        <input
          type="text"
          placeholder="ค้นหานักศึกษา (รหัส, ชื่อ, นามสกุล, อีเมล)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 shadow rounded-2xl bg-white px-5 py-2 outline-none focus:border-gray-300  disabled:cursor-default"
        />
        <div className="flex flex-col gap-5">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.Student_ID}
                className="bg-white shadow-md rounded-2xl p-5"
              >
                <div className="flex flex-row items-center w-full gap-4 md:gap-6 ">
                  <div className="w-15 h-15  border-gray-200 rounded-full dark:border-gray-800">
                    <Image
                      width={50}
                      height={50}
                      src="/avatar-user.jpg"
                      alt="user"
                    />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm sm:text-lg font-semibold text-primary text-left">
                      {student.First_name} {student.Last_name}
                    </h4>
                    <div className="flex items-center gap-3 flex-row text-left">
                      <p className="text-[10px] sm:text-sm text-gray-500 ">
                        {student.Student_ID}
                      </p>
                      <div className="hidden h-3.5 w-px bg-gray-300 sm:block"></div>
                      <p className="text-[10px] sm:text-sm text-gray-500 hidden sm:block">
                        {student.Email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenPopup(student.Student_ID)}
                    className="ml-auto px-4 py-2 rounded-2xl text-white text-sm bg-warning hover:shadow-xl hover:border-gray-300 hover:bg-yellow-900 transition-all"
                  >
                    เลือก
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h4 className="mb-1 text-sm sm:text-lg font-semibold text-primary text-left">
              ไม่พบข้อมูล
            </h4>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <Popupusermanage idstu={idstu} onClose={handleClosePopup} />
      )}
    </div>
  );
}
