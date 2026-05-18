import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorDetailsClient from "@/components/appointments/DoctorDetailsClient";
import { DOCTORS } from "@/data/doctors";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doc = DOCTORS.find(d => d.id === id);
  if (!doc) return { title: "Doctor Not Found" };
  return { title: `${doc.name} — ${doc.specialty}`, description: doc.description };
}

export async function generateStaticParams() {
  return DOCTORS.map(d => ({ id: d.id }));
}

export default async function DoctorPage({ params }: Props) {
  const { id } = await params;
  const doc = DOCTORS.find(d => d.id === id);
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
