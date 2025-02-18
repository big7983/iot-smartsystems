"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";

const mockDataadmin = [
  {
    id: 1,
    idstu: 64200255,
    name: "สมชาย แสนสุข",
    room: "A101",
    dateenter: "2025-01-01T08:00:00",
    dateleave: "2025-01-01T17:00:00",
  },
  {
    id: 2,
    idstu: 64200255,
    name: "สมหญิง แสนสวย",
    room: "B102",
    dateenter: "2025-01-02T08:00:00",
    dateleave: "2025-01-02T17:00:00",
  },
  {
    id: 3,
    idstu: 64200123,
    name: "เจริญ มีโชค",
    room: "C103",
    dateenter: "2025-01-03T08:00:00",
    dateleave: "2025-01-03T17:00:00",
  },
  {
    id: 4,
    idstu: 64200125,
    name: "มานะ ภักดี",
    room: "D104",
    dateenter: "2025-01-04T08:00:00",
    dateleave: "2025-01-04T17:00:00",
  },
  {
    id: 5,
    idstu: 64200112,
    name: "สมปอง พอเพียง",
    room: "E105",
    dateenter: "2025-01-05T08:00:00",
    dateleave: "2025-01-05T17:00:00",
  },
];

const mockDatauser = [
  {
    id: 1,
    room: "A101",
    dateenter: "2025-01-01T08:00:00",
    dateleave: "2025-01-01T17:00:00",
  },
  {
    id: 2,
    room: "B102",
    dateenter: "2025-01-02T08:00:00",
    dateleave: "2025-01-02T17:00:00",
  },
  {
    id: 3,
    room: "C103",
    dateenter: "2025-01-03T08:00:00",
    dateleave: "2025-01-03T17:00:00",
  },
  {
    id: 4,
    room: "D104",
    dateenter: "2025-01-04T08:00:00",
    dateleave: "2025-01-04T17:00:00",
  },
  {
    id: 5,
    room: "E105",
    dateenter: "2025-01-05T08:00:00",
    dateleave: "2025-01-05T17:00:00",
  },
];

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [role, setRole] = useState<any>(1);

  const columnsadmin: GridColDef[] = [
    { field: "idstu", headerName: "รหัสนักศึกษา", width: 120 },
    {
      field: "name",
      headerName: "ชื่อ - นามสกุุล",
      width: 200,
      sortable: true,
    },
    { field: "room", headerName: "ห้อง", width: 100, sortable: true },
    {
      field: "dateenter",
      headerName: "วันเวลาเข้า",
      width: 300,
      sortable: true,
    },
    {
      field: "dateleave",
      headerName: "วันเวลาออก",
      width: 300,
      sortable: true,
    },
  ];

  const columnsuser: GridColDef[] = [
    // { field: "id", headerName: "รหัสนักศึกษา", width: 120 },
    // { field: "name", headerName: "ชื่อ - นามสกุุล", width: 200, sortable: true },
    { field: "room", headerName: "ห้อง", width: 100, sortable: true },
    {
      field: "dateenter",
      headerName: "วันเวลาเข้า",
      width: 300,
      sortable: true,
    },
    {
      field: "dateleave",
      headerName: "วันเวลาออก",
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
        item.name?.toLowerCase().includes(searchText) ||
        item.room?.toLowerCase().includes(searchText) ||
        item.idstu?.toString().includes(searchText);
      return dateMatch && textMatch;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const token:any = sessionStorage.getItem("token");
    console.log("✅ Decoded JWT:", token);

    const decoded: any = jwtDecode(token);
    setRole(decoded.role);
    console.log("✅ Decoded JWT2:", decoded);
  }, []);

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center gap-7 max-w-[1200px] w-full ">
        <h3 className="text-primary text-xl font-semibold mt-5 sm:mt-1">
          ประวัติเข้า/ออก ห้องเรียน
        </h3>
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
          rows={
            role == "admin"
              ? filteredData(mockDataadmin)
              : filteredData(mockDatauser)
          }
          columns={role == "admin" ? columnsadmin : columnsuser}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          // sx={{
          //   boxShadow: 0,
          //   border: 0,
          // }}
        />
      </div>
    </div>
  );
}
