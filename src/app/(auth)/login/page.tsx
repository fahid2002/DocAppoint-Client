import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "@/components/auth/LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your DocAppoint account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-wrap"><div className="spin-anim" /></div>}>
      <LoginClient />
    </Suspense>
  );
}