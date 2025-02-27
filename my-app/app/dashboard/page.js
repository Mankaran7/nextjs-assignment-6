"use client"; 

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Component() {
  const { data: session,status } = useSession();
if(status==='unauthenticated'){
    redirect('/')
}
  return (
    <>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          <button
            onClick={() =>
              signOut({ callbackUrl: "/" }) 
            }
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
}
