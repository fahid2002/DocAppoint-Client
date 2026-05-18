import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your bookings and profile on DocAppoint.",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <DashboardClient />
      </main>
      <Footer />
    </>
  );
}
