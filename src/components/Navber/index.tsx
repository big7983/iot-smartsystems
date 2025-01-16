"use client";

import React from "react";
import Image from "next/image";
import DropdownMenu from "./Dropdownmenu";
import Usermenu from "./Usermenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    label: "สำหรับผู้ดูแล",
    route: "/logroom",
  },
];

const menuadminGroups = [
  {
    label: "จัดการห้อง",
    route: "/roommanage",
  },
  {
    label: "จัดการสิทธิ์ผู้ใช้",
    route: "/usermanage",
  },
];

export default function Nevber() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 md:px-20 py-4">
        <div>
          <Link href="/">
            <Image
              src="/ce_logo_white_bg.png"
              alt="ce_logo"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="md:flex md:w-auto hidden">
          {menuGroups.map((group, groupIndex) => (
            <ul key={groupIndex} className="px-3">
              <li className="">
                <Link
                  href={group.route}
                  className={`${group.route === pathname ? "text-primary font-semibold" : " text-black "} hover:text-primary `}
                  aria-current="page"
                >
                  {group.label}
                </Link>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex md:w-auto gap-3 items-center">
          <Usermenu />
          <div className="md:hidden">
            <DropdownMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
