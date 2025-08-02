'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: (Math.floor(Math.random() * 100) + 1).toString(),
        name: '',
        email: '',
        password: '',
        phone: '',
        role: "tenant",
        verified: true
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Check if user already exists
        const checkRes = await fetch(`http://localhost:3001/users?email=${formData.email}`);
        const existing = await checkRes.json();

        if (existing.length > 0) {
            setError('User with this email already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash(formData.password, 10);
        // Register user
        const res = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                password: hashedPassword,
            }),
        });

        if (res.ok) {
            setSuccess(true);
            setTimeout(() => router.push('/login'), 1500);
        } else {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Register</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">Registered successfully! Redirecting...</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className='relative'>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 pt-0"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        name="phone"
                        type="number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="tenant">Tenant</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Register
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
