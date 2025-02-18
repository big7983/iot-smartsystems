import ProfileInput from "@/components/Boxdata";
import Selects from "@/components/Selects";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="flex justify-center w-full ">
      <div className="w-full max-w-[1200px] flex flex-col  justify-center gap-5">
        <div className="bg-white rounded-xl shadow-xl p-5">
          <div className="flex flex-col items-center w-full gap-6 md:flex-row">
            <div className="w-20 h-20  border-gray-200 rounded-full dark:border-gray-800">
              <Image width={80} height={80} src="/avatar-user.jpg" alt="user" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-center text-primary md:text-left">
                Setthawut Kasiwutchoudchuchai
              </h4>
              <div className="flex flex-col items-center gap-1 text-center md:flex-row md:gap-3 md:text-left">
                <p className="text-sm text-gray-500 ">Head Front - End</p>
                <div className="hidden h-3.5 w-px bg-gray-300  md:block"></div>
                <p className="text-sm text-gray-500 ">64200255@kmitl.ac.th</p>
              </div>
            </div>
            <button className="ml-auto w-full md:max-w-[150px] border border-gray-200 shadow rounded-3xl bg-transparent px-5 py-3 outline-none focus:shadow-xl focus:border-gray-300 ">
              Edit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h4 className="mb-2 text-lg font-semibold text-primary text-left">
            ข้อมูลส่วนบุคคล
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            <ProfileInput title="ID Card (รหัสบัตรประชาชน)" />
            <ProfileInput title="Student ID (รหัสนักศึกษา)" />
            <ProfileInput title="First Name (ชื่อ)" />
            <ProfileInput title="Last Name (นามสกุล)" />
            <ProfileInput title="Nickname (ชื่อเล่น)" />
            <ProfileInput title="Position (ตำแหน่ง)" />

            {/* <Selects
              title="Position (ตำแหน่ง)"
              options={["อาจารย์", "นักศึกษา", "บุคลากร"]}
            /> */}

            <ProfileInput title="Date of birth (วันเดือนปีที่เกิด)" />
            <ProfileInput title="LineID (ไอดีไลน์)" />
            <ProfileInput title="Phone Number (เบอร์โทร)" />
            <ProfileInput title="Blood Type (กรุ๊ปเลือด)" />

            {/* <Selects
              title="Blood Type (กรุ๊ปเลือด)"
              options={["A", "B", "AB", "O"]}
            /> */}

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h4 className="mb-2 text-lg font-semibold text-primary text-left">
            ข้อมูลส่วนผู้ปกครอง
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            <ProfileInput title="Guardian First Name (ชื่อผู้ปกครอง)" />
            <ProfileInput title="Guardian Last Name (นามสกุลผู้ปกครอง)" />
            <ProfileInput title="Guardian Phone (เบอร์โทรผู้ปกครอง)" />
          </div>
        </div>

        <div className="hidden">
          <button className="px-4 py-2 rounded-2xl text-white text-sm bg-danger mt-5">
            ยกเลิก
          </button>
          <button className="px-4 py-2 rounded-2xl text-white text-sm bg-success mt-5">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
