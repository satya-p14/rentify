import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-blue-800 text-white p-4">
                <h2 className="text-lg font-bold mb-6">Dashboard</h2>
                <nav className="flex flex-col gap-2">
                    <Link href="/dashboard" className="hover:underline">Overview</Link>
                    <Link href="/dashboard/enquiries" className="hover:underline">Enquiries</Link>
                    <Link href="/dashboard/settings" className="hover:underline">Settings</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
    );
}
