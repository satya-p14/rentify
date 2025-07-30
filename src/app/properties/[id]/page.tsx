'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PropertyDetails() {
    const params = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [formData, setFormData] = useState({ date: '', time: '' });
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            const res = await fetch(`http://localhost:3001/properties/${params.id}`);
            const data = await res.json();
            setProperty(data);
        };
        fetchProperty();
        // const storedEmail = localStorage.getItem('tenantEmail');
        // setEmail(storedEmail);
    }, [params.id]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !property) return;

        const appointment = {
            id: Math.floor(Math.random() * 100) + 1,
            userId: localStorage.getItem("userId"),
            ownerId: property.ownerId,
            status: confirmed,
            propertyId: property.id,
            scheduledDate: formData.date,
            timestamp: new Date().toISOString(),
        };

        await fetch('http://localhost:3001/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointment),
        });

        setConfirmed(true);
        setShowModal(false);
        setFormData({ date: '', time: '' });
    };

    if (!property) return <div className="p-6">Loading property details...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
            <div className="relative w-full h-50 mb-4">
                <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover rounded"
                />
            </div>

            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-600 mb-4">{property.location}</p>
            <p className="mb-6">{property.description}</p>

            {email ? (
                <>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Book Appointment
                    </button>

                    {confirmed && (
                        <p className="text-green-600 mt-4">Appointment successfully booked!</p>
                    )}
                </>
            ) : (
                <p className="text-gray-600 mt-6">
                    Please <a href="/login" className="text-blue-600 underline">login</a> to book an appointment.
                </p>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
