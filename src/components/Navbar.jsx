import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Sparkles, X } from 'lucide-react';

const links = [
    { to: '/', label: 'Home' },
    { to: '/archive', label: 'Archive' },
    { to: '/about', label: 'About' },
];

const desktopLinkClasses = ({ isActive }) =>
    `inline-flex items-center rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-semibold ${
        isActive
            ? 'border-primary/18 bg-primary text-surface shadow-sm'
            : 'border-border/60 bg-surface/60 text-text'
    }`;

const mobileLinkClasses = ({ isActive }) =>
    `flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-[0.8125rem] font-semibold ${
        isActive
            ? 'border-primary/18 bg-primary text-surface'
            : 'border-border/60 bg-surface/70 text-text'
    }`;

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) {
            document.body.style.overflow = '';
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 md:sticky md:top-2 md:px-0 md:pt-0">
                <div className="page-container">
                    <div className="glass rounded-2xl px-3.5 py-2.5 sm:px-4">
                        <div className="flex items-center justify-between gap-3">
                            <NavLink to="/" className="flex min-w-0 items-center gap-2.5">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-surface shadow-sm">
                                    <Sparkles className="h-4 w-4" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-secondary">
                                        Daily archive
                                    </span>
                                    <span className="font-display block truncate text-xl leading-none tracking-[-0.03em] text-text sm:text-[1.55rem]">
                                        My Daily Pick
                                    </span>
                                </span>
                            </NavLink>

                            <div className="hidden items-center gap-2.5 md:flex">
                                <nav className="flex items-center gap-1.5" aria-label="Primary navigation">
                                    {links.map((link) => (
                                        <NavLink key={link.to} to={link.to} className={desktopLinkClasses}>
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </nav>

                                <div className="h-6 w-px bg-border/60" aria-hidden="true" />

                                <NavLink
                                    to="/submit"
                                    className={({ isActive }) =>
                                        `button-primary !w-auto !px-4 !py-2 !text-[0.8125rem] ${
                                            isActive ? 'ring-2 ring-primary/20' : ''
                                        }`
                                    }
                                >
                                    Suggest a Pick
                                </NavLink>
                            </div>

                            <button
                                type="button"
                                onClick={() => setMenuOpen((current) => !current)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface/75 text-text md:hidden"
                                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                            >
                                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-[4.5rem] md:hidden" aria-hidden="true" />

            {menuOpen && (
                <div className="fixed inset-0 z-40 md:hidden" aria-hidden={!menuOpen}>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMenuOpen(false)}
                        className="absolute inset-0 bg-[#0e1218]/40 backdrop-blur-sm"
                    />

                    <div className="page-container relative px-2 pt-[4.5rem]">
                        <nav
                            id="mobile-menu"
                            className="glass rounded-xl border border-border/50 p-2.5"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                        >
                            <div className="space-y-1.5">
                                {links.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        className={mobileLinkClasses}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span>{link.label}</span>
                                        
                                    </NavLink>
                                ))}

                                <NavLink
                                    to="/submit"
                                    onClick={() => setMenuOpen(false)}
                                    className="button-primary !mt-1.5 !flex !w-full !justify-center !text-[0.8125rem]"
                                >
                                    Suggest a Pick
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
