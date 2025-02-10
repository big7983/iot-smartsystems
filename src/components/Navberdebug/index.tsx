"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Nevber() {
  const [pages] = useState([
    { page: "profiletest", route: "/profiletest" },
    { page: "logindebug", route: "/logindebug" },
  ]);

  const pathname = usePathname();
  const router = useRouter();
  const handleNavigate = (route: string) => {
    router.push(route); // ใช้ useRouter เพื่อนำทาง
  };
  return (
    <div className="mx-20 bg-slate-600">
      {pages.map((item, index) => (
        <button
          key={index}
          onClick={() => handleNavigate(item.route)} // คลิกแล้วไปที่ route นั้น
          className={`${
            item.route === pathname ? "bg-blue-800" : " text-black "
          } bg-blue-500 text-white rounded hover:bg-blue-300 m-2 p-2`}
        >
          {item.page}
        </button>
      ))}
    </div>
  );
}
