'use client';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();

        const res = await fetch(
            `http://localhost:3001/users?email=${form.email}&password=${form.password}`
        );
        const users = await res.json();
        console.log(users, "users");
        debugger;
        if (users.length > 0) {
            // Cookies.set('token', 'mock-token', { expires: 1 });
            const user = users[0];
            dispatch(loginSuccess({
                email: user.email,
                userId: user.id,
                role: user.role
            }));
            // localStorage.setItem('tenantEmail', form.email);
            // localStorage.setItem('userId', users[0].id);
            if (user.role === 'admin') {
                router.push('/');
            } else {
                router.push('/properties');
            }
        } else {
            setError('Invalid email or password');
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
