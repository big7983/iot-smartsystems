import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "react-datepicker/dist/react-datepicker.css";

interface RoomProps {
  selectbuilding: string;
  selectedDate: Date | null;  
  searchQuery: string;
}

interface Room {
  id: string;
  time_enter: Date;
  room: string;
  building: string;
}

const columnsuser: GridColDef[] = [
  { field: "room", headerName: "ห้อง", width: 100, sortable: true },
  {
    field: "time_enter",
    headerName: "วันเวลาเข้า",
    width: 300,
    sortable: true,
  },
];

// const mockDatauser = [
//   {
//     id: 1,
//     room: "A101",
//     time_enter: "2025-01-01T08:00:00",
//   },
//   {
//     id: 2,
//     room: "B102",
//     time_enter: "2025-01-02T08:00:00",
//   },
//   {
//     id: 3,
//     room: "C103",
//     time_enter: "2025-01-03T08:00:00",
//   },
//   {
//     id: 4,
//     room: "D104",
//     time_enter: "2025-01-04T08:00:00",
//   },
//   {
//     id: 5,
//     room: "E105",
//     time_enter: "2025-01-05T08:00:00",
//   },
// ];

export default function Room({
  selectbuilding,
  selectedDate,
  searchQuery,
}: RoomProps) {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/room-log/${"64200058"}`,
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

  const filteredRooms = rooms.filter((room) => {
    const matchBuilding =
      selectbuilding === "All" || room.room.charAt(0) === selectbuilding;

    const dateMatch =
      !selectedDate ||
      new Date(room.time_enter).toLocaleDateString("en-CA") ===
        new Date(selectedDate).toLocaleDateString("en-CA"); // แปลงทั้งสองเป็น Date object

    const matchSearch = room.room
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchBuilding && dateMatch && matchSearch;
  });

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <DataGrid
          rows={filteredRooms}
          columns={columnsuser}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          sx={{
            background: "#FFF",
          }}
        />
      </div>
    </div>
  );
}
