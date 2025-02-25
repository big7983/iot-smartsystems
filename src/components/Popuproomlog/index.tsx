"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

interface PopupusermanageProps {
  chooseroom: string;
  onClose: () => void;
}

// const mockDataadmin = [
//   {
//     id: 1,
//     idstu: 64200255,
//     name: "สมชาย แสนสุข",
//     room: "A101",
//     time_enter: "2025-01-01T08:00:00",
//   },
//   {
//     id: 2,
//     idstu: 64200255,
//     name: "สมหญิง แสนสวย",
//     room: "B316",
//     time_enter: "2025-01-02T08:00:00",
//   },
//   {
//     id: 3,
//     idstu: 64200123,
//     name: "เจริญ มีโชค",
//     room: "C103",
//     time_enter: "2025-01-03T08:00:00",
//   },
//   {
//     id: 4,
//     idstu: 64200125,
//     name: "มานะ ภักดี",
//     room: "D104",
//     time_enter: "2025-01-04T08:00:00",
//   },
//   {
//     id: 5,
//     idstu: 64200112,
//     name: "สมปอง พอเพียง",
//     room: "E105",
//     time_enter: "2025-01-05T08:00:00",
//   },
// ];

export default function Index({ chooseroom, onClose }: PopupusermanageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [roomLogs, setRoomLogs] = useState([]);

  const columnsadmin: GridColDef[] = [
    { field: "code", headerName: "รหัสนักศึกษา", width: 120 },
    {
      field: "firstname",
      headerName: "ชื่อ",
      width: 200,
      sortable: true,
    },
    {
      field: "lastname",
      headerName: "นามสกุล",
      width: 200,
      sortable: true,
    },
    { field: "room", headerName: "ห้อง", width: 100, sortable: true },
    {
      field: "time_enter",
      headerName: "วันเวลาเข้า",
      width: 300,
      sortable: true,
    },
  ];

  const filteredData = (data: any[]) => {
    return data.filter((item) => {
      const dateMatch =
        !selectedDate ||
        new Date(item.dateenter).toLocaleDateString() ===
          selectedDate.toLocaleDateString() ||
        new Date(item.dateleave).toLocaleDateString() ===
          selectedDate.toLocaleDateString();
      const textMatch =
        item.firstname?.toLowerCase().includes(searchText) ||
        item.lastname?.toLowerCase().includes(searchText) ||
        item.code?.toString().includes(searchText);
      const roomMatch =
        !chooseroom || item.room?.toLowerCase() === chooseroom.toLowerCase(); // ใช้ค่า room จาก props

      return dateMatch && textMatch && roomMatch;
      
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchRoomLogs = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/room-log`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoomLogs(response.data);
        console.log("log : ", response.data);
      } catch (error) {
        console.error("Error fetching room logs:", error);
      } 
    };
  console.log(chooseroom);
    fetchRoomLogs();
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white rounded pt-5 mx-3 mt-14 shadow-lg max-w-[1200px] w-full h-screen max-h-[75vh] overflow-y-auto">
        <div className="flex justify-center w-full ">
          <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-primary text-xl font-semibold mt-5 sm:mt-1">
                ประวัติเข้าออกห้องเรียน
              </h3>
              <button onClick={onClose}>
                <MdOutlineCancel size={32} color="gray" />
              </button>
            </div>

            <div className=" flex flex-col sm:flex-row justify-between gap-5 ">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="เลือกวันที่"
                className="w-full sm:max-w-[200px] border border-gray-200 shadow rounded-2xl px-5 py-2 outline-none focus:shadow-xl focus:border-gray-300 "
              />
              <input
                type="text"
                placeholder="ค้นหา"
                value={searchText}
                onChange={handleSearch}
                className="w-full sm:max-w-[350px] border border-gray-200 shadow rounded-2xl bg-white px-5 py-2 outline-none   focus:shadow-xl focus:border-gray-300  disabled:cursor-default"
              />
            </div>
            <DataGrid
              rows={filteredData(roomLogs)}
              columns={columnsadmin}
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
      </div>
    </div>
  );
}
//filteredData(roomLogs)