"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  // Get current location
  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        router.push(`/search?lat=${lat}&lng=${lng}`);
      },
      () => {
        alert("Please allow location access");
      }
    );
  };

  // Search by entered location
  const handleSearch = async () => {
    if (!location) return;

    const res = await fetch(`/api/geocode?address=${location}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      alert("Location not found");
      return;
    }

    const loc = data.results[0].geometry.location;

    router.push(`/search?lat=${loc.lat}&lng=${loc.lng}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        MediRecommend
      </h1>

      <p className="mb-6 text-gray-600">
        Find nearby hospitals and doctors
      </p>

      <button
        onClick={detectLocation}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Use My Location
      </button>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city or place"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Try: Kochi, Trivandrum, Bangalore, Chennai
      </div>

    </div>
  );
}
