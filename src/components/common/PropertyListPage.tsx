'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertyCard from './PropertyCard';

export default function PropertyListPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:3001/properties')
            .then((res) => res.json())
            .then(setProperties)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-gray-500">Loading properties...</p>;
    if (properties.length === 0) return <p>No properties found.</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-6">All Properties</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} router={router} />
                ))}
            </div>
        </div>
    );
}


