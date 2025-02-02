import React from "react";

interface RoomProps {
  selectbuilding: string;
  selectedOption: string;
  searchQuery: string;
}

const roomsData = [
  { id: "A100",  status: "available" },
  { id: "A200",  status: "notavailable" },
  { id: "B101",  status: "available" },
  { id: "C201",  status: "notavailable" },
  { id: "D301",  status: "available" },
];

export default function Room({ selectbuilding, selectedOption, searchQuery }: RoomProps) {

  const filteredRooms = roomsData.filter((room) => {
    const matchesBuilding = selectbuilding === "All" || room.id.charAt(0) === selectbuilding   ;
    const matchesStatus = selectedOption === "" || room.status === selectedOption;
    const matchesSearch = room.id.toLowerCase().includes(searchQuery.toLowerCase());
    console.log("tt",room.id.charAt(0));
    return matchesBuilding && matchesStatus && matchesSearch;
    
  });

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 ">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
        <div key={room.id} className="w-full shadow-xl rounded-2xl border border-gray-100 bg-white p-5">
          <div className=" flex justify-between">
            <span className="text-base">{room.id}</span>
            <div className="flex flex-row justify-between items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${room.status === "available" ? "bg-success" : "bg-danger"}`}></span>
              <span className="text-sm">{room.status === "available" ? "ว่าง" : "กำลังใช้งาน"}</span>
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
