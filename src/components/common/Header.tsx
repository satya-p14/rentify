'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { email, role } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/properties');

    };

    return (
        <header className="bg-green-100 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    Rentify
                </Link>
                <nav className="hidden md:flex gap-4">
                    {/* admin routes */}
                    {email && role === 'admin' && <Link href="/" className="hover:text-blue-500">Dashboard</Link>}
                    {email && role === 'admin' && <Link href="/admin/users" className="text-blue-600 hover:underline">
                        Manage users
                    </Link>}
                    {email && role === 'admin' && <Link href="/admin/properties" className="text-blue-600 hover:underline">
                        Manage property
                    </Link>}
                    {email && role === 'admin' && <Link href="/admin/appointments" className="text-blue-600 hover:underline">
                        Appointments
                    </Link>}
                    {/* owners routes */}

                    {email && role === 'owner' && <Link href="/owners/listings" className="text-blue-600 hover:underline">
                        My property
                    </Link>}
                    {email && role === 'owner' && <Link href="/owners/appointments" className="text-blue-600 hover:underline">
                        Appointments
                    </Link>}

                    {/* tenant routes */}                    

                    {email && role === 'tenant' && <Link href="/" className="text-blue-600 hover:underline">
                        Properties
                    </Link>}
                    {email && role === 'tenant' && <Link href="/tenant/appointments" className="text-blue-600 hover:underline">
                        My Appointments
                    </Link>}

                    {/* common routes  */}

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
