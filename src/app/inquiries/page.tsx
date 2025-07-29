'use client';

import { useEffect, useState } from 'react';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    message: string;
    propertyId: number;
    submittedAt: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);

    useEffect(() => {
        const fetchInquiries = async () => {
            const res = await fetch('http://localhost:5000/inquiries');
            const data = await res.json();
            setInquiries(data.reverse()); // show newest first
        };
        fetchInquiries();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Inquiries</h1>

            {inquiries.length === 0 ? (
                <p>No inquiries yet.</p>
            ) : (
                <ul className="space-y-4">
                    {inquiries.map((inq) => (
                        <li key={inq.id} className="border p-4 rounded bg-white shadow">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold">{inq.name} &lt;{inq.email}&gt;</h2>
                                <span className="text-sm text-gray-500">
                                    {new Date(inq.submittedAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="mb-1 text-gray-700">
                                <strong>Message:</strong> {inq.message}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Property ID:</strong> {inq.propertyId}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
