"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import สไตล์ของ react-calendar
import { Dialog } from "@headlessui/react";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // ตัวอย่างข้อมูลของแต่ละวัน (สามารถใช้ API ได้)
  const events: Record<string, string[]> = {
    "2025-02-20": ["Meeting Room A", "Workshop Room B"],
    "2025-02-21": ["Conference Room C"],
  };

  // แปลงวันที่ให้เป็น format YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-6">📅 ปฏิทิน</h1>

      <div className="bg-white p-4 rounded-lg shadow-md w-full h-screen ">
        <Calendar
          onClickDay={handleDateClick}
          className="w-full h-screen-min"
        />
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black/50">
        <Dialog.Panel className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-bold text-gray-800">
            📆 รายการห้องของวันที่ {selectedDate ? formatDate(selectedDate) : ""}
          </Dialog.Title>
          <div className="mt-4">
            {selectedDate && events[formatDate(selectedDate)] ? (
              <ul className="list-disc pl-5 text-gray-700">
                {events[formatDate(selectedDate)].map((room, index) => (
                  <li key={index}>{room}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">ไม่มีข้อมูล</p>
            )}
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
          >
            ปิด
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
