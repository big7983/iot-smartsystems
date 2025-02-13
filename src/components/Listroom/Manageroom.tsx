import React, { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import {
  TbDeviceImacOff,
  TbDeviceImacExclamation,
  TbDeviceImacCheck,
} from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";

interface ManageroomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

interface Student {
  id: string;
  name: string;
}

const roomsData = [
  { id: "A100",  isOpen: true, deviceStatus: "online" },
  { id: "A200",  isOpen: false, deviceStatus: "offline" },
  { id: "B101",  isOpen: true, deviceStatus: "warning" },
  { id: "C201",  isOpen: true, deviceStatus: "warning" },
  { id: "D301",  isOpen: false, deviceStatus: "offline" },
];

export default function Manageroom({
  selectbuilding,
  selectedOption,
  searchQuery,
}: ManageroomProps) {
  const [rooms, setRooms] = useState(roomsData);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);

  const handleOpenPopup = (room: string) => {
    setSelectedRoom(room);
    setIsPopupOpen(true);
    // **ตัวอย่างข้อมูลนักศึกษาในห้อง**
    setStudents([
      { id: "63001", name: "สมชาย ใจดี" },
      { id: "63002", name: "สมหญิง แสนดี" },
    ]);
  };

  const handleRoomAction = (roomName: string) => {
    // ฟังก์ชันสำหรับจัดการเปิด/ปิดห้อง
    console.log(roomName)
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomName ? { ...room, isOpen: !room.isOpen } : room
      )
    );
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesBuilding = selectbuilding === "All" || room.id.charAt(0) === selectbuilding   ;
    const matchesStatus = selectedOption === "" || ((String(room.isOpen) === selectedOption) && room.deviceStatus != "warning");
    const matchesSearch = room.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBuilding && matchesStatus && matchesSearch;
  });

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก
  // <TbDeviceImacOff color="#D34053" size={26} /> อุปกรณ์ไม่เชื่อมต่อ
  // <TbDeviceImacCheck color="#219653" size={26} /> อุปกรณ์เชื่อมต่อ

  return (
    <>
      <div className="bg-white grid grid-cols-1 sm:grid-cols-2 gap-5">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div
            key={room.id}
            className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="flex justify-between items-center">
              <span className="text-base">{room.id}</span>
              <div className="flex flex-row justify-between items-center gap-2">
                {room.isOpen && room.deviceStatus === "online"  ? (
                  <FaLockOpen color="#219653" size={24} />
                ) : !room.isOpen ? (
                  <FaLock color="#D34053" size={24} />
                ) : (
                  <IoIosWarning color="#FFA70B" size={24} />
                )}
                {room.deviceStatus === "online" ? (
                  <TbDeviceImacCheck color="#219653" size={26} />
                ) : room.deviceStatus === "offline" ? (
                  <TbDeviceImacOff color="#D34053" size={26} />
                ) : (
                  <TbDeviceImacExclamation color="#FFA70B" size={26} />
                )}
              </div>
              <div className="flex flex-row justify-between items-center gap-2">
                <button
                  disabled={!((room.isOpen) && (room.deviceStatus === "online"))}
                  onClick={() => handleOpenPopup("A100")}
                  className={`px-4 py-2 rounded-2xl text-white text-sm ${
                    room.deviceStatus === "offline" || room.deviceStatus === "warning"
                      ? "bg-gray-300 cursor-not-allowed"
                      : room.isOpen
                      ? "bg-warning hover:shadow-xl hover:border-gray-300 hover:bg-yellow-900 transition-all"
                      : "bg-gray-300 cursor-not-allowed"
                  } `}
                >
                  รายชื่อ
                </button>
                <button
                  disabled={ (room.deviceStatus === "offline" || room.deviceStatus === "warning") }
                  onClick={() => handleRoomAction(room.id)}
                  className={`px-4 py-2 rounded-2xl text-white text-sm ${
                    room.deviceStatus === "offline" || room.deviceStatus === "warning"
                      ? "bg-gray-300 cursor-not-allowed"
                      : room.isOpen
                      ? "bg-danger hover:shadow-xl hover:border-gray-300 hover:bg-red-900 transition-all"
                      : "bg-success hover:shadow-xl hover:border-gray-300 hover:bg-green-900 transition-all"
                  } `}
                >
                  {room.isOpen ? "ปิดห้อง" : "เปิดห้อง"}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-3">ไม่พบข้อมูลห้อง</p>
      )}
    </div>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-3 sm:mx-0">
            <h2 className="text-lg font-bold mb-4">
              รายชื่อในห้อง {selectedRoom}
            </h2>
            <ul>
              {students.map((student) => (
                <li key={student.id} className="border-b py-2">
                  {student.id} {student.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="px-4 py-2 rounded-2xl text-white text-sm bg-gray-500 mt-5"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </>
  );
}
