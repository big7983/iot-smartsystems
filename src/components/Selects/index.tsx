import React from "react";

interface SelectProps {
  names: string;
  title: string;
  values: string;
  onChanges: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export default function index({
  names,
  title,
  values,
  onChanges,
  options,
}: SelectProps) {
  return (
    <div>
      <label className="text-sm text-black block mb-1">{title}</label>
      <select
        name={names}
        value={values}
        onChange={onChanges}
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
}
