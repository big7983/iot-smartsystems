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

  const apipath = "";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/proxy",
          {
            token,
            apipath,
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
