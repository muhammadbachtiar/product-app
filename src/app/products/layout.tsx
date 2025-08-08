"use client"
import { Button, Layout } from "antd";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout(); 
      router.push("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
   <div className="bg-white flex flex-col h-screen">
  <div
    className="bg-white py-4 px-6 shadow-sm flex justify-between items-center"
  >
    <div>
      <h1 className="text-lg font-bold mb-0">Product List</h1>
    </div>
    {user && (
      <Button
        type="primary"
        danger
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </Button>
    )}
  </div>
  {children}
</div>
  );
}
