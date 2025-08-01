export const metadata = {
    title: 'Property details',
    description: 'Browse all listed properties',
};

export default function PropertiesLayout({ children }: { children: React.ReactNode; }) {
    return (
        <section className="pt-0">
            {/* <h1 className="text-2xl font-bold mb-4">{metadata.title}</h1> */}
            {children}
        </section>
    );
}
