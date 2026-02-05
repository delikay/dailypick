import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
