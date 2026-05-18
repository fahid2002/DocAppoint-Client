import Link from "next/link";
import { DOCTORS } from "@/data/doctors";
import DoctorCard from "@/components/appointments/DoctorCard";

export default function TopDoctors() {
  const top3 = [...DOCTORS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
          <div>
            <div className="eyebrow">Our best</div>
            <div className="sec-title">Top rated doctors</div>
          </div>
          <Link href="/appointments" style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 600, color: "var(--p)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            View all <i className="ti ti-arrow-right" style={{ fontSize: 14 }} aria-hidden="true" />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }} className="docs-grid-resp">
          {top3.map((d) => <DoctorCard key={d.id} doc={d} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .docs-grid-resp { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .docs-grid-resp { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
