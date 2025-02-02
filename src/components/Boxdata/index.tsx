import React from "react";

interface InputsProps {
  title: string;
  //values: string;
}

export default function index({ title }: InputsProps) {
  return (
    <div>
      <label className="text-black block mb-1">{title}</label>
      <input
        disabled
        //value={"ทดสอบ"}
        //onChange={onChanges}
        placeholder="ไม่มีข้อมูล"
        className="w-full rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
      />
    </div>
  );
}
