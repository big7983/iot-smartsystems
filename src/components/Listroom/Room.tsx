import axios from "axios";
import React, { useEffect, useState } from "react";

interface RoomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

interface Room {
  id: string;
  room_status: boolean;
  Room_ID: string;
}

export default function Room({ selectbuilding, selectedOption, searchQuery }: RoomProps) {
  const [rooms, setRooms] = useState<Room[]>([]);


  const filteredRooms = rooms.filter((room) => {
    const matchesBuilding =
      selectbuilding === "All" || room.Room_ID.charAt(0) === selectbuilding;
    const matchesSearch = room.Room_ID.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesStatus =
      selectedOption === "" ||
      (selectedOption === "true" && room.room_status) ||
      (selectedOption === "false" && !room.room_status);

    return matchesBuilding && matchesStatus && matchesSearch;
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/room-status`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data);
        console.log(" res ", response.data);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    // เรียกฟังก์ชัน async ข้างใน useEffect
    fetchData();
  }, []); // ✅ ใช้ dependency array ว่าง

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 ">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room , index) => (
        <div key={index} className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
          <div className=" flex justify-between">
            <span className="text-base">{room.Room_ID}</span>
            <div className="flex flex-row justify-between items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${room.room_status  ? "bg-success" : "bg-danger"}`}></span>
              <span className="text-sm">{room.room_status ? "เปิดใช้งาน" : "ปิดใช้งาน"}</span>
            </div>
          </div>
        
      </div>
       ))
      ) : (
        <p className="text-center col-span-3">ไม่พบข้อมูลห้อง</p>
      )}
    </div>
  );
}
