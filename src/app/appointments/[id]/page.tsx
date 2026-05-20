import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorDetailsClient from "@/components/appointments/DoctorDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ✅ fetch single doctor from MongoDB
async function getDoctor(id: string) {
  try {
    const res = await fetch(`${API_URL}/doctors/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ✅ fetch all doctors for static params
async function getAllDoctors() {
  try {
    const res = await fetch(`${API_URL}/doctors`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doc = await getDoctor(id);
  if (!doc) return { title: "Doctor Not Found" };
  return { title: `${doc.name} — ${doc.specialty}`, description: doc.description };
}

export async function generateStaticParams() {
  const doctors = await getAllDoctors();
  return doctors.map((d: { id: string }) => ({ id: d.id }));
}

export default async function DoctorPage({ params }: Props) {
  const { id } = await params;
  const doc = await getDoctor(id);
  if (!doc) notFound();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66 }} className="page-enter">
        <DoctorDetailsClient doc={doc} />
      </main>
      <Footer />
    </>
  );
}