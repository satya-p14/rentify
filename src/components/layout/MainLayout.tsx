import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import GlobalLoader from '../common/GlobalLoader';

export default function MainLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <GlobalLoader />
                {children}
            </main>
            <Footer />
        </>
    );
}
