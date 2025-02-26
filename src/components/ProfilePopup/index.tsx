// components/ProfilePopup.tsx
import { Toaster } from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";

type ProfilePopupProps = {
  isOpen: boolean;
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  onClose: () => void;
};

const bloodGroupOptions = ["A", "B", "AB", "O"];

export default function Index({
  isOpen,
  profileData,
  setProfileData,
  onSave,
  onClose,
}: ProfilePopupProps) {
  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setProfileData({ ...profileData, photograph: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <Toaster position="bottom-left" />
      <div className="flex flex-col bg-white rounded pt-5 mx-3 mt-14 shadow-lg max-w-[1200px] w-full h-screen max-h-[75vh] overflow-y-auto">
        <div className="py-6 px-4 sm:px-[50px]">
          <div className="flex justify-between items-center border-b border-stroke mb-5 pb-5">
            <h3 className="text-center sm:text-left font-semibold text-black ">
              ลงทะเบียน
            </h3>
            <button onClick={onClose}>
              <MdOutlineCancel size={28} color="gray" />
            </button>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  เลขบัตรประชาชน
                </label>
                <input
                  name="id_card"
                  value={profileData.id_card || ""}
                  placeholder="ไม่มีข้อมูล"
                  onChange={(e) =>
                    setProfileData({ ...profileData, id_card: e.target.value })
                  }
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  รหัสนักศึกษา
                </label>
                <input
                  name="student_id"
                  value={profileData?.student_id || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      student_id: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">ชื่อ</label>
                <input
                  name="first_name"
                  value={profileData?.first_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      first_name: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">นามสกุล</label>
                <input
                  name="last_name"
                  value={profileData?.last_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      last_name: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  ชื่อเล่น
                </label>
                <input
                  name="nick_name"
                  value={profileData?.nick_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      nick_name: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  อีเมลสถาบัน
                </label>
                <input
                  name="email"
                  value={profileData?.email || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  ไอดีไลน์
                </label>
                <input
                  name="line_id"
                  value={profileData?.line_id || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, line_id: e.target.value })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  ชื่อไลน์
                </label>
                <input
                  name="user_line_id"
                  value={profileData?.user_line_id || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      user_line_id: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  เบอร์โทร
                </label>
                <input
                  name="teleiphone "
                  value={profileData?.teleiphone || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      teleiphone: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  Date of birth (วันเดือนปีที่เกิด)
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={profileData?.date_of_birth || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      date_of_birth: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  Blood Type (กรุ๊ปเลือด)
                </label>
                <select
                  name="blood_group"
                  value={profileData?.blood_group}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      blood_group: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                >
                  <option value="" disabled>
                    Blood Type (กรุ๊ปเลือด)
                  </option>
                  {bloodGroupOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="border-b border-stroke ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
              <div>
                <label className="text-sm text-black block mb-1">
                  ชื่อจริงผู้ปกครอง
                </label>
                <input
                  name="guardian_fname"
                  value={profileData?.guardian_fname || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      guardian_fname: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  นามสกุลผู้ปกครอง
                </label>
                <input
                  name="guardian_lname"
                  value={profileData?.guardian_lname || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      guardian_lname: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-black block mb-1">
                  เบอร์ติดต่อของผู้ปกครอง
                </label>
                <input
                  name="guardian_phone"
                  value={profileData?.guardian_phone || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      guardian_phone: e.target.value,
                    })
                  }
                  placeholder="ไม่มีข้อมูล"
                  className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black transition focus:border-primary active:border-primary disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label className="text-sm text-black block mb-1">อัพโหลดรูป</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm rounded border border-gray-200 border-stroke bg-white px-5 py-3 outline-none text-black"
            />
          </div>

          <div className="flex justify-between gap-28 mt-5 ">
            <button
              onClick={onClose}
              className="w-full py-3  rounded-xl bg-gray-300 text-black hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={onSave}
              className="w-full py-3 rounded-xl bg-primary text-white hover:bg-secondary"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
