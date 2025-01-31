import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg  w-full px-5 py-8 sm:p-8 max-w-[280px] sm:max-w-[400px] ">
        <div className="flex flex-col items-center">
          <Image
            className="mb-5 w-52 sm:w-64 "
            src="\CE logo black no bg.png"
            alt="KMITL Computer Engineering"
          />
          <form className="w-full">
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
                  id="password"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                ></button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span className="ml-2 ">Remember me</span>
              </label>
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
              src="/google logo.png"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          <button
            type="button"
            className="text-base w-full border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <Image
              src="/Microsoft_icon.svg.png"
              alt="Microsoft Logo"
              className="w-5 h-5 mr-2"
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
