'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();

        const { name, email, password } = form;
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }        
        Cookies.set('token', 'mock-token', { expires: 1 });
        router.push('/');
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
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
                    Sign Up
                </button>
            </form>

            <p className="mt-4 text-sm text-center">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                    Log in
                </a>
            </p>
        </div>
    );
}
