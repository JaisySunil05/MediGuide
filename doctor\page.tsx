"use client";
import { useState } from "react";

export default function Doctors() {
  const [department, setDepartment] = useState("");
  const [docs, setDocs] = useState<any[]>([]);

  const fetchDoctors = async () => {
    const res = await fetch(`/api/doctors?department=${department}`);
    const data = await res.json();
    setDocs(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Find Doctors</h1>

      <input
        placeholder="Enter Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border p-2"
      />

      <button onClick={fetchDoctors} className="bg-blue-500 text-white p-2 ml-2">
        Search
      </button>

      {docs.map((d) => (
        <div key={d.id} className="border p-3 mt-3">
          <h2>{d.name}</h2>
          <p>{d.qualification}</p>
          <p>{d.hospital}</p>
          <p>{d.timings}</p>
          <p>₹{d.fee}</p>
        </div>
      ))}
    </div>
  );
}
