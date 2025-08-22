"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  username: string;
  role: number; // 1 = admin/super admin
  email?: string;
};

export default function ProtectedPageWrapper({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("unauthorized");
        const data = await res.json();
        // data dari controller kamu: { id, username, role, email }
        const u: User = data;
        if (requireAdmin && u.role !== 1) {
          router.push("/dashboard"); // non admin dialihkan
          return;
        }
        setUser(u);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [router, requireAdmin]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 flex justify-between items-center shadow">
        <span className="font-semibold">Dashboard</span>
        {user && <span className="text-sm text-gray-600">Hi, {user.username}</span>}
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
