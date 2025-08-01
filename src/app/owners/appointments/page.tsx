'use client';
import { startLoading, stopLoading } from '@/redux/slices/loaderSlice';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function OwnerAppointments() {
    const { userId } = useSelector((state: RootState) => state.auth);
    const ownerId = userId;
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const dispath = useDispatch();

    useEffect(() => {
        try {
            dispath(startLoading());
            async function fetchAppointments() {
                try {
                    const res = await fetch(`http://localhost:3001/appointments?ownerId=${ownerId}`);
                    const data = await res.json();
                    setAppointments(data);
                } catch (error) {
                    console.error('Failed to fetch appointments:', error);
                } finally {
                    setLoading(false);
                }
            }
            fetchAppointments();
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        } finally {
            dispath(stopLoading());
        }

    }, [ownerId]);

    if (loading) return <p className="text-gray-500">Loading appointments...</p>;
    if (appointments.length === 0) return <p className="text-gray-500">No appointments found.</p>;

    return (
        <div className="overflow-x-auto mt-6 p-2 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-2 text-left">My Appointments ( {appointments.length} )</h1>
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr className='border bg-white even:bg-gray-200'>
                        <th className="px-4 py-2 border">User Id</th>
                        <th className="px-4 py-2 border">Owner Id</th>
                        <th className="px-4 py-2 border">Property Id</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {appointments.map((appt) => (
                        <tr key={appt.id} className='border bg-white even:bg-gray-200'>
                            <td className="px-4 py-2 border">{appt.userId}</td>
                            <td className="px-4 py-2 border">{appt.ownerId}</td>
                            <td className="px-4 py-2 border">{appt.propertyId}</td>
                            <td className="px-4 py-2 border">{new Date(appt.scheduledDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">
                                <span
                                    className={`inline-block px-2 py-1 rounded text-xs ${appt.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : appt.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {appt.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
