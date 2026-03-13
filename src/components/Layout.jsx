import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="site-shell">
            <div className="pointer-events-none absolute left-6 top-24 h-40 w-40 rounded-full bg-secondary/12 blur-3xl" />
            <div className="pointer-events-none absolute right-8 top-[20rem] h-56 w-56 rounded-full bg-primary/6 blur-3xl" />
            <Header />
            <main className="page-container flex-1 px-1 pb-12 pt-8 sm:px-2 lg:pt-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
