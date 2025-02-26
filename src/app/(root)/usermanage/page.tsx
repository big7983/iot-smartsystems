"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Popupusermanage from "@/components/Popupusermanage";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/LoaderPage";
import { useRouter } from "next/navigation";

type Student = {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  photograph: string;
};

// const initialStudentsData: Student[] = [
//   {
//     Student_ID: "64200123",
//     First_name: "บวรลักษณ์",
//     Last_name: "ศิลป์สกุลเจริญ",
//     Email: "64200123@kmitl.ac.th",
//   },
//   {
//     Student_ID: "64200247",
//     First_name: "สุทธิกานต์",
//     Last_name: "ศรีเพชร",
//     Email: "64200247@kmitl.ac.th",
//   },
//   {
//     Student_ID: "64200255",
//     First_name: "เสฎฐวุฒิ",
//     Last_name: "กสิวุฒิเชิดชูชัย",
//     Email: "64200123@kmitl.ac.th",
//   },
//   {
//     Student_ID: "S002",
//     First_name: "ขวัญจิตา",
//     Last_name: "อำนวยสุข",
//     Email: "แม่ของคุณ@gmail.com",
//   },
//   {
//     Student_ID: "S003",
//     First_name: "สมศักดิ์",
//     Last_name: "รักประยุทธ",
//     Email: "ไอ้โต๊ส@gmail.com",
//   },
// ];

export default function Page() {
  //const [data] = useState<Student[]>(initialStudentsData);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const router = useRouter()

  const handleOpenPopup = (id: string) => {
    const student = students.find((s) => s.student_id === id);
    if (student) {
      setSelectedStudent(student);
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // ปิดป๊อปอัพ
  };

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();
    return (
      student.student_id.toLowerCase().includes(query) ||
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user_info`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`, // ส่ง Token ไปกับ Request
            },
          }
        );
        setStudents(response.data); // บันทึกข้อมูลใน State
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // เมื่อโหลดเสร็จแล้ว ปรับให้เป็น false
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error)
    return <p className="text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>;

  return (
    <div className="flex justify-center w-full ">
      <Toaster position="bottom-left" />

      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <h3 className="text-primary text-xl font-semibold mt-5 sm:mt-1">
          จัดการสิทธิ์ผู้ใช้
        </h3>

        <div className="flex flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="ค้นหานักศึกษา (รหัส, ชื่อ, นามสกุล, อีเมล)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-[80%] border border-gray-200 shadow rounded-3xl bg-white px-5 py-2 outline-none focus:border-gray-300  disabled:cursor-default"
          />
          <button
          onClick={() => router.push('/register')}
            className={`px-3 py-2 rounded-3xl text-white font text-[13px] whitespace-nowrap sm:text-sm 
                      bg-success hover:shadow-xl hover:border-gray-300 hover:bg-green-900 transition-all
                     `}
          >
            เพิ่มผู้ใช้ใหม่
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div key={index} className="bg-white shadow-md rounded-2xl p-5">
                <div className="flex flex-row items-center w-full gap-4 md:gap-6 ">
                  <div className="w-15 h-15  border-gray-200 rounded-full dark:border-gray-800">
                    <Image
                      width={50}
                      height={50}
                      src={student.photograph || "/avatar-user.jpg"}
                      alt="user"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm sm:text-lg font-semibold text-primary text-left">
                      {student.first_name} {student.last_name}
                    </h4>
                    <div className="flex items-center gap-3 flex-row text-left">
                      <p className="text-[10px] sm:text-sm text-gray-500 ">
                        {student.student_id}
                      </p>
                      <div className="hidden h-3.5 w-px bg-gray-300 sm:block"></div>
                      <p className="text-[10px] sm:text-sm text-gray-500 hidden sm:block">
                        {student.position}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenPopup(student.student_id)}
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
      {isPopupOpen && selectedStudent && (
        <Popupusermanage student={selectedStudent} onClose={handleClosePopup} />
      )}
    </div>
  );
}
