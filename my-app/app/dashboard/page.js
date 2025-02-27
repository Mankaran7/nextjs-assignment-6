"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {session ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1>Dashboard</h1>
            <button onClick={() => signOut({ callbackUrl: "/" })} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
              Sign out
            </button>
          </div>

          <h2>User List</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((user) => (
              <li key={user.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                <strong>{user.name}</strong>
                <p>{user.email}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <p>Not signed in</p>
          <button onClick={() => signIn()} style={{ background: "blue", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
