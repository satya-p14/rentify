'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    Rentify
                </Link>
                <nav className="hidden md:flex gap-4">
                    <Link href="/" className="hover:text-blue-500">Home</Link>
                    <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
                    <Link href="/login" className="hover:text-blue-500">Login</Link>
                    <Link href="/register" className="hover:text-blue-500">Register</Link>
                </nav>
                {/* Mobile menu toggle */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>
            {open && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
                    <Link href="/" className="hover:text-blue-500">Home</Link>
                    <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
                    <Link href="/login" className="hover:text-blue-500">Login</Link>
                    <Link href="/register" className="hover:text-blue-500">Register</Link>
                </div>
            )}
        </header>
    );
}
