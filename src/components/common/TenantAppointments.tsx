'use client';
import { useEffect, useState } from 'react'

export default function TenantAppointments() {
  const [appointments, setAppointments] = useState([])

  const user = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('userId') || '{}')
    : {}

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/appointments?customerId=${user.id}`)
        .then((res) => res.json())
        .then(setAppointments)
    }
  }, [user])

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked.</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a: any) => (
            <li key={a.id} className="border p-4 rounded">
              <strong>{a.propertyName}</strong> on{' '}
              {new Date(a.date).toLocaleString()} –{' '}
              <span className="capitalize">{a.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
