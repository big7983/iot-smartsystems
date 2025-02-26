"use client";
import { useEffect, useState } from "react";
import Manageroom from "@/components/Listroom/Manageroom";
import Logroom from "@/components/Listroom/Logroom";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";

export default function Home() {
  const [selectedOption] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // สำหรับ <DatePicker>
  const [selectbuilding, setSelectbuilding] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<string>();

  const router = useRouter();
  const menuItems = ["All", "A", "B", "C", "D", "E"];

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก
  // <TbDeviceImacOff color="#D34053" size={26} /> อุปกรณ์ไม่เชื่อมต่อ
  // <TbDeviceImacCheck color="#219653" size={26} /> อุปกรณ์เชื่อมต่อ

  const handleSelect = (menu: string) => {
    setSelectbuilding(menu);
    console.log(`คุณเลือก: ${menu}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ ตรวจสอบว่ารันบน client
      const token = sessionStorage.getItem("token");
      if (!token) {
        Cookies.remove("Login");
        router.push("/login");
      } else {
        try {
          const decoded: any = jwtDecode(token);
          setRole(decoded.role || "user");
        } catch (error) {
          console.error("❌ JWT Decode Error:", error);
          setRole("user");
        }
      }
    }
  }, [router]); // ✅ ทำงานเฉพาะบน client

  return (
    <div className="flex justify-center w-full ">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex flex-col justify-center max-w-[900px] w-full">
        <div className="flex flex-col gap-2 justify-center shadow-xl rounded-2xl border border-gray-100 bg-white p-5 sm:p-12 mb-10 ">
          <ul className=" grid grid-cols-3 md:grid-cols-6 gap-5 mb-5 text-center">
            {menuItems.map((menu) => (
              <li
                key={menu}
                className={`px-4 py-2 cursor-pointer rounded-2xl border transition-all ${
                  selectbuilding === menu
                    ? "shadow-xl border-gray-200 bg-primary text-white"
                    : "shadow border-gray-100 hover:shadow-xl hover:border-gray-300 hover:bg-primary hover:text-white"
                }`}
                onClick={() => handleSelect(menu)}
              >
                {menu === "All" ? "ทั้งหมด" : "ตึก " + menu}
              </li>
            ))}
          </ul>
          {role === "admin" ? (
            <input
              type="text"
              placeholder="ค้นหาชื่อห้อง"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full  border border-gray-200 shadow rounded-2xl bg-transparent px-5 py-2 outline-none focus:shadow-xl focus:border-gray-300 disabled:cursor-default"
            />
          ) : (
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="เลือกวันที่"
                className="w-full sm:max-w-[200px] border border-gray-200 shadow rounded-2xl px-5 py-2 outline-none focus:shadow-xl focus:border-gray-300"
              />
              <input
                type="text"
                placeholder="ค้นหาชื่อห้อง"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:max-w-[350px] border border-gray-200 shadow rounded-2xl bg-transparent px-5 py-2 outline-none focus:shadow-xl focus:border-gray-300 disabled:cursor-default"
              />
            </div>
          )}
        </div>
        {role == "admin" ? (
          <Manageroom
            selectbuilding={selectbuilding}
            selectedOption={selectedOption}
            searchQuery={searchQuery}
          />
        ) : (
          <Logroom
            selectbuilding={selectbuilding}
            selectedDate={selectedDate}
            searchQuery={searchQuery}
          />
          // <Room
          //   selectbuilding={selectbuilding}
          //   selectedOption={selectedOption}
          //   searchQuery={searchQuery}
          // />
        )}
      </div>
    </div>
  );
}
