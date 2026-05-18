import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "About Us", description: "Learn about DocAppoint and our mission." };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <div style={{ background: "var(--grad)", padding: "4rem 0 3rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Our story</div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>About DocAppoint</h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>Bangladesh&apos;s most trusted platform for finding and booking verified specialist doctors — built with patients first.</p>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>
          {[
            { icon: "ti-target", title: "Our Mission", text: "DocAppoint was founded with a simple mission: to make quality healthcare accessible to every patient in Bangladesh. We eliminate the friction of finding and booking the right doctor by providing a fast, transparent, and secure platform." },
            { icon: "ti-shield-check", title: "BMDC Verified Doctors", text: "Every doctor listed on DocAppoint is verified against the Bangladesh Medical and Dental Council (BMDC) registry. We manually vet credentials, specializations, and hospital affiliations before any doctor is listed." },
            { icon: "ti-users", title: "Our Team", text: "We are a passionate team of healthcare technology professionals, doctors, and patient advocates based in Dhaka. Our goal is to bridge the gap between patients and quality medical care using modern technology." },
            { icon: "ti-chart-line", title: "By the Numbers", text: "120+ verified specialists · 8,000+ patients served · 15+ specialties · 4.9 average rating · 15,000+ bookings per month. These numbers represent real patients who received better care through our platform." },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--p3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "var(--p)" }}>
                  <i className={`ti ${s.icon}`} />
                </div>
                <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tx)" }}>{s.title}</h2>
              </div>
              <p style={{ fontSize: 15, color: "var(--tx2)", lineHeight: 1.75 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
