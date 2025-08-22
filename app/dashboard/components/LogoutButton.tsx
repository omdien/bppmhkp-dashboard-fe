"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // penting agar cookie HttpOnly ikut dihapus
      });

      if (res.ok) {
        router.push("/login"); // redirect ke halaman login
      } else {
        console.error("Logout gagal");
      }
    } catch (err) {
      console.error("Terjadi kesalahan koneksi", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
