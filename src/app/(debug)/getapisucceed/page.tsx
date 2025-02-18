// src/app/(debug)/getapi/page.tsx

import React from "react";

interface UserInfo {
  username: string;
  role: string;
}

const Home = async () => {
    
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpZzc5ODMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk4MTcxMjIsImV4cCI6MTczOTgyMDcyMn0.fkIa578dD7HAcLuqlEq0AvsVEqgvKyWoszZ2Qq3jewE";
    // เรียก API ภายนอกในฝั่งเซิร์ฟเวอร์
    const response = await fetch(
      "https://grand-readily-werewolf.ngrok-free.app/api/user_info",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    // Render ข้อมูลที่ได้รับจาก API
    return (
      <div>
        {data && (
          <div className="mt-4 p-2 bg-gray-200 rounded-md break-all">
            <strong>encode :</strong> {JSON.stringify(data)}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching user info:", error);
    return <div>Error loading data</div>;
  }
};

export default Home;
