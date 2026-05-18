"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SPECIALTIES } from "@/data/doctors";

export default function SpecialtySection() {
  const router = useRouter();
  const [active, setActive] = useState("Cardiologist");

  const handle = (label: string) => {
    setActive(label);
    router.push(`/appointments?specialty=${label}`);
  };

  return (
    <div style={{ background: "var(--bg3)", borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)", padding: "3rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.2rem" }}>
          <div>
            <div className="eyebrow">Browse by specialty</div>
            <div className="sec-title">Find the right specialist</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "0.6rem" }} className="spec-grid-resp">
          {SPECIALTIES.map((s) => (
            <div
              key={s.label}
              className={`spec-chip${active === s.label ? " on" : ""}`}
              onClick={() => handle(s.label)}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: active === s.label ? "rgba(255,255,255,0.2)" : "var(--p3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontSize: 17, color: active === s.label ? "#fff" : "var(--p)", transition: "all 0.22s" }}>
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </div>
              <div style={{ fontFamily: "Sora, sans-serif", fontSize: 10.5, fontWeight: 600, color: active === s.label ? "#fff" : "var(--tx2)", transition: "color 0.22s" }}>
                {s.label === "General" ? "General Physician" : s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .spec-grid-resp { grid-template-columns: repeat(4,1fr) !important; } }
        @media (max-width: 600px) { .spec-grid-resp { grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>
    </div>
  );
}
