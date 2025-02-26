import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "react-datepicker/dist/react-datepicker.css";

interface RoomProps {
  selectbuilding: string;
  selectedDate: Date | null;
  searchQuery: string;
}

interface Room {
  id: string;
  timestamp: Date;
  room_id: string;
  student_id: string;
  building: string;
}

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
  const [student_id, setStudent_id] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const responsecode = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user_info/profile`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudent_id(responsecode.data.student_id);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/nfc-log`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data);
        console.log(" res ", response.data);
        console.log(responsecode.data.student_id);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    // เรียกฟังก์ชัน async ข้างใน useEffect
    fetchData();
  }, []); // ✅ ใช้ dependency array ว่าง

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid Date"; // กัน Error ถ้าค่าไม่ถูกต้อง

    return date
      .toLocaleString("th-TH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", ""); // เอา `,` ออก
  };

  const filteredRooms = Array.isArray(rooms)
    ? rooms.filter((room) => {
        const matchBuilding =
          selectbuilding === "All" || room.room_id.charAt(0) === selectbuilding;

        const dateMatch =
          !selectedDate ||
          new Date(room.timestamp).toLocaleDateString("en-CA") ===
            new Date(selectedDate).toLocaleDateString("en-CA");

        const matchSearch = room.room_id
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchUser = room.student_id == student_id;

        return matchBuilding && dateMatch && matchSearch && matchUser;
      })
    : [];



  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <DataGrid
          rows={filteredRooms}
          columns={[
            {
              field: "room_id",
              headerName: "ห้อง",
              width: 100,
              sortable: true,
            },
            {
              field: "timestamp",
              headerName: "วันเวลาเข้า",
              width: 300,
              sortable: true,
              renderCell: (params: any) => formatDateTime(params.row.timestamp),
            },
          ]}
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
