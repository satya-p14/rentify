'use client';
import { useEffect, useState } from 'react';

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: '',
    email: '',
    role: '',
    name: '',
    phone: '',
    verified: false
  });

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3001/users');
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    }
  };

  const handleEditClick = (user: User) => {
    setFormData(user);
    setEditingUser(user);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdateUser = async (user: User) => {
    await fetch(`http://localhost:3001/users/${formData.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setEditingUser(null);
    fetchUsers();
  };

  const toggleVerify = async (user: User) => {
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified: !user.verified }),
    });
    fetchUsers();
  };

  const changeRole = async (id: string, newRole: string) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-left">Manage Users ( {users.length} )</h1>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="p-2 text-left">#</th> */}
            <th className="p-2 text-center border">Id</th>
            <th className="p-2 text-center border">Name</th>
            <th className="p-2 text-center border">Email</th>
            <th className="p-2 text-center border">Role</th>
            <th className="p-2 text-center border">Verified</th>
            <th className="p-2 text-center border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border bg-white even:bg-gray-200">
              {/* <td className="p-2 border">{index + 1}</td> */}
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 capitalize border">{user.role}</td>
              <td className="p-2 border">{user.verified ? 'Yes' : 'No'}</td>
              <td className="p-2 space-x-2 border">
                <button
                  onClick={() => handleEditClick(user)}
                  className="px-2 py-1 bg-yellow-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleVerify(user)}
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  {user.verified ? 'Unverify' : 'Verify'}
                </button>
                <button
                  onClick={() => changeRole(user.id, user.role === 'tenant' ? 'owner' : 'tenant')}
                  className="px-2 py-1 bg-purple-600 text-white rounded"
                >
                  Make {user.role === 'tenant' ? 'Owner' : 'Tenant'}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[600px] relative">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>

            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={handleFormChange}
              />
              Verified
            </label>



            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
