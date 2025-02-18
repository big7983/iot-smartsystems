"use client";

import React, { useState } from "react";
import Inputusermanage from "@/components/Boxdata";
import { MdOutlineCancel } from "react-icons/md";

interface PopupusermanageProps {
  idstu: string;
  onClose: () => void;
}

export default function Index({ idstu, onClose }: PopupusermanageProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white rounded pt-5 mx-3 mt-14 shadow-lg max-w-[1200px] w-full h-screen max-h-[75vh] overflow-y-auto">
        {/* <!-- Contact Form --> */}

        <div className="py-6 px-4 sm:px-[50px]">
          <div className="flex justify-between items-center border-b border-stroke mb-5 pb-5">
            <h3 className="text-center sm:text-left font-semibold text-black ">
              {idstu}
            </h3>
            <button onClick={onClose}>
              <MdOutlineCancel size={28} color="gray" />
            </button>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
              <Inputusermanage title="ไอดีการ์ด" />
            </div>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
              <Inputusermanage title="เลขบัตรประชาชน" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <Inputusermanage title="รหัสนักศึกษา" />
              <Inputusermanage title="ชื่อ" />
              <Inputusermanage title="นามสกุล" />
              <Inputusermanage title="อีเมลสถาบัน" />
              <Inputusermanage title="LineID" />
              <Inputusermanage title="ตำแหน่ง" />
              <Inputusermanage title="เบอร์โทร" />
              <Inputusermanage title="วันเดือนปีที่เกิด" />
              <Inputusermanage title="กรุ๊ปเลือด" />
            </div>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <Inputusermanage title="ชื่อจริงผู้ปกครอง" />
              <Inputusermanage title="นามสกุลผู้ปกครอง" />
              <Inputusermanage title="เบอร์ติดต่อของผู้ปกครอง" />
            </div>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
              <div>
              <label className="text-black block mb-1">บทบาทในเว็บไซต์</label>
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }}
                className={`w-full rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary`}
              >
                <option value="user" className="text-body dark:text-bodydark">
                  user
                </option>
                <option value="admin" className="text-body dark:text-bodydark">
                  admin
                </option>
              </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl text-white text-sm bg-danger mt-5"
            >
              ยกเลิก
            </button>
            <button className="px-4 py-2 rounded-2xl text-white text-sm bg-success mt-5">
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
