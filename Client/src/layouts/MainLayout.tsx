import Header from '@components/Header';
import Footer from '@components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />   {/* 這裡放主站 Header */}
            <main>{children}</main>
            <Footer />
        </>
    );
}