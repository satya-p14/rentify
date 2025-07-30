'use client';
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';
import AdminDashboard from "./admin/dashboard/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { email, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  
  useEffect(() => {
    if (role === 'admin') {
      router.replace('/');
    }
  }, [role, router]);
  return (
    <main>
      {/* <h1 className="text-2xl font-bold">Welcome to the Property App</h1> */}
      <Toaster position="top-right" />
      {email ? (
        <span>
          {role === 'admin' && <AdminDashboard />}
          {role === 'owner' && <p>View and manage your listings.</p>}
          {role === 'tenant' && <p>Book your next property viewing.</p>}
        </span>
      ) : (
        <p className="mt-4 text-red-600">You are not logged in.</p>
      )}
    </main>

  );
}
