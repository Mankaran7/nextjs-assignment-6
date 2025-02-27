"use client";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign in using Google
      </button>
    </>
  );
}
