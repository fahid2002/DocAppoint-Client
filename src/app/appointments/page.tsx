import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppointmentsClient from "@/components/appointments/AppointmentsClient";

export const metadata: Metadata = {
  title: "All Appointments",
  description: "Browse all available doctors and book an appointment instantly.",
};

export default function AppointmentsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <AppointmentsClient />
      </main>
      <Footer />
    </>
  );
}
