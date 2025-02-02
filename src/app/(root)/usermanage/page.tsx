"use client";
import React, { useState } from "react";
import Popupusermanage from "@/components/Popupusermanage";

export default function Page() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [idstu, setIdstu] = useState<string>("");

  const handleOpenPopup = (id: string) => {
    setIdstu(id); // เก็บ id ของนักเรียนที่ต้องการแสดงใน Popup
    setIsPopupOpen(true); // เปิดป๊อปอัพ
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // ปิดป๊อปอัพ
  };

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <h3 className="text-black text-xl font-semibold mt-5 sm:mt-1">
          จัดการสิทธิ์ผู้ใช้
        </h3>
        <div className=" flex flex-col sm:flex-row justify-between gap-5 ">
          <select
            className={` shadow rounded-2xl border border-gray-200 px-4 py-2 outline-none cursor-pointer hover:shadow-xl hover:border-gray-300 `}
          >         
            <option value="true" className="text-body">
              เรียงจากมากไปน้อย
            </option>
            <option value="false" className="text-body">
            เรียงจากน้อยไปมาก
            </option>
          </select>
          <input
            type="text"
            placeholder="ค้นหา"
            // value={searchText}
            // onChange={handleSearch}
            className="w-full sm:max-w-[350px] border border-gray-200 shadow rounded-2xl bg-white px-5 py-2 outline-none   focus:shadow-xl focus:border-gray-300  disabled:cursor-default"
          />
        </div>
        <div className="flex gap-5">
          <div className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5 sm:px-8 text-sm sm:text-base">
            <div className="flex justify-between items-center ">
              <div className="flex gap-2">
                <span>64200255</span>
                <span>เสฎฐวุฒิ กสิวุฒิเชิดชูชัย</span>
              </div>
              <button
                onClick={() => handleOpenPopup("64200255")}
                className="px-4 py-2 rounded-2xl text-white text-sm bg-warning hover:shadow-xl hover:border-gray-300 hover:bg-yellow-900 transition-all"
              >
                เลือก
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <Popupusermanage idstu={idstu} onClose={handleClosePopup} />
      )}
    </div>
  );
}
