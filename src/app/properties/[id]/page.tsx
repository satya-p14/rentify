'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Property {
    id: number;
    title: string;
    location: string;
    image: string;
    description: string;
}

export default function PropertyDetails() {
    const params = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            const res = await fetch(`http://localhost:3001/properties/${params.id}`);
            const data = await res.json();
            setProperty(data);
        };
        fetchProperty();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const inquiry = {
            ...form,
            propertyId: property?.id,
            submittedAt: new Date().toISOString(),
        };

        await fetch('http://localhost:3001/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiry),
        });

        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
    };

    if (!property) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <div className="relative w-full h-96 mb-6">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover rounded"
                />
            </div>

            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-600 mb-4">{property.location}</p>
            <p className="mb-6">{property.description}</p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold mb-2">Enquire about this property</h2>

            {submitted && (
                <p className="text-green-600 mb-4">Inquiry submitted successfully!</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded h-32"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Submit Inquiry
                </button>
            </form>
        </div>
    );
}
