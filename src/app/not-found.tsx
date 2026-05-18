import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 2rem 2rem" }}>
        <div style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(80px,15vw,140px)", fontWeight: 900, color: "var(--p)", lineHeight: 1, letterSpacing: -5, opacity: 0.15 }}>404</div>
        <div style={{ fontSize: 64, color: "var(--p)", margin: "-1rem 0 1rem" }}><i className="ti ti-map-pin-off" /></div>
        <div style={{ fontFamily: "Sora, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--tx)", marginBottom: "0.4rem" }}>Page not found</div>
        <div style={{ fontSize: 14.5, color: "var(--tx2)", marginBottom: "1.8rem", maxWidth: 320 }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</div>
        <Link href="/" className="btn btn-primary btn-lg"><i className="ti ti-home" />Back to home</Link>
      </div>
    </>
  );
}
