"use client";
import { ValidateToken } from "@/api/session";
import { SessionTimeout } from "@/app/components/modals/modals";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setUserRole] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSessionExpired(true);
      return;
    }

    const validateAndHandleExpiration = async () => {
      try {
        console.log("Validating token:", token); // Only logs once
        await ValidateToken(token);
      } catch (error) {
        localStorage.removeItem("token");
        setSessionExpired(true);
      }
    }
    validateAndHandleExpiration();
  }, [router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserRole = localStorage.getItem("userrole");
    setUser(storedUser);
    setUserRole(storedUserRole);
  }, []);

  const handleSessionTimeoutClose = () => {
    setSessionExpired(false);
    window.location.href = "/";
  };

  return (
    <>
      <SessionTimeout show={sessionExpired} onClose={handleSessionTimeoutClose} />
      <h1>This is dashboard</h1>
      <h2>Hello {role ? role : "Loading..."} : {user ? user : "Loading..."}</h2>
    </>
  );
}
