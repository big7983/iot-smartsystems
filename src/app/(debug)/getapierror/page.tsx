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
        // const response = await axios.get('http://26.251.91.175:3000/api/user_info', {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpZzc5ODMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk4NjgzOTEsImV4cCI6MTczOTg3MTk5MX0.LERSPZe392SwTw-67yCXxB7vL-8IlrlS2MCKkER-Xy8',
        //   },
        // });
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user_info`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
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
