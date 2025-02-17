"use client";

import { useState } from "react";
import axios from "axios";
import { verifyToken } from "@/lib/jwt";
import jwt from "jsonwebtoken";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [encode, setEncode] = useState<any>();


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      setJwtToken(response.data.access_token);
      console.log("Jwt : ", response.data.access_token);

      //const payload = await verifyToken(response.data.access_token)
      const payload = jwt.decode(response.data.access_token);


      setEncode(payload);
      console.log("verifyToken : ", payload);
    } catch (error) {
      console.error("Login Failed", error);
      setJwtToken("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-orange text-white py-2 rounded-md hover:bg-orange-600 transition"
        >
          Login
        </button>
        {jwtToken && (
          <div className="mt-4 p-2 bg-gray-200 rounded-md break-all">
            <strong>JWT Token:</strong> {jwtToken}
          </div>
        )}
        {encode && (
          <div className="mt-4 p-2 bg-gray-200 rounded-md break-all">
            <strong>encode :</strong> {JSON.stringify(encode)}
          </div>
        )}
      </div>
    </div>
  );
}
