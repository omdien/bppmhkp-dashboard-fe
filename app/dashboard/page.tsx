import LogoutButton from "./components/LogoutButton";
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";

export default function DashboardPage() {
    return (
        <ProtectedPageWrapper>
            <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
                <h1 className="text-2xl font-bold mb-6">Selamat datang di Dashboard 🚀</h1>
                <LogoutButton />
            </div>
        </ProtectedPageWrapper>
    );
}