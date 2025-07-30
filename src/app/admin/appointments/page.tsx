'use client';

import TimeDisplay from '@/components/common/TimeDisplay';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminAppointmentsPage() {
    const { t } = useTranslation();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [tenantEmail, setTenantEmail] = useState('');

    const fetchAppointments = async () => {
        const res = await fetch('http://localhost:3001/appointments');
        const data = await res.json();
        setAppointments(data);
    };

    // const fetchTenantEmail = async (id: string) => {
    //     const res = await fetch(`http://localhost:3001/users/${id}`, { method: 'GET' });
    //     const data = await res.json();
    //     setTenantEmail(data.email);        
    // };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t('All Appointments')}</h1>

            {appointments.length === 0 ? (
                <p className="text-gray-600">No appointments found.</p>
            ) : (
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left border">Property ID</th>
                            <th className="p-2 text-left border">Owner ID</th>
                            {/* <th className="p-2 text-left border">Tenant Email</th> */}
                            <th className="p-2 text-left border">Date</th>
                            <th className="p-2 text-left border">Time</th>
                            <th className="p-2 text-left border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={index} className="border">
                                <td className="p-2 border">{appt.propertyId}</td>
                                <td className="p-2 border">{appt.ownerId}</td>
                                {/* <td className="p-2 border">{tenantEmail}</td> */}
                                <td className="p-2 border">{appt.scheduledDate}</td>
                                <td className="p-2 border"><TimeDisplay isoTime={appt.timestamp} /></td>
                                <td className="p-2 border capitalize">{appt.status || 'pending'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
