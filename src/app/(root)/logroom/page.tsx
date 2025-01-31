"use client"
import React, { useState } from "react";

export default function Page() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <div className="mt-5 sm:mt-1">ประวัติเข้า/ออก ห้องเรียน</div>
        <div className=" flex flex-col sm:flex-row justify-between gap-5 ">
          <div className="flex flex-row justify-between sm:justify-normal gap-2">
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
            className="w-full sm:max-w-[350px] border border-gray-200 shadow rounded-2xl bg-transparent px-5 py-2 outline-none   focus:shadow-xl focus:border-gray-300  disabled:cursor-default"
          />
        </div>
        <div className="bg-slate-400 w-full h-screen"> table </div>
      </div>
    </div>
  );
}
