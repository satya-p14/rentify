'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store';
import CustomDropdown from "@/components/common/CustomDropdown";
import { startLoading, stopLoading } from "@/redux/slices/loaderSlice";

const propertyType = ['Apartment', 'House', 'Studio', 'Penthouse', 'Villa'];
const availabilityType = ['Available', 'Not Available'];

const OwnerPropertyList = () => {
    const [adding, setAdding] = useState<Property | null>(null);
    const ownerId = useSelector((state: RootState) => state.auth).userId;
    const [properties, setProperties] = useState<Property[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newType, setNewType] = useState('');
    const [newAvailability, setNewAvailability] = useState('');
    // editing
    const [editing, setEditing] = useState<Property | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editType, setEditType] = useState([]);
    const [editAvailability, setEditAvailability] = useState([]);
    const [editStatus, setEditStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispath = useDispatch();

    const fetchProperties = async () => {
        setLoading(true);
        setError('');
        try {
            dispath(startLoading());
            const res = await fetch(`http://localhost:3001/properties?ownerId=${ownerId}`);
            if (!res.ok) throw new Error('Failed to load properties');
            const data = await res.json();
            setProperties(data);
        } catch (err: any) {
            setError(err.message || 'Error loading properties');
        } finally {
            setLoading(false);
            dispath(stopLoading());
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [ownerId]);

    const deleteProperty = async (id: number) => {
        const confirm = window.confirm('Are you sure you want to delete this property?');
        if (!confirm) return;
        try {
            dispath(startLoading());
            const res = await fetch(`http://localhost:3001/properties/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');
            await fetchProperties();
        } catch (err) {
            alert('Error deleting property');
        } finally {
            dispath(stopLoading());
        }
    };

    const updateProperty = async () => {
        if (!editing) return;
        try {
            dispath(startLoading());
            const updated = {
                ...editing,
                title: editTitle,
                description: editDescription,
                price: Number(editPrice),
                location: editLocation,
                type: editType,
                availability: editAvailability,
                status: editStatus,
            };
            await fetch(`http://localhost:3001/properties/${editing.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });

            setProperties((prev: any) =>
                prev.map((p: Property) => (p.id === editing.id ? { ...p, ...updated } : p))
            );
            setEditing(null);
        } catch (error) {
            console.log(error);
        } finally {
            dispath(stopLoading());
        }
    };

    const openEdit = (property: Property) => {
        setEditing(property);
        setEditTitle(property.title);
        setEditDescription(property.description);
        setEditPrice(property.price.toString());
        setEditLocation(property.city);
        // setEditType(property.type);
        // setEditAvailability(property.availability);
        setEditStatus(property.status);
    };

    const openNewPropertyForm = (property: Property) => {
        setAdding(property);
    };


    const addNewProperty = async () => {
        const newProp: Property = {
            title: newTitle,
            ownerId: ownerId !== null ? ownerId : '',
            description: newDescription,
            price: newPrice,
            id: (Math.floor(Math.random() * 100) + 1).toString(),
            location: newLocation,
            images: [],
            city: newLocation,
            type: newType,
            highlight: false,
            datePosted: new Date().toDateString(),
            verified: false,
            availability: newAvailability,
            status: 'pending',
            isNew: true
        };
        try {
            dispath(startLoading());
            const res = await fetch(`http://localhost:3001/properties`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProp),
            });
            const created = await res.json();
            setProperties(prev => [...prev, created]);
            setNewTitle('');
            setAdding(null);
        } catch (error) {
            console.log(error);
        } finally {
            dispath(stopLoading());
        }
    };

    return (
        <>
            <div className="p-2 max-w-6xl mx-auto">
                <div className="inline-block p-2 w-full">
                    <h1 className="text-2xl font-bold mb-2 text-left">Manage Properties ( {properties.length} )</h1>
                    <button
                        onClick={() => openNewPropertyForm({
                            id: "",
                            title: "",
                            location: "",
                            images: [],
                            description: "",
                            city: "",
                            type: "",
                            price: "",
                            ownerId: "",
                            highlight: false,
                            datePosted: "",
                            verified: false,
                            availability: "",
                            status: "pending",
                            isNew: false
                        })}
                        className="px-2 py-1 bg-blue-600 text-white rounded -mt-8 float-right"
                    >
                        Add new property
                    </button>
                </div>

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
                                    <button
                                        onClick={() => openEdit(property)}
                                        className="px-2 py-1 bg-green-600 text-white rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProperty(Number(property.id))}
                                        className="px-2 py-1 bg-red-600 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Edit Modal */}
                {editing && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg w-[600px] space-y-4 relative">
                            <h3 className="text-lg font-bold">Edit Property</h3>
                            <input
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Title"
                            />
                            <input
                                value={editDescription}
                                onChange={e => setEditDescription(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Description"
                            />
                            <input
                                value={editPrice}
                                onChange={e => setEditPrice(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Price"
                                type="number"
                            />
                            <input
                                value={editLocation}
                                onChange={e => setEditLocation(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Location"
                            />
                            {/* <input
                                value={editType}
                                onChange={e => setEditType(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Property Type"
                            />

                            <input
                                value={editAvailability}
                                onChange={e => setEditAvailability(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Property Availability"
                            /> */}

                            <input
                                value={editStatus}
                                onChange={e => setEditStatus(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Property Status"
                            />

                            <div className="flex justify-end space-x-2">
                                <button onClick={() => setEditing(null)} className="text-gray-500">Cancel</button>
                                <button
                                    onClick={updateProperty}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* add property */}
                {adding && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg w-[600px] space-y-4 relative">
                            <h3 className="text-lg font-bold">Add New Property</h3>
                            <input
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Title"
                            />
                            <input
                                value={newDescription}
                                onChange={e => setNewDescription(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Description"
                            />
                            <input
                                value={newPrice}
                                onChange={e => setNewPrice(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Price"
                                type="number"
                            />
                            <input
                                value={newLocation}
                                onChange={e => setNewLocation(e.target.value)}
                                className="w-full border px-2 py-1"
                                placeholder="Location"
                            />

                            <CustomDropdown
                                // label="Property Type"
                                options={propertyType}
                                selected={newType}
                                onChange={setNewType}
                                placeholder="Select property type"
                            />

                            <CustomDropdown
                                // label="Availibility"
                                options={availabilityType}
                                selected={newAvailability}
                                onChange={setNewAvailability}
                                placeholder="Select Availability"
                            />
                            <div className="flex justify-end space-x-2">
                                <button onClick={() => setAdding(null)} className="text-gray-500">Cancel</button>
                                <button
                                    onClick={addNewProperty}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OwnerPropertyList;