'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
    id: number;
    title: string;
    location: string;
    image: string;
    description: string;
    city: string;
    type: string;
    price: number,
    ownerId: number;
    highlight: boolean;
    datePosted: string;
    verified: boolean;
    availability: string;
}

export default function PropertyListPage() {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const res = await fetch('http://localhost:3001/properties');
            const data = await res.json();
            setProperties(data);
        };
        fetchProperties();
    }, []);

    return (
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`}
                    className="block bg-white shadow rounded overflow-hidden">
                    <div className="relative w-full h-48">
                        <img
                            key={property.id}
                            src={property.image}
                            alt={property.title}                            
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">{property.title}</h2>
                        <p className="text-gray-600">{property.location}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
