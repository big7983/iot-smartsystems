"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PiSignOut } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";

const menuGroups = [
  {
    label: "หน้าหลัก",
    route: "/",
  },
  {
    label: "ประวัติการเข้า-ออก",
    route: "/logroom",
  },
  {
    label: "โปรไฟล์",
    route: "/profile",
  },
];

const menuadminGroups = [
  {
    label: "จัดการสิทธิ์ผู้ใช้",
    route: "/usermanage",
  },
  {
    label: "DebugPage",
    route: "/debugpage",
  },
];

export default function Nevber() {
  const [role, setRole] = useState<any>(1);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("Login");
    router.push("/login");
  };

  useEffect(() => {
    const token:any = sessionStorage.getItem("token");
    console.log("✅ Decoded JWT:", token);

    const decoded:any = jwtDecode(token); 
    setRole(decoded.role);
    console.log("✅ Decoded JWT2:", decoded);
  }, []);

  return (
    <nav className="w-full bg-white shadow-lg text-sm">
      <div className="flex flex-wrap items-center justify-between mx-auto px-5 sm:px-8 py-3">
        <Link href="/">
          <Image
            src="/ce_logo_white_bg.png"
            alt="ce_logo"
            width={30}
            height={30}
          />
        </Link>
        <div className=" pt-4 sm:flex sm:w-auto hidden  items-center text-black text-sm">
          <ul className="flex flex-row gap-5">
            {menuGroups.map((group, groupIndex) => (
              <li
                className={`  ${
                  group.route === pathname
                    ? "text-primary  font-bold"
                    : " text-black "
                } "pt-2 pb-2 snap-start "`}
                key={groupIndex}
              >
                <Link
                  href={group.route}
                  className={` hover:text-primary `}
                  aria-current="page"
                >
                  {group.label}
                </Link>
              </li>
            ))}
            {role == "admin" &&
              menuadminGroups.map((group, groupIndex) => (
                <li className="snap-start inline-flex" key={groupIndex}>
                  <Link
                    href={group.route}
                    className={`${
                      group.route === pathname
                        ? "text-primary font-semibold"
                        : " text-black "
                    } hover:text-primary `}
                    aria-current="page"
                  >
                    {group.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <button onClick={handleLogout}>
          <PiSignOut size={28} color="#D34053" />
        </button>
      </div>
      <div className=" sm:hidden mx-auto px-5 sm:px-8 text-sm">
        <ul className=" flex flex-row sm:justify-center gap-4 overflow-auto whitespace-nowrap snap-x snap-mandatory">
          {menuGroups.map((group, groupIndex) => (
            <li
              className={`  ${
                group.route === pathname
                  ? "text-primary border-b-4 border-primary font-semibold"
                  : " text-black "
              } "pt-2 pb-2 snap-start "`}
              key={groupIndex}
            >
              <Link
                href={group.route}
                className={` hover:text-primary `}
                aria-current="page"
              >
                {group.label}
              </Link>
            </li>
          ))}
          {role == "admin" &&
            menuadminGroups.map((group, groupIndex) => (
              <li className="snap-start inline-flex" key={groupIndex}>
                <Link
                  href={group.route}
                  className={`${
                    group.route === pathname
                      ? "text-primary font-semibold"
                      : " text-black "
                  } hover:text-primary `}
                  aria-current="page"
                >
                  {group.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
