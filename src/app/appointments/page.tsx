'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Appointment {
    id: number;
    userId: number;
    ownerId: number;
    status: string;
    propertyId: number;
    scheduledDate: string;
    timestamp: string;
}

export default function MyBookings() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ scheduledDate: '', timestamp: '', status: '' });
    const [message, setMessage] = useState<string | null>(null);
    const email = typeof window !== 'undefined' ? localStorage.getItem('tenantEmail') : null;

    useEffect(() => {
        if (!email) return;
        const fetchBookings = async () => {
            const res = await fetch(`http://localhost:3001/appointments?email=${email}`);
            const data = await res.json();
            setAppointments(data.reverse());
        };
        fetchBookings();
    }, [email]);

    const handleDelete = async (id: number) => {
        editData.status = "cancelled";
        await fetch(`http://localhost:3001/appointments/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        setMessage('Appointment canceled successfully');
        toast.success(message);
    };

    const handleEditClick = (appt: Appointment) => {
        setEditingId(appt.id);
        setEditData({ scheduledDate: appt.scheduledDate, timestamp: appt.timestamp, status: "confirmed" });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        await fetch(`http://localhost:3001/appointments/${editingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });

        setAppointments((prev) =>
            prev.map((a) =>
                a.id === editingId ? { ...a, scheduledDate: editData.scheduledDate, timestamp: editData.timestamp, status: editData.status } : a
            )
        );
        setMessage('Appointment updated successfully');
        toast.success(message);
        setEditingId(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
            {appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appt) => (
                        <li key={appt.id} className="p-4 bg-white shadow rounded space-y-2">
                            <p><strong>Property ID:</strong> {appt.propertyId}</p>
                            {editingId === appt.id ? (
                                <form onSubmit={handleEditSubmit} className="space-y-2">
                                    <input
                                        type="date"
                                        required
                                        value={editData.scheduledDate}
                                        onChange={(e) => setEditData({ ...editData, scheduledDate: e.target.value })}
                                        className="border p-1 rounded"
                                    />
                                    <input
                                        type="time"
                                        required
                                        value={editData.timestamp}
                                        onChange={(e) => setEditData({ ...editData, timestamp: e.target.value })}
                                        className="border p-1 rounded"
                                    />
                                    <div className="flex gap-2">
                                        <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                                        <button type="button" onClick={() => setEditingId(null)} className="bg-gray-400 px-2 py-1 rounded text-white">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p><strong>Date:</strong> {appt.scheduledDate}</p>
                                    <p><strong>Time:</strong> {appt.timestamp}</p>
                                    <p><strong>Status:</strong> {appt.status}</p>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleEditClick(appt)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(appt.id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}
                            <p className="text-sm text-gray-500">
                                Booked on {new Date(appt.scheduledDate).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
