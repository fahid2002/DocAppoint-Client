import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "DocAppoint — Book Top Doctors in Bangladesh",
    template: "%s | DocAppoint",
  },
  description:
    "Bangladesh's most trusted platform for finding and booking verified specialist doctors. Fast, secure, and completely patient-first — available 24/7.",
  keywords: ["doctor appointment", "Bangladesh doctors", "BMDC verified", "book doctor online"],
  openGraph: {
    title: "DocAppoint — Book Top Doctors in Bangladesh",
    description: "Find and book verified specialist doctors in Bangladesh.",
    type: "website",
    url: "https://docappoint.netlify.app",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🩺</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card)",
                color: "var(--tx)",
                border: "1px solid var(--bdr)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13.5px",
                fontWeight: 600,
              },
              success: {
                iconTheme: { primary: "#1D9E75", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#E24B4A", secondary: "#fff" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}