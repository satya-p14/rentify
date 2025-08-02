'use client';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { startLoading, stopLoading } from '@/redux/slices/loaderSlice';
import bcrypt from 'bcryptjs';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        dispatch(startLoading());
        try {
            const res = await fetch(
                `http://localhost:3001/users?email=${form.email}`
            );
            const users = await res.json();
            debugger;
            if (users && users.length === 0) {
                setError('User not found ,Login failed. Invalid email or password');
                return;
            }
            const match = await bcrypt.compare(form.password, users[0].password);
            if (!match) {
                setError('Incorrect password');
                return;
            }
            if (users.length > 0) {
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
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded pr-10"
                        placeholder="Password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

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
