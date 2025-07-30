'use client';

import { useEffect, useState } from 'react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('all');

  const filteredProperties = properties.filter((p: Property) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const fetchProps = async () => {
    const res = await fetch('http://localhost:3001/properties');
    const data = await res.json();
    setProperties(data);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:3001/properties/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchProps();
  };

  const deleteProp = async (id: string) => {
    if (confirm('Delete property?')) {
      await fetch(`http://localhost:3001/properties/${id}`, { method: 'DELETE' });
      fetchProps();
    }
  };

  useEffect(() => {
    fetchProps();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">All Properties</h1>
      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {properties.map((prop: any) => (
          <div key={prop.id} className="border p-4 rounded shadow bg-white flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{prop.title}</h2>
              <p className="text-sm text-gray-500">{prop.location}</p>
              <p className="text-xs text-blue-600 capitalize">Status: {prop.status || 'pending'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(prop.id, 'approved')}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(prop.id, 'rejected')}
                className="bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
              <button
                onClick={() => deleteProp(prop.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
