"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "@/libs/auth-client";
import { useTheme } from "./ThemeProvider";
import toast from "react-hot-toast";
import Image from "next/image";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // local override for instant update without session refresh
  const [localProfile, setLocalProfile] = useState<{ name: string; image: string } | null>(() => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("da_profile");
  return saved ? JSON.parse(saved) : null;
});

  const user = session?.user;
  const displayName = localProfile?.name ?? user?.name ?? "";
  const displayImage = localProfile?.image ?? user?.image ?? "";

  // listen for profile-updated event from DashboardClient
  useEffect(() => {
  const handler = (e: Event) => {
    const { name, image } = (e as CustomEvent).detail;
    setLocalProfile({ name, image });
  };
  window.addEventListener("profile-updated", handler);
  return () => window.removeEventListener("profile-updated", handler);
}, []);

  const handleLogout = async () => {
  await signOut();
  localStorage.removeItem("da_profile"); // ✅ clear on logout
  toast.success("You have been logged out.");
  router.push("/");
  router.refresh();
};

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "All Appointments" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px] cursor-pointer">
            <div className="logo-mark">
              <i className="ti ti-stethoscope" aria-hidden="true" />
            </div>
            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--tx)", letterSpacing: "-0.4px" }}>
              Doc<span style={{ color: "var(--p)" }}>Appoint</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-[2px]">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? "active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme toggle */}
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              <i className={`ti ${theme === "dark" ? "ti-sun" : "ti-moon"}`} />
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="av-pill">
                  {displayImage ? (
                    // ✅ use displayImage instead of user.image
                    <Image
                      src={displayImage}
                      alt={displayName || "User"}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="av-circle">{initials(displayName || "U")}</div>
                  )}
                  {/* ✅ use displayName instead of user.name */}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--tx)" }}>
                    {(displayName || "User").split(" ")[0]}
                  </span>
                </Link>
                <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                  <i className="ti ti-logout" aria-hidden="true" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="btn btn-sm btn-outline">Login</Link>
                <Link href="/register" className="btn btn-sm btn-primary">Register</Link>
              </div>
            )}

            {/* Hamburger */}
            <button className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ flexShrink: 0 }}>
              <span style={{ display: "block", width: 22, height: 2, background: "var(--tx)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : undefined }} />
              <span style={{ display: "block", width: 22, height: 2, background: "var(--tx)", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "var(--tx)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : undefined }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ display: "flex", position: "fixed", top: 66, left: 0, right: 0, background: "var(--nav)", borderBottom: "1px solid var(--nav-bdr)", padding: "1rem 1.5rem", zIndex: 199, flexDirection: "column", gap: 4 }}>
          {navLinks.map((l) => (
            <Link
  key={l.href}
  href={l.href}
  onClick={() => setMenuOpen(false)}
  className={pathname === l.href ? "mobile-link-active" : "mobile-link"}
  style={{
    fontSize: 14,
    fontWeight: pathname === l.href ? 700 : 500,
    padding: "10px 14px",
    borderRadius: "var(--r-md)",
    color: pathname === l.href
  ? (theme === "dark" ? "#7eb8f7" : "#0c447c ")
  : "var(--tx)",
    background: pathname === l.href ? "var(--p3)" : "transparent",
    borderLeft: pathname === l.href
  ? `3px solid ${theme === "dark" ? "#7eb8f7" : "#0c447c"}`
  : "3px solid transparent",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  }}
>
              {l.label}
            </Link>
          ))}
          <hr style={{ borderColor: "var(--bdr)", margin: "0.5rem 0" }} />
          {!user && (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: 14, fontWeight: 500, padding: "10px 14px", borderRadius: "var(--r-md)", color: "var(--tx)", cursor: "pointer" }}>Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} style={{ fontSize: 14, fontWeight: 500, padding: "10px 14px", borderRadius: "var(--r-md)", color: "var(--tx)", cursor: "pointer" }}>Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}