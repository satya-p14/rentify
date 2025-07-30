'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';

export default function Header() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { email, role } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-green-100 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    Rentify
                </Link>
                <nav className="hidden md:flex gap-4">
                    <Link href="/" className="hover:text-blue-500">Dashboard</Link>
                    {email && role === 'admin' && <Link href="/admin/users" className="text-blue-600 hover:underline">
                        Manage users
                    </Link>}
                    {email && role === 'admin' && <Link href="/admin/properties" className="text-blue-600 hover:underline">
                        Manage property
                    </Link>}
                    {email && role === 'admin' && <Link href="/admin/appointments" className="text-blue-600 hover:underline">
                        Appointments
                    </Link>}
                    {!email && <Link href="/register" className="hover:text-blue-500">Register</Link>}
                    <div>
                        {!email ? (
                            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                        ) : (
                            <button onClick={handleLogout} className="text-red-600 hover:underline">
                                Logout ({email})
                            </button>
                        )}
                    </div>
                </nav>

                {/* Mobile menu toggle */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>
            {open && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
                    <Link href="/" className="hover:text-blue-500">Home</Link>
                    {email && <Link href="/appointments" className="text-blue-600 hover:underline">
                        Appointments
                    </Link>}
                    {email && <Link href="/register" className="hover:text-blue-500">Register</Link>}
                    <div>
                        {!email ? (
                            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                        ) : (
                            <button onClick={handleLogout} className="text-red-600 hover:underline">
                                Logout ({email})
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
