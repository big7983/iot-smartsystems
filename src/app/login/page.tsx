"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { generateToken } from "@/lib/jwt";
import { toast, Toaster } from "react-hot-toast";

const mockUsers = [
  { email: "user@user.com", password: "123456", role: 2 },
  { email: "admin@admin.com", password: "123456", role: 1 },
  { email: "big7983", password: "big7983", role: 1 },
];

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("ชื่อหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
      return;
    }

    try {
      // ✅ ใช้ await เพื่อรอให้ token ถูกสร้างก่อนใช้งาน
      const token = await generateToken({ email: user.email, role: user.role });

      // ✅ ตรวจสอบว่ามี token ก่อนบันทึกลง Cookies
      if (token) {
        Cookies.set("token", token);
        toast.success("Login successful!");
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
    <div className="bg-white rounded-2xl shadow-lg  w-full px-5 py-8 sm:p-8 max-w-[395px] mx-5 sm:mx-0">
      <Toaster position="bottom-left" reverseOrder={false} />
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
            <label className="block text-base font-bold text-primary ">
              Username
            </label>
            <input
              className="mt-1 block w-full rounded-md  border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-500 border-2 py-[6.5px] pl-5"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Username"
              required
              disabled={loading}
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
                className=" mt-1 block w-full rounded-md disabled:bg-gray-200 disabled:text-gray-500 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2 py-[6.5px] pl-5"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              ></button>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="text-base mt-7 my-10 w-full flex justify-center items-center bg-primary bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary disabled:bg-slate-400"
          >
            {loading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
