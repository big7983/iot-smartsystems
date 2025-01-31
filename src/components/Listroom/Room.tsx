import React from "react";

export default function Room() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 ">
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
        <div className=" flex justify-between">
          <span className="text-base">A100</span>
          <div className="flex flex-row justify-between items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success"></span>
            <span className="text-sm">กำลังใช้งาน</span>
          </div>
        </div>
      </div>
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 p-5">
        <div className=" flex justify-between">
          <span className="text-base">A100</span>
          <div className="flex flex-row justify-between items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success"></span>
            <span className="text-sm">กำลังใช้งาน</span>
          </div>
        </div>
      </div>
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 p-5">
        <div className=" flex justify-between">
          <span className="text-base">A100</span>
          <div className="flex flex-row justify-between items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success"></span>
            <span className="text-sm">กำลังใช้งาน</span>
          </div>
        </div>
      </div>
    </div>
  );
}
