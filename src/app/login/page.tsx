'use client';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { startLoading, stopLoading } from '@/redux/slices/loaderSlice';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    // const searchParams = useSearchParams();
    // const redirect = searchParams.get('redirect') || '/properties';

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        dispatch(startLoading());
        try {
            const res = await fetch(
                `http://localhost:3001/users?email=${form.email}&password=${form.password}`
            );
            const users = await res.json();
            if (users.length > 0) {
                Cookies.set('token', 'mock-token', { expires: 1 });
                const user = users[0];
                dispatch(loginSuccess({
                    email: user.email,
                    userId: user.id,
                    role: user.role
                }));
                Cookies.set('role', user.role);
                Cookies.set('email', user.email);
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userId', users[0].id);
                if (user.role === 'admin') {
                    router.push('/');
                } else if (user.role === 'owner') {
                    router.push('/owners/listings');
                } else if (user.role === 'tenant') {
                    router.push('/tenant');
                } else {
                    router.push('/properties');
                }
            }
        } catch (error) {
            console.log(error);
            setError('Invalid email or password');
        } finally {
            dispatch(stopLoading());
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Password"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>
        </AuthLayout>
    );
}
