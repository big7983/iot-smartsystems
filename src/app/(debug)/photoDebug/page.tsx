"use client";
import { useState } from "react";
import Image from 'next/image'

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64(reader.result as string);
      };
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">แปลงรูปเป็น Base64</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded-lg"
      />

      {image && (
        <div className="flex flex-col items-center">
          <Image width={30} height={30} src={image} alt="Uploaded" className="w-64 h-64 object-cover rounded-lg shadow-md mb-4" />
          <textarea
            className="w-full max-w-lg h-32 p-2 border border-gray-300 rounded-lg bg-white"
            value={base64 || ""}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
