'use client';
import { useEffect, useState } from 'react';

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = async () => {
    const res = await fetch('http://localhost:3001/properties');
    const data = await res.json();
    setProperties(data);
  };

  const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
    await fetch(`http://localhost:3001/properties/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchProperties();
  };

  const deleteProperty = async (id: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await fetch(`http://localhost:3001/properties/${id}`, {
        method: 'DELETE',
      });
      fetchProperties();
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-left">Manage Properties ( {properties.length} )</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left border">Property Id</th>
            <th className="p-2 text-left border">Title</th>
            <th className="p-2 text-left border">Location</th>
            <th className="p-2 text-left border">Type</th>
            <th className="p-2 text-left border">Price</th>
            <th className="p-2 text-left border">availability</th>
            <th className="p-2 text-left border">Status</th>
            <th className="p-2 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property: Property) => (
            <tr key={property.id} className="border bg-white even:bg-gray-200">
              <td className="p-2 border">{property.id}</td>
              <td className="p-2 border">{property.title}</td>
              <td className="p-2 border">{property.city}</td>
              <td className="p-2 border">{property.type}</td>
              <td className="p-2 border">₹{property.price.toLocaleString()}</td>
              <td className="p-2 border capitalize">{property.availability}</td>
              <td className="p-2 border">{property.status}</td>
              <td className="p-2 space-x-2">
                {property.status !== 'approved' && (
                  <button
                    onClick={() => updateStatus(property.id, 'approved')}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                )}
                {property.status !== 'rejected' && (
                  <button
                    onClick={() => updateStatus(property.id, 'rejected')}
                    className="px-2 py-1 bg-yellow-600 text-white rounded"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => deleteProperty(property.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
