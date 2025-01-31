"use client";
import { useState } from "react";
import Manageroom from "@/components/Listroom/Manageroom";


export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก
  // <TbDeviceImacOff color="#D34053" size={26} /> อุปกรณ์ไม่เชื่อมต่อ
  // <TbDeviceImacCheck color="#219653" size={26} /> อุปกรณ์เชื่อมต่อ

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center max-w-[900px] w-full">
        <div className="flex flex-col gap-2 justify-center  shadow-xl rounded-2xl border border-gray-100 p-5 sm:p-12 mb-10 ">
          <ul className=" grid grid-cols-3 md:grid-cols-6 gap-5 mb-5 text-center">
            <li className="px-4 py-2 cursor-pointer shadow-xl rounded-2xl border border-gray-200 bg-primary text-white transition-all">
              ทั้งหมด
            </li>
            <li className="px-4 py-2 cursor-pointer shadow  rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-300 hover:bg-primary hover:text-white transition-all">
              ตึก A
            </li>
            <li className="px-4 py-2 cursor-pointer shadow  rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-300 hover:bg-primary hover:text-white transition-all">
              ตึก B
            </li>
            <li className="px-4 py-2 cursor-pointer shadow  rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-300 hover:bg-primary hover:text-white transition-all">
              ตึก C
            </li>
            <li className="px-4 py-2 cursor-pointer shadow  rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-300 hover:bg-primary hover:text-white transition-all">
              ตึก D
            </li>
            <li className="px-4 py-2 cursor-pointer shadow  rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-300 hover:bg-primary hover:text-white transition-all">
              ตึก E
            </li>
          </ul>
          <div className=" flex flex-col md:flex-row justify-between gap-5 ">
            <div className="flex flex-row justify-between md:justify-normal gap-2">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`w-full shadow rounded-2xl border border-gray-200 px-4 py-2 outline-none cursor-pointer hover:shadow-xl hover:border-gray-300 ${
                  isOptionSelected ? "text-black " : ""
                }`}
              >
                <option value="" disabled className="text-body ">
                  ชั้น
                </option>
                <option value="USA" className="text-body ">
                  USA
                </option>
                <option value="UK" className="text-body ">
                  UK
                </option>
                <option value="Canada" className="text-base ">
                  Canada
                </option>
              </select>

              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`w-full shadow rounded-2xl border border-gray-200 px-4 py-2 outline-none cursor-pointer hover:shadow-xl hover:border-gray-300 ${
                  isOptionSelected ? "text-black " : ""
                }`}
              >
                <option value="" disabled className="text-body ">
                  สถานะ
                </option>
                <option value="USA" className="text-body ">
                  USA
                </option>
                <option value="UK" className="text-body ">
                  UK
                </option>
                <option value="Canada" className="text-base ">
                  Canada
                </option>
              </select>
            </div>
            <input
              type="text"
              placeholder="ค้นหา"
              className="w-full md:max-w-[350px] border border-gray-200 shadow rounded-2xl bg-transparent px-5 py-2 outline-none   focus:shadow-xl focus:border-gray-300  disabled:cursor-default"
            />
          </div>
        </div>
        <Manageroom />
        {/* <Room /> */}
      </div>
    </div>
  );
}
