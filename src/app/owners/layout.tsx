import Link from 'next/link';

export default function OwnerLayout({ children }: { children: React.ReactNode; }) {
    return (
        <section>
            {/* <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
            <nav className="mb-6 space-x-4">
                <Link href="/owners">Home</Link>
                <Link href="/owners/listings">Listings</Link>
                <Link href="/owners/appointments">Appointments</Link>
            </nav> */}
            <div>{children}</div>
        </section>
    );
}
