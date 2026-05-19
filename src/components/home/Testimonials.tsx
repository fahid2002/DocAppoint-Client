"use client";

export default function Testimonials() {
  const tests = [
    { av: "RU", name: "Mr. Ifty", role: "Patient · Dhaka", stars: "★★★★★", text: "Booking was incredibly smooth. Found the perfect cardiologist within minutes. The whole experience was outstanding — from search to confirmation. Highly recommended!" },
    { av: "NK", name: "Marufa Sultana Moon", role: "Patient · Chittagong", stars: "★★★★★", text: "Found an excellent pediatrician for my son within minutes. The process was transparent and the appointment was confirmed instantly. DocAppoint is now my go-to!" },
  ];
  return (
    <div style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
          <div>
            <div className="eyebrow">What patients say</div>
            <div className="sec-title">Patient testimonials</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="test-resp">
          {tests.map((t) => (
            <div key={t.name} style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.4rem" }}>
              <div style={{ fontSize: 38, color: "var(--p)", fontWeight: 900, lineHeight: 1, marginBottom: "0.4rem", opacity: 0.3, fontFamily: "Sora, sans-serif" }}>&quot;</div>
              <div style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.65, marginBottom: "0.9rem" }}>{t.text}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--grad-acc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0, fontFamily: "Sora, sans-serif" }}>{t.av}</div>
                <div>
                  <div style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--tx)" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--tx3)" }}>{t.role}</div>
                  <div style={{ color: "#BA7517", fontSize: 12 }}>{t.stars}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.test-resp{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
