export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                {children}
            </div>
        </main>
    );
}
