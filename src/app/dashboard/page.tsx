// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardPage() {
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <DashboardLayout >
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Dashboard Overview</h1>
            <p>Welcome to your dashboard!</p>
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
