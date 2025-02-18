import React from "react";

interface InputsProps {
  names: string;
  title: string;
  values: string;
  onChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function index({
  names,
  title,
  values,
  onChanges,
}: InputsProps) {
  return (
    <div>
      <label className="text-sm text-black block mb-1">{title}</label>
      <input
        name={names}
        value={values}
        onChange={onChanges}
        placeholder="ไม่มีข้อมูล"
        className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
      />
    </div>
  );
}
