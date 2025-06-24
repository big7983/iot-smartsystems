import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "react-datepicker/dist/react-datepicker.css";

interface RoomProps {
  selectbuilding: string;
  selectedDate: Date | null;
  searchQuery: string;
}

interface Room {
  id: string;
  entry_time: string;
  room_id: string;
  entry_method: string
}

const mockData = [
  {
    id: "1",
    room_id: "A101",
    entry_time: "2025-01-01T08:00:00",
    entry_method: "Beacon",
  },
  {
    id: "2",
    room_id: "B102",
    entry_time: "2025-01-02T09:15:00",
    entry_method: "NFC",
  },
  {
    id: "3",
    room_id: "C103",
    entry_time: "2025-01-03T10:30:00",
    entry_method: "Beacon",
  },
  {
    id: "4",
    room_id: "D104",
    entry_time: "2025-01-04T11:45:00",
    entry_method: "NFC",
  },
  {
    id: "5",
    room_id: "E105",
    entry_time: "2025-01-05T13:00:00",
    entry_method: "Beacon",
  },
];

export default function Room({
  selectbuilding,
  selectedDate,
  searchQuery,
}: RoomProps) {
const [rooms] = useState<Room[]>(mockData);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid Date"; // กัน Error ถ้าค่าไม่ถูกต้อง

    return date
      .toLocaleString("en-EN", {
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
          new Date(room.entry_time).toLocaleDateString("en-CA") ===
            new Date(selectedDate).toLocaleDateString("en-CA");

        const matchSearch = room.room_id
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchBuilding && dateMatch && matchSearch;
      })
    : [];

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <DataGrid
          rows={filteredRooms.map((row, index) => ({
            ...row,
            id: index, // ใช้ index เป็น id
          }))}
          columns={[
            {
              field: "room_id",
              headerName: "ห้อง",
              width: 100,
              sortable: true,
            },
            {
              field: "entry_time",
              headerName: "วันเวลาเข้า",
              width: 300,
              sortable: true,
              renderCell: (params: any) =>
                formatDateTime(params.row.entry_time),
            },
            {
              field: "entry_method",
              headerName: "Beacon/NFC",
              width: 100,
              sortable: true,
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
