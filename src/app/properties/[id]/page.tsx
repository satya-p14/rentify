'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slices/loaderSlice';

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [sliderRef] = useKeenSlider<HTMLDivElement>({ loop: true });
    const [userEmail, setUserEmail] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const dispatch = useDispatch();
    // const pathname = usePathname();

    useEffect(() => {
        if (!id) return;
        try {
            dispatch(startLoading());
            fetch(`http://localhost:3001/properties/${id}`)
                .then(res => res.json())
                .then(setProperty)
                .finally(() => setLoading(false));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(stopLoading());
        }
    }, [id]);

    useEffect(() => {
        const userData = localStorage.getItem('userId');
        if (userData) {
            setLoggedInUser(JSON.parse(userData));
            // router.push(`/login?redirect=${pathname}`);
        }
    }, []);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userEmail || !appointmentDate) return;
        const appointment: Appointment = {
            id: (Math.floor(Math.random() * 100) + 1).toString(),
            userId: localStorage.getItem('userId')?.toString() || 'null',
            ownerId: property?.ownerId.toString() || 'null',
            status: property?.status || '',
            propertyId: property?.id || '',
            scheduledDate: new Date().toISOString(),
            timestamp: new Date().toISOString(),
            tenantEmail: localStorage.getItem('userEmail') || ''
        };
        try {
            dispatch(startLoading());
            const res = await fetch('http://localhost:3001/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment),
            });

            if (res.ok) {
                setBookingSuccess(true);
                setUserEmail('');
                setAppointmentDate('');
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(stopLoading());
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (!property) return <p className="p-4">Property not found.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <button
                onClick={() => router.push('/properties')}
                className="mb-6 inline-block text-blue-600 hover:underline text-sm"
            >
                ← Back to Property List
            </button>
            {/* Carousel */}
            <div className="relative mb-6">
                <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden h-64 sm:h-80">
                    {property.images?.map((img, idx) => (
                        <div key={idx} className="keen-slider__slide relative">
                            <Image src={img} alt={`Image ${idx}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Details */}
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <p className="text-gray-600 mb-2">{property.city}</p>
            <p className="text-sm mb-1">
                <strong>Type:</strong> {property.type}
            </p>
            <p className="text-sm mb-1">
                <strong>Price:</strong> ${property.price}
            </p>
            <p className="text-sm mb-1">
                <strong>Description:</strong> {property.description || 'N/A'}
            </p>
            <p className="text-sm mt-1">
                <span className="font-medium">Date:</span> {property.datePosted || 'N/A'}
            </p>
            <p className="text-sm">
                <span className="font-medium">Availabality:</span> {property.availability ?? 'N/A'}
            </p>

            {/* Booking Form */}
            <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>

                {!loggedInUser ? (
                    <p className="text-red-500">
                        Please <a href="/login" className="underline text-blue-600">log in</a> to book an appointment.
                    </p>
                ) : (
                    <>
                        {bookingSuccess && (
                            <p className="text-green-600 mb-4">Appointment booked successfully!</p>
                        )}

                        <form onSubmit={handleBooking} className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Email</label>
                                <input
                                    type="email"
                                    className="mt-1 w-full border rounded px-3 py-2 bg-gray-100"
                                    value={loggedInUser.email}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
                                <input
                                    type="date"
                                    className="mt-1 w-full border rounded px-3 py-2"
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                            >
                                Book Appointment
                            </button>
                        </form>
                    </>
                )}
            </div>
            <button
                onClick={() => router.push('/properties')}
                className="mt-6 inline-block text-blue-600 hover:underline text-sm"
            >
                ← Back to Property List
            </button>
        </div>
    );
}
