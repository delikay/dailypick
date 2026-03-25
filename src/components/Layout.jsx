import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="site-shell">
            <Navbar />
            <main className="page-container flex-1 px-1 pb-8 pt-6 sm:px-2 lg:pt-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
