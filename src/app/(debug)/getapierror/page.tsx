// src/app/(debug)/getapi/page.tsx

"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserInfo {
  username: string;
  role: string;
}

const Home = () => {
  const [data, setData] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://grand-readily-werewolf.ngrok-free.app/api/user_info', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpZzc5ODMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk4NDA1NjMsImV4cCI6MTczOTg0NDE2M30.vpe7mAcHXaypuvC2sj1NQos9Aj2KAoTnJQf0jDaNMS8',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Error loading data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {data && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md break-all">
          <strong>encode :</strong> {JSON.stringify(data)}
        </div>
      )}
    </div>
  );
};

export default Home;
