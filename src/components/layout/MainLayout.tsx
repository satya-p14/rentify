import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function MainLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            <main className="min-h-screen p-6 bg-gray-50">{children}</main>
            <Footer />
        </>
    );
}
