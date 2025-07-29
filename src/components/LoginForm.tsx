'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Dummy validation: Accept any non-empty credentials
        if (email === 'admin@example.com' && password === 'admin') {
            Cookies.set('token', 'mock-auth-token', { expires: 1 }); // Store token in cookies
            router.push('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}
