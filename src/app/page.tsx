'use client';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store';
import AdminDashboard from "./admin/dashboard/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Owners from "./owners/page";
import Tenant from "./tenant/page";
import { startLoading, stopLoading } from "@/redux/slices/loaderSlice";

export default function Home() {
  const { email, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    try {
      if (role === 'admin') {
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }

  }, [role, router]);

  return (
    <main>
      {/* <h1 className="text-2xl font-bold">Welcome to the Property App</h1> */}
      <Toaster position="top-right" />
      {email ? (
        <span>
          {role === 'admin' && <AdminDashboard />}
          {role === 'owner' && <Owners />}
          {role === 'tenant' && <Tenant />}
        </span>
      ) : (
        <p className="mt-4 text-red-600">You are not logged in.</p>
      )}
    </main>

  );
}
