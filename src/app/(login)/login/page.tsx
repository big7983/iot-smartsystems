"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { generateToken } from "@/lib/jwt";

const mockUsers = [
  { email: "user@user.com", password: "123456", role: 2 },
  { email: "admin@admin.com", password: "123456", role: 1 },
];

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    try {
      // ✅ ใช้ await เพื่อรอให้ token ถูกสร้างก่อนใช้งาน
      const token = await generateToken({ email: user.email, role: user.role });

      // ✅ ตรวจสอบว่ามี token ก่อนบันทึกลง Cookies
      if (token) {
        Cookies.set("token", token);
        alert("Login successful!");
        router.push("/"); // ✅ เปลี่ยนหน้าไปที่ "/"
      } else {
        alert("Failed to generate token");
      }
    } catch (error) {
      console.error("Error generating token:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg  w-full px-5 py-8 sm:p-8 max-w-[395px] mx-5 sm:mx-0 ">
        <div className="flex flex-col items-center">
          <Image
            className="mb-7"
            src="/CE_logo_black_no.png"
            alt="KMITL Computer Engineering"
            width={275}
            height={100}
          />
          <form className="w-full" onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-base font-bold text-primary "
              >
                Email
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2 py-[6.5px] pl-5"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your e-mail"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-base font-bold text-primary"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className=" mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2 py-[6.5px] pl-5"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                ></button>
              </div>
            </div>

            <button
              type="submit"
              className="text-base  w-full bg-primary bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary"
            >
              Sign in
            </button>
            <div className="my-4 flex items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </form>
          <div className="w-full flex flex-col gap-4">
            <button
              type="button"
              className="text-base  w-full border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <Image
                className="mr-2"
                src="/google_logo.png"
                alt="Google Logo"
                width={18}
                height={18}
              />
              Sign in with Google
            </button>
            <button
              type="button"
              className="text-base w-full border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <Image
                className="mr-2"
                src="/Microsoft_icon.png"
                alt="Microsoft Logo"
                width={18}
                height={18}
              />
              Sign in with Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="text-left sm:text-center md:text-right lg:text-justify">
    //   Responsive Alignment
    // </div>
  );
}
