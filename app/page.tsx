"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">Aplikasi Report Siap Mutu BPPMHKP</span>
        <div>
          {loggedIn === null ? null : loggedIn ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              Masuk ke Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-1 bg-gray-100 p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Aplikasi Report Siap Mutu BPPMHKP
        </h1>
        <p className="text-gray-700 max-w-2xl mb-6">
          Aplikasi ini menampilkan dashboard dan laporan dari aplikasi Siapmutu BPPMHKP.
          Dashboard dan laporan dibagi menjadi:
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 mb-6 max-w-xl space-y-1">
          <li>Dashboard & report Sertifikat Mutu Hasil Kelautan dan Perikanan (SMKHP)</li>
          <li>Dashboard & report Sertifikasi Pusat Primer</li>
          <li>Dashboard & report Sertifikasi Pusat Pasca Panen</li>
        </ul>
        {loggedIn !== null && (
          <button
            onClick={() => router.push(loggedIn ? "/dashboard" : "/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
          >
            {loggedIn ? "Masuk ke Dashboard" : "Login"}
          </button>
        )}
      </header>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center p-4">
        &copy; {new Date().getFullYear()} BPPMHKP. All rights reserved.
      </footer>
    </div>
  );
}
