"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RealtimeData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://678909dd2c874e66b7d75b1b.mockapi.io/users');
        setData(response.data);
      } catch (error) {
        setError("error");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // ดึงข้อมูลใหม่ทุกๆ 3 วินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;
  if (!data) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div>
      <h1>ข้อมูลแบบเรียลไทม์</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
