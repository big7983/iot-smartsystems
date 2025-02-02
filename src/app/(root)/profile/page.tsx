import Boxdata from "@/components/Boxdata";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center w-full ">
      <div className="w-full max-w-[1200px] flex flex-col  justify-center ">
        {/* <!-- Contact Form --> */}

        <div className=" flex justify-between items-center border-b border-stroke pb-2">
          <h3 className="text-center sm:text-left font-semibold text-black text-xl mt-5  sm:mt-1 mb-2">
            ข้อมูลส่วนตัว
          </h3>
          {/* <button><FiEdit size={21} color="#ffa70b"/></button> */}
        </div>
        <div className="border-b border-stroke ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <Boxdata title="เลขบัตรประชาชน"  />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            <Boxdata title="รหัสนักศึกษา"  />
            <Boxdata title="ชื่อ"  />
            <Boxdata title="นามสกุล"  />
            <Boxdata title="อีเมลสถาบัน"  />
            <Boxdata title="LineID"  />
            <Boxdata title="ตำแหน่ง"  />
            <Boxdata title="เบอร์โทร"  />
            <Boxdata title="วันเดือนปีที่เกิด"  />
            <Boxdata title="กรุ๊ปเลือด"  />
          </div>
        </div>
        <div className="border-b border-stroke ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            <Boxdata title="ชื่อจริงผู้ปกครอง"  />
            <Boxdata title="นามสกุลผู้ปกครอง"  />
            <Boxdata title="เบอร์ติดต่อของผู้ปกครอง"  />
          </div>
        </div>
        <div className="flex justify-between hidden">
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
