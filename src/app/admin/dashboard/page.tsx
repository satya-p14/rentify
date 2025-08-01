'use client';

import { startLoading, stopLoading } from '@/redux/slices/loaderSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [recentProperties, setRecentProperties] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const approvedCount = properties.filter((p: Property) => p.status === 'approved').length;
    const pendingCount = properties.filter((p: Property) => p.status === 'pending').length;
    const rejectedCount = properties.filter((p: Property) => p.status === 'rejected').length;
    const recentPropertiesCnt = recentProperties.filter((p: Property) => p.isNew === true).length;
    recentProperties;
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(startLoading());
            Promise.all([
                fetch('http://localhost:3001/users').then(res => res.json()),
                fetch('http://localhost:3001/properties').then(res => res.json()),
                fetch('http://localhost:3001/appointments').then(res => res.json()),
                fetch('http://localhost:3001/recent-properties').then(res => res.json())
            ]).then(([u, p, a, b]) => {
                setUsers(u);
                setProperties(p);
                setAppointments(a);
                setRecentProperties(b);
            });
        } catch (error) {
            console.log(error);
        }finally{
            dispatch(stopLoading());
        }

    }, []);

    return (
        <div className="bg-purple-100 p-2 max-w-6xl mx-auto">
            <h1 className="text-2xl mb-4 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
                <Card title="Users" count={users.length} />
                <Card title="Properties" count={properties.length} />
                <Card title="Appointments" count={appointments.length} />
                <Card title="Recent users" count={approvedCount} />
                <Card title="Recent properties" count={recentPropertiesCnt} />
                <Card title="Approved" count={approvedCount} />
                <Card title="Pending" count={pendingCount} />
                <Card title="Rejected" count={rejectedCount} />
            </div>
        </div>
    );
}

function Card({ title, count }: { title: string; count: number; }) {
    return (
        <div className="bg-white shadow p-4 rounded text-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-3xl font-bold mt-2">{count}</p>
        </div>
    );
}
