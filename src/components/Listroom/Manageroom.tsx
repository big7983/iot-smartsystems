import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import {
  TbDeviceImacOff,
  TbDeviceImacExclamation,
  TbDeviceImacCheck,
} from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";

export default function Manageroom() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 ">
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
        <div className=" flex justify-between items-center">
          <span className="text-base">A100</span>
          <div className=" flex flex-row justify-between items-center gap-2">
            <FaLockOpen color="#219653" size={24} />
            <TbDeviceImacCheck color="#219653" size={26} />
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button className="px-4 py-2 rounded-2xl text-white text-sm bg-warning hover:shadow-xl hover:border-gray-300 hover:bg-primary transition-all">
              รายชื่อ
            </button>
            <button className="px-4 py-2 rounded-2xl text-white text-sm  bg-danger hover:shadow-xl hover:border-gray-300 hover:bg-primary  transition-all">
              ปิดห้อง
            </button>
          </div>
        </div>
      </div>
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
        <div className=" flex justify-between items-center">
          <span className="text-base">A100</span>
          <div className=" flex flex-row justify-between items-center gap-2">
            <FaLock color="#D34053" size={24} />
            <TbDeviceImacCheck color="#219653" size={26} />
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button className="px-4 py-2 rounded-2xl text-white text-sm  bg-gray-300 hover:shadow-xl cursor-not-allowed transition-all">
              รายชื่อ
            </button>
            <button className="px-4 py-2 rounded-2xl text-white text-sm  bg-danger hover:shadow-xl hover:border-gray-300 hover:bg-primary  transition-all">
              ปิดห้อง
            </button>
          </div>
        </div>
      </div>
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
        <div className=" flex justify-between items-center">
          <span className="text-base">A100</span>
          <div className=" flex flex-row justify-between items-center gap-2">
            <FaLockOpen color="#219653" size={24} />
            <TbDeviceImacExclamation color="#FFA70B" size={26} />
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button className="px-4 py-2 rounded-2xl text-white text-sm bg-warning hover:shadow-xl hover:border-gray-300 hover:bg-primary transition-all">
              รายชื่อ
            </button>
            <button className="px-4 py-2 rounded-2xl text-white text-sm  bg-danger hover:shadow-xl hover:border-gray-300 hover:bg-primary  transition-all">
              ปิดห้อง
            </button>
          </div>
        </div>
      </div>
      <div className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
        <div className=" flex justify-between items-center">
          <span className="text-base">A100</span>
          <div className=" flex flex-row justify-between items-center gap-2">
            <IoIosWarning color="#FFA70B" size={26} />
            <TbDeviceImacOff color="#D34053" size={26} />
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button className="px-4 py-2 rounded-2xl text-white text-sm bg-gray-300 hover:shadow-xl cursor-not-allowed transition-all">
              รายชื่อ
            </button>
            <button className="px-4 py-2 rounded-2xl text-white text-sm  bg-gray-300 hover:shadow-xl cursor-not-allowed transition-all">
              ปิดห้อง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
