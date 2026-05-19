"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { appointmentsApi, authApi } from "@/libs/api";
import { DOCTOR_REVIEWS } from "@/data/doctors";
import type { Doctor } from "@/data/doctors";
import toast from "react-hot-toast";

export default function DoctorDetailsClient({ doc }: { doc: Doctor }) {

  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patientName: "", gender: "Male", phone: "", appointmentDate: "", appointmentTime: doc.times[0] || "" });
  const [saving, setSaving] = useState(false);

  const reviews = DOCTOR_REVIEWS[doc.id] || [];
  const stars = (r: number) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

  const openBook = () => {
  if (isPending) return;
  if (!session?.user) { router.push("/login"); return; }
  setModalOpen(true);
};

  const handleBook = async () => {
    if (!form.patientName || !form.phone || !form.appointmentDate) { toast.error("Please fill all required fields."); return; }
    setSaving(true);
    try {
      if (session?.user?.email) {
      await authApi.getJwt(session.user.email).catch(() => {});
    }
      await appointmentsApi.create({
        userEmail: session!.user.email,
        doctorId: doc.id,
        doctorName: doc.name,
        specialty: doc.specialty,
        hospital: doc.hospital,
        doctorImg: doc.img,
        patientName: form.patientName,
        gender: form.gender,
        phone: form.phone,
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        status: "Upcoming",
        fee: doc.fee,
      });
      toast.success("Appointment booked successfully!");
      setModalOpen(false);
      setForm({ patientName: "", gender: "Male", phone: "", appointmentDate: "", appointmentTime: doc.times[0] });
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="det-hero">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", gap: "2rem", alignItems: "flex-end" }} className="det-inner-resp">
          <div className="det-photo">
            <Image src={doc.img} alt={doc.name} width={200} height={240} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div style={{ flex: 1, paddingBottom: "0.5rem" }}>
            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 11, fontWeight: 700, color: "var(--acc3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{doc.specialty}</div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>{doc.name}</h2>
            <div style={{ color: "#BA7517", fontSize: 14, marginBottom: 10 }}>{stars(doc.rating)} <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{doc.rating} ({doc.reviews} reviews)</span></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {[{ icon: "ti-briefcase", label: doc.exp }, { icon: "ti-map-pin", label: doc.location }, { icon: "ti-building-hospital", label: doc.hospital }].map(t => (
                <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                  <i className={`ti ${t.icon}`} style={{ fontSize: 12 }} aria-hidden="true" />{t.label}
                </span>
              ))}
            </div>
            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 22, fontWeight: 900, color: "var(--acc3)" }}>
              ৳{doc.fee} <small style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>/visit</small>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="info-resp">
          {[{ lbl: "Hospital", val: doc.hospital, icon: "ti-building-hospital" }, { lbl: "Location", val: doc.location, icon: "ti-map-pin" }].map(b => (
            <div key={b.lbl} style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.2rem" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{b.lbl}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", display: "flex", alignItems: "center", gap: 6 }}>
                <i className={`ti ${b.icon}`} style={{ color: "var(--p)" }} />{b.val}
              </div>
            </div>
          ))}
          <div style={{ gridColumn: "1/-1", background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.2rem" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>About the doctor</div>
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7 }}>{doc.description}</p>
          </div>
          <div style={{ gridColumn: "1/-1", background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.2rem" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Available time slots</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {doc.availability.map(a => (
                <span key={a} style={{ background: "var(--p3)", color: "var(--p2)", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 6 }}><i className="ti ti-clock" style={{ fontSize: 11, marginRight: 4 }} />{a}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {doc.times.map(t => (
                <span key={t} style={{ background: "var(--green-bg)", color: "var(--green-tx)", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 5 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginBottom: "2rem" }}>
          <button className="btn-book" onClick={openBook}>
            <i className="ti ti-calendar-plus" style={{ fontSize: 16 }} aria-hidden="true" />
            Book Appointment
          </button>
          <button className="btn btn-outline" style={{ padding: "13px 24px", fontSize: 15 }}>
            <i className="ti ti-heart" style={{ fontSize: 16, color: "#D4537E" }} aria-hidden="true" />
            Save
          </button>
        </div>

        {/* Reviews */}
        <div style={{ marginBottom: "2rem" }}>
          <div className="eyebrow" style={{ marginBottom: "0.9rem" }}>Patient reviews</div>
          {reviews.map(r => (
            <div key={r.name} style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.2rem", marginBottom: "0.7rem", display: "flex", gap: "0.9rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--grad-acc)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{r.av}</div>
              <div>
                <div style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--tx)", marginBottom: 2 }}>{r.name}</div>
                <div style={{ color: "#BA7517", fontSize: 12, marginBottom: 6 }}>{r.stars}</div>
                <p style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.6 }}>{r.text}</p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p style={{ color: "var(--tx3)", fontSize: 14 }}>No reviews yet. Be the first to review!</p>}
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--tx)", display: "flex", alignItems: "center", gap: 8 }}>
                <i className="ti ti-calendar-plus" style={{ color: "var(--p)", fontSize: 17 }} />Book appointment
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ width: 32, height: 32, borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tx3)" }}>
                <i className="ti ti-x" />
              </button>
            </div>
            {/* Doc mini */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg3)", borderRadius: "var(--r-md)", padding: "0.85rem", marginBottom: "1.2rem" }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <Image src={doc.img} alt={doc.name} width={46} height={46} style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Sora, sans-serif", fontSize: 13.5, fontWeight: 700, color: "var(--tx)" }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: "var(--p)", fontWeight: 600 }}>{doc.specialty} · ৳{doc.fee}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {[{ label: "Doctor name", val: doc.name, readonly: true }, { label: "Your email", val: session?.user?.email || "", readonly: true }].map(f => (
                <div key={f.label} className="auth-field">
                  <label>{f.label}</label>
                  <input value={f.val} readOnly style={{ opacity: 0.7, cursor: "not-allowed" }} />
                </div>
              ))}
              <div className="auth-field"><label>Patient name *</label><input value={form.patientName} onChange={e => setForm(p => ({ ...p, patientName: e.target.value }))} placeholder="Enter patient name" /></div>
              <div className="auth-field">
                <label>Gender</label>
                <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))} style={{ fontSize: 13.5, padding: "11px 13px", borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "var(--bg3)", color: "var(--tx)", outline: "none", width: "100%" }}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="auth-field"><label>Phone number *</label><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="017XXXXXXXX" /></div>
              <div className="auth-field"><label>Appointment date *</label><input type="date" value={form.appointmentDate} onChange={e => setForm(p => ({ ...p, appointmentDate: e.target.value }))} min={new Date().toISOString().split("T")[0]} /></div>
              <div className="auth-field" style={{ gridColumn: "1/-1" }}>
                <label>Preferred time slot</label>
                <select value={form.appointmentTime} onChange={e => setForm(p => ({ ...p, appointmentTime: e.target.value }))} style={{ fontSize: 13.5, padding: "11px 13px", borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "var(--bg3)", color: "var(--tx)", outline: "none", width: "100%" }}>
                  {doc.times.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleBook} disabled={saving} className="btn btn-primary" style={{ width: "100%", padding: "12px", fontSize: 14, fontWeight: 700, marginTop: "0.8rem" }}>
              <i className="ti ti-circle-check" />{saving ? "Booking…" : "Confirm booking"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:600px){.det-inner-resp{flex-direction:column!important;}.info-resp{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  );
}
