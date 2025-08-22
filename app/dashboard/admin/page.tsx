import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";
import LogoutButton from "@/components/LogoutButton";

export default function AdminDashboardPage() {
  return (
    <ProtectedPageWrapper requireAdmin={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <LogoutButton />
        </div>
        <p>Konten khusus admin & super admin.</p>
      </div>
    </ProtectedPageWrapper>
  );
}
