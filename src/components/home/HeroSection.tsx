"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/appointments?q=${encodeURIComponent(search)}`);
    } else {
      router.push("/appointments");
    }
  };

  return (
    <div className="hero">
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "3rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-inner-grid"
      >
        {/* Left content */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 30,
              padding: "5px 14px",
              fontSize: 12,
              color: "rgba(255,255,255,0.92)",
              marginBottom: "1.1rem",
              fontWeight: 600,
              fontFamily: "Sora, sans-serif",
            }}
          >
            <i className="ti ti-circle-check" style={{ fontSize: 13 }} aria-hidden="true" />
            Trusted by 8,000+ patients across Bangladesh
          </div>

          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "0.85rem",
              letterSpacing: "-0.8px",
            }}
          >
            Find &amp; Book
            <br />
            Top Doctors{" "}
            <span style={{ color: "var(--acc3)" }}>Easily</span>
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.72)",
              marginBottom: "1.8rem",
              lineHeight: 1.7,
              maxWidth: 440,
            }}
          >
            Browse BMDC-verified specialists, check real-time availability, and schedule your
            appointment in under 2 minutes — from anywhere.
          </p>

          {/* Search bar */}
          <div
            style={{
              display: "flex",
              maxWidth: 480,
              background: "rgba(255,255,255,0.13)",
              border: "1.5px solid rgba(255,255,255,0.28)",
              borderRadius: "var(--r-lg)",
              padding: 5,
              backdropFilter: "blur(10px)",
              marginBottom: "1.8rem",
            }}
          >
            <i
              className="ti ti-search"
              style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginLeft: 4, alignSelf: "center" }}
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by doctor name or specialty…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#fff",
                padding: "7px 12px",
                fontFamily: "DM Sans, sans-serif",
              }}
            />
            <button
              onClick={handleSearch}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 9, padding: "9px 18px" }}
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { num: "120+", lbl: "Specialists" },
              { num: "8k+", lbl: "Patients" },
              { num: "15+", lbl: "Specialties" },
              { num: "4.9★", lbl: "Avg Rating" },
            ].map((s) => (
              <div key={s.lbl}>
                <div
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: 24,
                    fontWeight: 900,
                    color: "var(--acc3)",
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right hero card */}
        <div
          className="hero-card-desktop"
          style={{
            borderRadius: "var(--r-lg)",
            padding: "1.1rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          <div
            className="card-divider"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "0.8rem",
              paddingBottom: "0.8rem",
            }}
          >
            <div
              className="card-avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: 11,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src="https://i.pravatar.cc/100?img=48"
                alt="Dr. Ayesha"
                width={50}
                height={50}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div
                className="card-name"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Dr. Ayesha Rahman
              </div>
              <div className="card-specialty" style={{ fontSize: 11, fontWeight: 600 }}>
                Cardiologist · BMDC Verified
              </div>
              <div style={{ color: "#BA7517", fontSize: 12 }}>★★★★★ 4.9</div>
            </div>
          </div>

          <div
            className="card-label"
            style={{
              fontSize: 10,
              fontWeight: 700,
              marginBottom: "0.45rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Next available slots
          </div>
          <div style={{ display: "flex", gap: 5, marginBottom: "0.7rem" }}>
            <span
              className="card-slot-green"
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <i className="ti ti-clock" style={{ fontSize: 10 }} aria-hidden="true" />
              Today 9:00 AM
            </span>
            <span
              className="card-slot-blue"
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              4:00 PM
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              className="card-fee"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: 17,
                fontWeight: 800,
              }}
            >
              ৳800{" "}
              <small className="card-fee-small" style={{ fontSize: 10, fontWeight: 400 }}>/visit</small>
            </div>
            <div
              className="card-available"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: 5,
              }}
            >
              <div className="pulse" />
              Available
            </div>
          </div>

          <div
            className="card-bottom"
            style={{
              borderRadius: 10,
              padding: "0.65rem 0.85rem",
              marginTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
            }}
          >
            <div
              className="card-bottom-icon"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              <i className="ti ti-calendar" aria-hidden="true" />
            </div>
            <div>
              <div className="card-bottom-title" style={{ fontSize: 11.5, fontWeight: 700 }}>
                15,000+ bookings this month
              </div>
              <div className="card-bottom-sub" style={{ fontSize: 10 }}>
                Verified &amp; confirmed appointments
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-inner-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-card-desktop {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
