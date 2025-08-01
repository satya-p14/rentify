'use client';
import { startLoading, stopLoading } from '@/redux/slices/loaderSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function TenantAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const user = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('userId') || '{}')
    : {};

  const dispatch = useDispatch();

  const fetchAppointments = async () => {
    try {
      dispatch(startLoading());
      const res = await fetch(`http://localhost:3001/appointments?userId=${user}`);
      const data = await res.json();
      setAppointments(data);
      console.log(appointments);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Appointments ({appointments.length})</h2>

      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Owner ID</th>
            <th className="px-3 py-2 text-left">Property ID</th>
            <th className="px-3 py-2 text-left">Scheduled Date</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Timestamp</th>
            <th className="px-3 py-2 text-left">Booked By userId</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt:Appointment) => (
            <tr key={appt.id} className="border-t hover:bg-gray-50">
              <td className="px-3 py-2">{appt.id}</td>
              <td className="px-3 py-2">{appt.ownerId}</td>
              <td className="px-3 py-2">{appt.propertyId}</td>
              <td className="px-3 py-2">{appt.scheduledDate}</td>
              <td className="px-3 py-2 capitalize">{appt.status}</td>
              <td className="px-3 py-2">{appt.timestamp || '-'}</td>
              <td className="px-3 py-2">{appt.userId || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {appointments.length === 0 && (
        <p className="text-gray-500 mt-4">No appointments found.</p>
      )}
    </div>
  );
}
