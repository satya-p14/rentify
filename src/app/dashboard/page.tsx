'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';

export default function DashboardPage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <DashboardLayout >            
            <h1 className="text-2xl font-bold">Welcome {user?.email}</h1>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
                Logout
            </button>
        </DashboardLayout>
        // <div className="p-6">
        //     <h1 className="text-3xl font-bold mb-4 text-blue-600">Dashboard</h1>
        //     <p className="text-gray-700">Welcome to your dashboard!</p>
        //     <div className="mt-6">
        //         <button
        //             className="bg-red-500 text-white px-4 py-2 rounded"
        //             onClick={() => {
        //                 Cookies.remove('token');
        //                 router.push('/login');
        //             }}
        //         >
        //             Logout
        //         </button>
        //     </div>
        // </div>
    );
}
