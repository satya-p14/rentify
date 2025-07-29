export const metadata = {
    title: 'Properties',
    description: 'Browse all listed properties',
};

export default function PropertiesLayout({ children }: { children: React.ReactNode; }) {
    return (
        <section className="p-6">
            <h1 className="text-2xl font-bold mb-4">Properties</h1>
            {children}
        </section>
    );
}
