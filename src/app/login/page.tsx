"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

// const mockUsers = [
//   { email: "user@user.com", password: "123456", role: 2 },
//   { email: "admin@admin.com", password: "123456", role: 1 },
// ];

export default function Page() {
  const [username, setUsername] = useState("big7983");
  const [password, setPassword] = useState("big7983");
  const [jwtToken, setJwtToken] = useState("");
  const [encode, setEncode] = useState<any>();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );
      sessionStorage.setItem("token", response.data.access_token);
      Cookies.set("Login", "1");
      alert("Login successful!");
      router.push("/");       
    } catch (error) {
      console.error("Login Failed", error);
      alert("An error occurred");
    }
  };



  return (
    <div className="bg-white rounded-2xl shadow-lg  w-full px-5 py-8 sm:p-8 max-w-[395px] mx-5 sm:mx-0">
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
              className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2 py-[6.5px] pl-5"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
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
        <Link
          className="w-full text-base bg-primary bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary"
          href="/register"
        >
          <button className="w-full text-center">Register</button>
        </Link>
      </div>
    </div>
  );
}
