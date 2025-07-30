'use client';

import { useEffect, useState } from 'react';

export default function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/appointments')
            .then((res) => res.json())
            .then(setAppointments);
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-xl font-bold mb-4">All Appointments</h1>
            <table className="w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">User</th>
                        <th className="p-2">Property ID</th>
                        <th className="p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt: any) => (
                        <tr key={appt.id} className="border-t">
                            <td className="p-2">{appt.userEmail}</td>
                            <td className="p-2">{appt.propertyId}</td>
                            <td className="p-2">{appt.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
