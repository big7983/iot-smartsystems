import React, { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";

interface ManageroomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

const roomsData = [
  { id: "A100", isOpen: true, deviceStatus: "online" },
  { id: "A200", isOpen: false, deviceStatus: "offline" },
  { id: "B101", isOpen: true, deviceStatus: "warning" },
  { id: "C201", isOpen: true, deviceStatus: "warning" },
  { id: "D301", isOpen: false, deviceStatus: "offline" },
];

export default function Manageroom({
  selectbuilding,
  selectedOption,
  searchQuery,
}: ManageroomProps) {
  const [rooms, setRooms] = useState(roomsData);

  const handleRoomAction = (roomName: string) => {
    // ฟังก์ชันสำหรับจัดการเปิด/ปิดห้อง
    console.log(roomName);
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomName ? { ...room, isOpen: !room.isOpen } : room
      )
    );
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesBuilding =
      selectbuilding === "All" || room.id.charAt(0) === selectbuilding;
    const matchesStatus =
      selectedOption === "" ||
      (String(room.isOpen) === selectedOption &&
        room.deviceStatus != "warning");
    const matchesSearch = room.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesBuilding && matchesStatus && matchesSearch;
  });

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก
  // <TbDeviceImacOff color="#D34053" size={26} /> อุปกรณ์ไม่เชื่อมต่อ
  // <TbDeviceImacCheck color="#219653" size={26} /> อุปกรณ์เชื่อมต่อ

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room.id}
              className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex justify-between items-center">
                {/* <div className="flex flex-row justify-center items-center gap-7"> */}
                  <span className="text-base font-semibold">{room.id}</span>
                  <div className="flex flex-row justify-between items-center gap-2">
                    {room.isOpen && room.deviceStatus === "online" ? (
                      <FaLockOpen color="#219653" size={20} />
                    ) : !room.isOpen ? (
                      <FaLock color="#D34053" size={20} />
                    ) : (
                      <IoIosWarning color="#FFA70B" size={20} />
                    )}
                  {/* </div> */}
                </div>
                <div className="flex flex-row justify-between items-center gap-2">
                  <button
                    disabled={
                      room.deviceStatus === "offline" ||
                      room.deviceStatus === "warning"
                    }
                    onClick={() => handleRoomAction(room.id)}
                    className={`px-3 py-2 rounded-2xl text-white font text-[13px] sm:text-sm ${
                      room.deviceStatus === "offline" ||
                      room.deviceStatus === "warning"
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

    </>
  );
}
