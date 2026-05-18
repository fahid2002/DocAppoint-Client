"use client";
import { useState } from "react";

const slides = [
  { icon: "ti-shield-check", title: "Verified doctors", desc: "Every specialist is BMDC-verified and professionally vetted before listing on our platform." },
  { icon: "ti-clock", title: "Instant booking", desc: "Confirm an appointment in under 2 minutes, any time of day or night." },
  { icon: "ti-calendar-check", title: "Easy rescheduling", desc: "Update or cancel bookings effortlessly from your personal dashboard." },
  { icon: "ti-star", title: "Real reviews", desc: "Read honest, verified patient reviews before choosing your doctor." },
  { icon: "ti-lock", title: "Secure & private", desc: "Your health data is encrypted with JWT and never shared without consent." },
  { icon: "ti-device-mobile", title: "Mobile friendly", desc: "Fully responsive design — works perfectly on any device, anywhere." },
];

export default function CarouselSection() {
  const [page, setPage] = useState(0);
  const visible = 3;
  const total = Math.ceil(slides.length / visible);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(total - 1, p + 1));

  const shown = slides.slice(page * visible, page * visible + visible);

  return (
    <div className="carousel-wrap">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>
            <i className="ti ti-sparkles" style={{ color: "var(--acc3)", marginRight: 5 }} aria-hidden="true" />
            Why patients choose DocAppoint
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ fn: prev, icon: "ti-chevron-left", label: "Previous" }, { fn: next, icon: "ti-chevron-right", label: "Next" }].map((b) => (
              <button key={b.label} onClick={b.fn} aria-label={b.label}
                style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.26)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              >
                <i className={`ti ${b.icon}`} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", borderRadius: "var(--r-md)" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {shown.map((s) => (
              <div key={s.title} className="c-slide" style={{ flex: "0 0 calc(33.333% - 8px)" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", marginBottom: "0.65rem" }}>
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </div>
                <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.title}</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: "0.9rem" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} onClick={() => setPage(i)} style={{ width: i === page ? 22 : 7, height: 7, borderRadius: i === page ? 4 : "50%", background: i === page ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
