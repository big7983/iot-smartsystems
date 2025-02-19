import axios from "axios";
import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";

interface ManageroomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

interface Room {
  id: string;
  room_status: boolean;
  Room_ID: string;
}
// const roomsData = [
//   { id: "B316", room_staus: true },
//   { id: "B317", room_staus: false },
//   { id: "A101", room_staus: true },
//   { id: "B201", room_staus: true },
//   { id: "C301", room_staus: false },
//   { id: "D301", room_staus: false },
//   { id: "E113", room_staus: false },
// ];

export default function Manageroom({
  selectbuilding,
  selectedOption,
  searchQuery,
}: ManageroomProps) {
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleRoomAction = (roomName: string, roomStatus: boolean) => {
    // ฟังก์ชันสำหรับจัดการเปิด/ปิดห้อง

    //const client = mqtt.connect("ws://192.168.70.8:9001/mqtt");
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    const topic =
      roomName === "B316" ? "DoorIn1" : roomName === "B317" ? "DoorIn2" : "";

    const message = roomStatus ? "notpass" : "pass";

    if (topic != "") {
      console.log("🔁 Load ");
      client.on("connect", () => {
        client.publish(topic, message, {}, (err) => {
          if (!err) {
            console.log("✅ Message sent:", message);
          } else {
            console.error("❌ Publish error:", err);
          }
          client.end(); // ปิดการเชื่อมต่อเมื่อส่งเสร็จ
        });
      });
    }

    console.log(roomName);
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.Room_ID === roomName
          ? { ...room, room_status: !room.room_status }
          : room
      )
    );
  };

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

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, index) => (
            <div
              key={index}
              className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white px-7 py-5"
            >
              <div className="flex justify-between items-center">
                {/* <div className="flex flex-row justify-center items-center gap-7"> */}
                <span className="text-base font-semibold">{room.Room_ID}</span>
                <div className="flex flex-row justify-between items-center gap-2">
                  {room.room_status === true ? (
                    <FaLockOpen color="#219653" size={20} />
                  ) : !room.room_status ? (
                    <FaLock color="#D34053" size={20} />
                  ) : (
                    <IoIosWarning color="#FFA70B" size={20} />
                  )}
                  {/* </div> */}
                </div>
                <div className="flex flex-row justify-between items-center gap-2">
                  <button
                    onClick={() =>
                      handleRoomAction(room.Room_ID, room.room_status)
                    }
                    className={`px-3 py-2 rounded-2xl text-white font text-sm ${
                      room.room_status
                        ? "bg-danger hover:shadow-xl hover:border-gray-300 hover:bg-red-900 transition-all"
                        : "bg-success hover:shadow-xl hover:border-gray-300 hover:bg-green-900 transition-all"
                    } `}
                  >
                    {room.room_status ? "ปิดห้อง" : "เปิดห้อง"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">ไม่พบข้อมูลห้อง</p>
        )}
      </div>
    </>
  );
}
