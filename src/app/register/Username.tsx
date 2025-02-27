import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Username({ setTokenuser }: any) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [c , setC] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = async () => {
    const { username, password, confirmPassword } = formData;

    if (!username || !password || !confirmPassword) {
      toast.error(`กรอกข้อมูลให้ครบถ้วน`);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(`รหัสผ่านไม่ตรงกัน`);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          username,
          password
        }
      );

      console.log(response);

      toast.success("สมัครสมาชิกสำเร็จ!");
      setTokenuser(response.data.access_token);
      setC(true)

    } catch (error: any) {
      console.log(
        `เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`
      );
      toast.error(`เกิดข้อผิดพลาด : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">
      <h4 className="text-lg font-semibold text-primary text-left">
        ข้อมูลบัญชีผู้ใช้
      </h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 items-center">
        <div>
          <label className="text-sm text-black block mb-1">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={c}
            placeholder="ชื่อผู้ใช้"
            className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="text-sm text-black block mb-1">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            disabled={c}
            placeholder="รหัสผ่าน"
            className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="text-sm text-black block mb-1">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            type="password"
            disabled={c}
            placeholder="ยืนยันรหัสผ่าน"
            className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
          />
        </div>
      </div>
      <div className="flex justify-between gap-28 mt-7">
        <button
          onClick={() => router.back()}
          className="w-full py-3  rounded-xl bg-gray-300 text-black hover:bg-gray-400"
        >
          ย้อนกลับ
        </button>
        <button
          disabled={c}
          onClick={handleCheck}
          className="w-full py-3  rounded-xl bg-primary text-white hover:bg-secondary disabled:bg-gray-300"
        >
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
}
