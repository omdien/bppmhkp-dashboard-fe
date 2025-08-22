import LogoutButton from "./components/LogoutButton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-2xl font-bold mb-6">Selamat datang di Dashboard 🚀</h1>
      <LogoutButton />
    </div>
  );
}