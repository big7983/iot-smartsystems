import React, { useState } from "react";
import toast from "react-hot-toast";
import Popuproomlog from "@/components/Popuproomlog";

interface ManageroomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

const roomsData = [
  { id: 1, Room_ID: "B316", room_status: false },
  { id: 2, Room_ID: "B317", room_status: true },
];

export default function Manageroom({
  selectbuilding,
  searchQuery,
}: ManageroomProps) {
  const [rooms] = useState(roomsData);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [chooseroom, setChooseroom] = useState<string>("");

  const handleOpenPopup = (chooseroom: string) => {
    setChooseroom(chooseroom); // เก็บ id ของนักเรียนที่ต้องการแสดงใน Popup
    setIsPopupOpen(true); // เปิดป๊อปอัพ
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // ปิดป๊อปอัพ
  };

  const handleRoomAction = () => {
    toast.success("เปิดห้องสำเร็จ!!!");
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesBuilding =
      selectbuilding === "All" || room.Room_ID.charAt(0) === selectbuilding;
    const matchesSearch = room.Room_ID.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    return matchesBuilding && matchesSearch;
  });

  // <FaLock color="#D34053" size={24}/> ไอคอนล็อก
  // <FaLockOpen color="#219653" size={24}/> ไอคอนอันล็อก
  // <TbDeviceImacOff color="#D34053" size={26} /> อุปกรณ์ไม่เชื่อมต่อ
  // <TbDeviceImacCheck color="#219653" size={26} /> อุปกรณ์เชื่อมต่อ

  // return (
  //   <>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
  //       {filteredRooms.length > 0 ? (
  //         filteredRooms.map((room) => (
  //           <div
  //             key={room.id}
  //             className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5"
  //           >
  //             <div className="flex justify-between items-center">
  //               <span className="text-base">{room.id}</span>
  //               <div className="flex flex-row justify-between items-center gap-2">
  //                 {room.isOpen && room.deviceStatus === "online" ? (
  //                   <FaLockOpen color="#219653" size={24} />
  //                 ) : !room.isOpen ? (
  //                   <FaLock color="#D34053" size={24} />
  //                 ) : (
  //                   <IoIosWarning color="#FFA70B" size={24} />
  //                 )}
  //                 {room.deviceStatus === "online" ? (
  //                   <TbDeviceImacCheck color="#219653" size={26} />
  //                 ) : room.deviceStatus === "offline" ? (
  //                   <TbDeviceImacOff color="#D34053" size={26} />
  //                 ) : (
  //                   <TbDeviceImacExclamation color="#FFA70B" size={26} />
  //                 )}
  //               </div>
  //               <div className="flex flex-row justify-between items-center gap-2">
  //                 <button
  //                   disabled={!(room.isOpen && room.deviceStatus === "online")}
  //                   onClick={() => handleOpenPopup("A100")}
  //                   className={`px-4 py-2 rounded-2xl text-white text-sm ${
  //                     room.deviceStatus === "offline" ||
  //                     room.deviceStatus === "warning"
  //                       ? "bg-gray-300 cursor-not-allowed"
  //                       : room.isOpen
  //                       ? "bg-warning hover:shadow-xl hover:border-gray-300 hover:bg-yellow-900 transition-all"
  //                       : "bg-gray-300 cursor-not-allowed"
  //                   } `}
  //                 >
  //                   รายชื่อ
  //                 </button>
  //                 <button
  //                   disabled={
  //                     room.deviceStatus === "offline" ||
  //                     room.deviceStatus === "warning"
  //                   }
  //                   onClick={() => handleRoomAction(room.id)}
  //                   className={`px-4 py-2 rounded-2xl text-white text-sm ${
  //                     room.deviceStatus === "offline" ||
  //                     room.deviceStatus === "warning"
  //                       ? "bg-gray-300 cursor-not-allowed"
  //                       : room.isOpen
  //                       ? "bg-danger hover:shadow-xl hover:border-gray-300 hover:bg-red-900 transition-all"
  //                       : "bg-success hover:shadow-xl hover:border-gray-300 hover:bg-green-900 transition-all"
  //                   } `}
  //                 >
  //                   {room.isOpen ? "ปิดห้อง" : "เปิดห้อง"}
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <p className="text-center col-span-3">ไม่พบข้อมูลห้อง</p>
  //       )}
  //     </div>

  //     {isPopupOpen && (
  //       <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
  //         <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-3 sm:mx-0">
  //           <h2 className="text-lg font-bold mb-4">
  //             รายชื่อในห้อง {selectedRoom}
  //           </h2>
  //           <ul>
  //             {students.map((student) => (
  //               <li key={student.id} className="border-b py-2">
  //                 {student.id} {student.name}
  //               </li>
  //             ))}
  //           </ul>
  //           <button
  //             onClick={() => setIsPopupOpen(false)}
  //             className="px-4 py-2 rounded-2xl text-white text-sm bg-gray-500 mt-5"
  //           >
  //             ปิด
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

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
                {/* <div className="flex flex-row justify-between items-center gap-2">
                  {room.room_status === true ? (
                    <FaLockOpen color="#219653" size={20} />
                  ) : !room.room_status ? (
                    <FaLock color="#D34053" size={20} />
                  ) : (
                    <IoIosWarning color="#FFA70B" size={20} />
                  )}
                </div> */}
                <div className="flex flex-row justify-between items-center gap-2">
                  <button
                    disabled={room.room_status || false}
                    onClick={() => handleOpenPopup(room.Room_ID)}
                    className={`px-3 py-2 rounded-2xl text-white font text-sm 
                      bg-primary hover:shadow-xl hover:border-gray-300 hover:bg-secondary disabled:bg-slate-500 transition-all
                     `}
                  >
                    รายชื่อ
                  </button>
                  <button
                    disabled={room.room_status || false}
                    onClick={() => handleRoomAction()}
                    className={`px-3 py-2 rounded-2xl text-white font text-sm ${"bg-success hover:shadow-xl hover:border-gray-300 hover:bg-green-900 disabled:bg-slate-500 transition-all"} `}
                  >
                    เปิดห้อง
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
        <Popuproomlog chooseroom={chooseroom} onClose={handleClosePopup} />
      )}
    </>
  );
}
