"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LocationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const department = searchParams.get("department") || "General Medicine";
    const keywords = searchParams.get("keywords") || "hospital";
    const advice = searchParams.get("advice") || "";

    const [location, setLocation] = useState("");
    const [detecting, setDetecting] = useState(false);
    const [searching, setSearching] = useState(false);

    const navigateToSearch = (lat: number, lng: number) => {
        const params = new URLSearchParams({
            lat: String(lat),
            lng: String(lng),
            department,
            keywords,
        });
        router.push(`/search?${params.toString()}`);
    };

    const detectLocation = () => {
        setDetecting(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                navigateToSearch(pos.coords.latitude, pos.coords.longitude);
            },
            () => {
                alert("Please allow location access to continue.");
                setDetecting(false);
            }
        );
    };

    const handleSearch = async () => {
        if (!location.trim()) return;
        setSearching(true);

        try {
            const res = await fetch(
                `/api/geocode?address=${encodeURIComponent(location.trim())}`
            );
            const data = await res.json();

            if (!data.results || data.results.length === 0) {
                alert("Location not found. Please try again.");
                setSearching(false);
                return;
            }

            const loc = data.results[0].geometry.location;
            navigateToSearch(loc.lat, loc.lng);
        } catch {
            alert("Failed to find location. Please try again.");
            setSearching(false);
        }
    };

    return (
        <div className="page-container animate-in">
            <div className="page-content">
                {/* Back link */}
                <a
                    href="/"
                    className="back-link"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/");
                    }}
                >
                    ← Back to symptoms
                </a>

                {/* AI Result Card */}
                <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 16,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: "rgba(13, 148, 136, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 20,
                                flexShrink: 0,
                            }}
                        >
                            🧠
                        </div>
                        <div>
                            <p
                                style={{
                                    fontSize: "0.813rem",
                                    color: "var(--text-muted)",
                                    margin: "0 0 2px",
                                }}
                            >
                                AI Recommendation
                            </p>
                            <p
                                style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 600,
                                    color: "var(--text)",
                                    margin: 0,
                                }}
                            >
                                {department}
                            </p>
                        </div>
                    </div>

                    {advice && (
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.875rem",
                                margin: 0,
                                padding: "12px 14px",
                                background: "var(--bg)",
                                borderRadius: "var(--radius-sm)",
                                lineHeight: 1.5,
                            }}
                        >
                            💡 {advice}
                        </p>
                    )}
                </div>

                {/* Location Card */}
                <div className="card" style={{ padding: 28 }}>
                    <h2
                        style={{
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            color: "var(--text)",
                            margin: "0 0 4px",
                        }}
                    >
                        Where are you located?
                    </h2>
                    <p
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.875rem",
                            margin: "0 0 24px",
                        }}
                    >
                        We&apos;ll find {department.toLowerCase()} hospitals near you
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={detectLocation}
                        disabled={detecting}
                        style={{
                            width: "100%",
                            padding: "14px 24px",
                            opacity: detecting ? 0.7 : 1,
                        }}
                    >
                        {detecting ? (
                            <>
                                <span
                                    className="spinner"
                                    style={{ width: 18, height: 18, borderWidth: 2 }}
                                />
                                Detecting...
                            </>
                        ) : (
                            "📍 Use My Current Location"
                        )}
                    </button>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            margin: "20px 0",
                        }}
                    >
                        <div
                            style={{ flex: 1, height: 1, background: "var(--border)" }}
                        />
                        <span
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.813rem",
                                fontWeight: 500,
                            }}
                        >
                            or enter manually
                        </span>
                        <div
                            style={{ flex: 1, height: 1, background: "var(--border)" }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter city or area name"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={handleSearch}
                            disabled={searching}
                            style={{
                                flexShrink: 0,
                                opacity: searching ? 0.7 : 1,
                            }}
                        >
                            {searching ? "..." : "Search"}
                        </button>
                    </div>
                </div>

                <p
                    style={{
                        textAlign: "center",
                        color: "var(--text-muted)",
                        fontSize: "0.813rem",
                        marginTop: 20,
                    }}
                >
                    Try: Kochi, Trivandrum, Bangalore, Chennai
                </p>
            </div>
        </div>
    );
}

export default function LocationPage() {
    return (
        <Suspense
            fallback={
                <div className="page-container">
                    <div className="spinner spinner-lg" />
                </div>
            }
        >
            <LocationContent />
        </Suspense>
    );
}
