export default function Home() {
  return (
    <div className=" bg-slate-300">
      <div className="flex justify-center">
        <div className="bg-slate-400 rounded-2xl p-5">
          <div className="bg-red-200 grid grid-cols-3 sm:grid-cols-6 gap-5 mb-5 text-center">
            <div className="bg-slate-600">ทั้งหมด</div>
            <div className="bg-slate-600">ตึก A</div>
            <div className="bg-slate-600">ตึก B</div>
            <div className="bg-slate-600">ตึก C</div>
            <div className="bg-slate-600">ตึก D</div>
            <div className="bg-slate-600">ตึก E</div>
          </div>
          <div className="bg-blue-200">fluter</div>
        </div>
      </div>
      <div className="bg-green-100 w-full mt-5">table</div>
    </div>
  );
}
