"use client";
import { useEffect, useState } from "react";
import Manageroom from "@/components/Listroom/Manageroom";
import Room from "@/components/Listroom/Room";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [selectbuilding, setSelectbuilding] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<string>();

  const router = useRouter();
  const menuItems = ["All", "A", "B", "C", "D", "E"];

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก
  // <TbDeviceImacOff color="#D34053" size={26} /> อุปกรณ์ไม่เชื่อมต่อ
  // <TbDeviceImacCheck color="#219653" size={26} /> อุปกรณ์เชื่อมต่อ

  const handleSelect = (menu: string) => {
    setSelectbuilding(menu);
    console.log(`คุณเลือก: ${menu}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") { // ✅ ตรวจสอบว่ารันบน client
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
          <div className=" flex flex-col md:flex-row justify-between gap-5 ">
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                changeTextColor();
              }}
              className={` shadow rounded-2xl border border-gray-200 px-4 py-2 outline-none cursor-pointer hover:shadow-xl hover:border-gray-300 ${
                isOptionSelected ? "text-black " : ""
              }`}
            >
              <option value="" className="text-body ">
                ทั้งหมด
              </option>
              {role == "admin" ? (
                <>
                  <option value="true" className="text-body">
                    ห้องที่เปิด
                  </option>
                  <option value="false" className="text-body">
                    ห้องที่ล็อก
                  </option>
                </>
              ) : (
                <>
                  <option value="true" className="text-body">
                    เปิดใช้งาน
                  </option>
                  <option value="false" className="text-body">
                    ปิดใช้งาน
                  </option>
                </>
              )}
            </select>
            <input
              type="text"
              placeholder="ค้นหาชื่อห้อง"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:max-w-[350px] border border-gray-200 shadow rounded-2xl bg-transparent px-5 py-2 outline-none   focus:shadow-xl focus:border-gray-300  disabled:cursor-default"
            />
          </div>
        </div>
        {role == "admin" ? (
          <Manageroom
            selectbuilding={selectbuilding}
            selectedOption={selectedOption}
            searchQuery={searchQuery}
          />
        ) : (
          <Room
            selectbuilding={selectbuilding}
            selectedOption={selectedOption}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  );
}


