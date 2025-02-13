import React from "react";

interface SelectProps {
title: string;
  options: string[];
}

export default function index({ title, options  }: SelectProps){
  return (
    <div>
      <label className="text-sm text-black block mb-1">{title}</label>
      <select
        defaultValue=""
        className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
      >
        <option value="" disabled>
        {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};


