'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = form;

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        // ✅ Simulate login (replace with real API call later)
        if (email === 'admin@example.com' && password === 'admin') {
            Cookies.set('token', 'mock-token', { expires: 1 });
            router.push('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            {error && <p className="text-red-600 mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>

            <p className="mt-4 text-sm text-center">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">
                    Register
                </a>
            </p>
        </AuthLayout>
    );
}
