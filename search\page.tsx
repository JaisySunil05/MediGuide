"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const params = useSearchParams();
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

if (isNaN(lat) || isNaN(lng)) {
  console.error("Invalid location coordinates!");
}


  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lng) return;

    fetch(`/api/hospitals?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) {
          setLoading(false);
          return;
        }

        setHospitals(data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [lat, lng]);

  if (loading) {
    return <div className="p-10">Loading hospitals...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Nearby Hospitals
      </h1>

      {hospitals.length === 0 && (
        <p>No hospitals found.</p>
      )}

      {hospitals.map((h: any) => (
        <Link key={h.place_id} href={`/hospital/${h.place_id}`}>
          <div className="border p-4 mb-3 rounded hover:bg-gray-100 cursor-pointer">
            <h2 className="font-semibold">{h.name}</h2>
            <p>{h.vicinity}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
