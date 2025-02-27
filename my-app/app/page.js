"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginPage from "./component/LoginPage";

export default function Component() {
  const { data: session, status } = useSession();
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
 if (status === "authenticated") {
      
      if (seconds <= 0) {
        router.push("/dashboard");
        return;
      }

   
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

    
      return () => clearTimeout(timer);
    }
  }, [seconds, router, status]);

  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <h2>Already logged in</h2>
        <p>Redirecting you in {seconds} seconds...</p>
      </div>
    );
  }

 
  return <LoginPage />;
}