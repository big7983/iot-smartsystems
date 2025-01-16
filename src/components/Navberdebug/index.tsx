"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Nevber() {
  const [pages] = useState([
    { page: "profiletest", route: "/profiletest" },
    { page: "Stepper", route: "/Demo/Stepper" },
    { page: "Table", route: "/Demo/Table" },
    { page: "Tablev2", route: "/Demo/Tablev2" },
    { page: "Tablev3", route: "/Demo/Tablev3" },
    { page: "Tablev31", route: "/Demo/Tablev31" },
    { page: "Tablev4", route: "/Demo/Tablev4" },
    { page: "inputtest2", route: "/Demo/inputtest2" },
    { page: "inputtest3", route: "/Demo/inputtest3" },
    { page: "inputtest4", route: "/Demo/inputtest4" },
    { page: "testlist", route: "/Demo/testlist" },
    { page: "trainingsurvey", route: "/trainingsurvey" },
    { page: "seedmail", route: "/Demo/seedmail" },
    { page: "Tablev3", route: "/Demo/Tablev3" },
    { page: "Tablev31", route: "/Demo/Tablev31" },
    { page: "Tablev4", route: "/Demo/Tablev4" },
    { page: "inputtest2", route: "/Demo/inputtest2" },
    { page: "inputtest3", route: "/Demo/inputtest3" },
    { page: "inputtest4", route: "/Demo/inputtest4" },
    { page: "testlist", route: "/Demo/testlist" },
    { page: "trainingsurvey", route: "/trainingsurvey" },
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
