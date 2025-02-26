//import axios from "axios";
import mqtt from "mqtt";
import React, {  useState } from "react";
import toast from "react-hot-toast";
import Popuproomlog from "@/components/Popuproomlog";

interface ManageroomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

const roomsData = [
  { id: 1,Room_ID: "B316", room_status: true },
  { id: 2,Room_ID: "B317", room_status: false },
];

export default function Manageroom({
  selectbuilding,
  selectedOption,
  searchQuery,
}: ManageroomProps) {
  //const [rooms, setRooms] = useState<Room[]>([]);
  const [rooms, setRooms] = useState(roomsData);
  const [loadingRooms, setLoadingRooms] = useState<Record<string, boolean>>({});

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [chooseroom, setChooseroom] = useState<string>("");

  const handleOpenPopup = (chooseroom: string) => {
    setChooseroom(chooseroom); // เก็บ id ของนักเรียนที่ต้องการแสดงใน Popup
    setIsPopupOpen(true); // เปิดป๊อปอัพ
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // ปิดป๊อปอัพ
  };

  const handleRoomAction = (roomName: string) => {
    setLoadingRooms((prev) => ({ ...prev, [roomName]: true }));

    const client = mqtt.connect("ws://192.168.70.8:9001/mqtt");
    const topic =
      roomName === "B316" ? "DoorIn1" : roomName === "B317" ? "DoorIn2" : "";

    const message = "pass";

    if (topic !== "") {
      console.log("🔁 Load");
      const publishMessage = new Promise((resolve, reject) => {
        client.on("connect", () => {
          client.publish(topic, message, {}, (err) => {
            if (!err) {
              console.log("✅ Message sent:", message);
              client.end(); // ปิดการเชื่อมต่อเมื่อส่งเสร็จ
              resolve("เปิดห้องสำเร็จ!!!");
              setLoadingRooms((prev) => ({ ...prev, [roomName]: false }));
            } else {
              console.error("❌ Publish error:", err);
              reject("เกิดข้อผิดพลาด");
            }
          });
        });

        client.on("error", (error) => {
          console.error("❌ Connection error:", error);
          reject("เชื่อมต่อไม่สำเร็จ");
        });
      });

      toast
        .promise(publishMessage, {
          loading: "กำลังส่งข้อมูล...",
          success: "เปิดห้องสำเร็จ!!!",
          error: "เกิดข้อผิดพลาด",
        })
        .finally(() => {
          setLoadingRooms((prev) => ({ ...prev, [roomName]: false })); // ปลดล็อกปุ่ม
        });
    } else {
      toast.error("เชื่อมต่อไม่สำเร็จ"); // แสดง error แทน reject
      setLoadingRooms((prev) => ({ ...prev, [roomName]: false })); // ปลดล็อกปุ่ม
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

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/room-status`,
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       //setRooms(response.data);
  //       console.log(" res ", response.data);
  //     } catch (error) {
  //       console.log("Fetch error:", error);
  //     }
  //   };

  //   // เรียกฟังก์ชัน async ข้างใน useEffect
  //   fetchData();
  // }, []); // ✅ ใช้ dependency array ว่าง

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
                    onClick={() => handleOpenPopup(room.Room_ID)}
                    className={`px-3 py-2 rounded-2xl text-white font text-sm 
                      bg-primary hover:shadow-xl hover:border-gray-300 hover:bg-secondary transition-all
                     `}
                  >
                    รายชื่อ
                  </button>
                  <button
                    disabled={loadingRooms[room.Room_ID] || false}
                    onClick={() =>
                      handleRoomAction(room.Room_ID)
                    }
                    className={`px-3 py-2 rounded-2xl text-white font text-sm ${"bg-success hover:shadow-xl hover:border-gray-300 hover:bg-green-900 disabled:bg-slate-500 transition-all"} `}
                  >
                    {loadingRooms[room.Room_ID] ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                    ) : (
                      "เปิดห้อง"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">ไม่พบข้อมูลห้อง</p>
        )}
      </div>
      {isPopupOpen && <Popuproomlog chooseroom={chooseroom} onClose={handleClosePopup} />}
    </>
  );
}
