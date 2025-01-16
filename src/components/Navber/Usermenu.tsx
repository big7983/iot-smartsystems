"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Usermenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* ปุ่มสำหรับเปิด/ปิด Dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-400 "
      >
        <Image
          src="/avatar-user.jpg"
          alt="avatar-user"
          width={45}
          height={45}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 ">Bonnie Green</span>
              <span className="block text-sm  text-gray-400 truncate">
                name@flowbite.com
              </span>
            </div>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
