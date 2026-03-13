import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Music, Film, Archive, Home, Info, Send, Menu, X } from 'lucide-react';
import { formatDate, getToday } from '../utils/dateUtils';

const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/archive', label: 'Archive', icon: Archive },
    { to: '/about', label: 'About', icon: Info },
];

const getNavClasses = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${
        isActive
            ? 'bg-primary text-surface shadow-[0_16px_28px_rgba(24,21,18,0.16)]'
            : 'text-muted hover:bg-surface/70 hover:text-text'
    }`;

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollLockYRef = useRef(0);
    const today = formatDate(getToday());

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const handleViewportChange = (event) => {
            if (event.matches) {
                setMobileMenuOpen(false);
            }
        };

        mediaQuery.addEventListener('change', handleViewportChange);

        return () => {
            mediaQuery.removeEventListener('change', handleViewportChange);
        };
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (!mobileMenuOpen) {
            const lockedScrollY = scrollLockYRef.current;

            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.documentElement.style.overflow = '';

            if (lockedScrollY) {
                window.scrollTo(0, lockedScrollY);
                scrollLockYRef.current = 0;
            }

            return;
        }

        scrollLockYRef.current = window.scrollY;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollLockYRef.current}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            const lockedScrollY = scrollLockYRef.current;

            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.documentElement.style.overflow = '';

            if (lockedScrollY) {
                window.scrollTo(0, lockedScrollY);
                scrollLockYRef.current = 0;
            }
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header className="sticky top-3 z-50">
                <div className="page-container">
                    <div className="glass relative rounded-[2rem] px-4 py-4 sm:px-5">
                        <div className="flex items-center justify-between gap-4">
                            <NavLink
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="group flex min-w-0 items-center gap-4"
                            >
                                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1.1rem] bg-primary text-surface shadow-[0_18px_34px_rgba(24,21,18,0.2)]">
                                    <Music className="h-5 w-5" />
                                    <Film className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full bg-surface p-0.5 text-secondary shadow-sm" />
                                </div>
                                <div className="min-w-0">
                                    <span className="mb-1 block text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-secondary">
                                        Daily journal
                                    </span>
                                    <span className="font-display block truncate text-[1.8rem] leading-none tracking-[-0.05em] text-text">
                                        My Daily Pick
                                    </span>
                                </div>
                            </NavLink>

                            <div className="hidden items-center gap-3 xl:flex">
                                <div className="rounded-full border border-border/70 bg-surface/60 px-4 py-2 text-right">
                                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary">
                                        Today
                                    </p>
                                    <p className="text-sm font-semibold text-text">{today}</p>
                                </div>
                            </div>

                            <nav className="hidden items-center gap-2 md:flex">
                                {navItems.map((item) => (
                                    <NavLink key={item.to} to={item.to} className={getNavClasses}>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                                <NavLink
                                    to="/submit"
                                    className={({ isActive }) =>
                                        `button-primary !w-auto !px-5 !py-3 !text-sm ${
                                            isActive ? 'ring-2 ring-primary/20' : ''
                                        }`
                                    }
                                >
                                    <Send className="h-4 w-4" />
                                    <span>Suggest</span>
                                </NavLink>
                            </nav>

                            <button
                                onClick={() => setMobileMenuOpen((open) => !open)}
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface/70 text-text md:hidden"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-navigation"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden" aria-hidden={!mobileMenuOpen}>
                    <button
                        type="button"
                        className="absolute inset-0 bg-[rgba(8,10,14,0.72)] backdrop-blur-sm"
                        aria-label="Close menu"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    <div className="page-container relative flex min-h-screen items-start px-4 pb-6 pt-[5.75rem]">
                        <nav
                            id="mobile-navigation"
                            className="w-full rounded-[1.75rem] border border-white/8 bg-[#11151b]/96 p-3 shadow-[0_28px_60px_rgba(6,8,12,0.38)]"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                        >
                            <div className="space-y-2">
                                <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
                                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary/90">
                                        Today
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-surface">{today}</p>
                                </div>

                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                                                isActive
                                                    ? 'bg-secondary text-primary-dark shadow-[0_14px_26px_rgba(181,108,52,0.2)]'
                                                    : 'border border-white/8 bg-white/6 text-surface/92'
                                            }`
                                        }
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}

                                <NavLink
                                    to="/submit"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="button-primary !flex !w-full !justify-center !px-4 !py-3.5 !text-sm"
                                >
                                    <Send className="h-4 w-4" />
                                    <span>Suggest a Pick</span>
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
