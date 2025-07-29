import Link from 'next/link';

export const metadata = {
    title: 'Admin Dashboard',
    description: 'Admin panel for managing the app',
};

export default function AdminLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-4 space-y-2">
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/properties">Properties</Link>
                <Link href="/admin/users">Users</Link>
                <Link href="/inquiries" className="block py-2 text-blue-600 hover:underline">
                    Inquiries
                </Link>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
    );
}
