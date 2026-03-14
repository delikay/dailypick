import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Sparkles, X } from 'lucide-react';

const links = [
    { to: '/', label: 'Home' },
    { to: '/archive', label: 'Archive' },
    { to: '/about', label: 'About' },
];

const desktopLinkClasses = ({ isActive }) =>
    `inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${
        isActive
            ? 'border-primary/20 bg-primary text-surface shadow-[0_14px_28px_rgba(16,46,30,0.18)]'
            : 'border-border/65 bg-surface/55 text-text hover:border-secondary/35 hover:bg-surface/90'
    }`;

const mobileLinkClasses = ({ isActive }) =>
    `flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold ${
        isActive
            ? 'border-primary/20 bg-primary text-surface'
            : 'border-border/70 bg-surface/70 text-text hover:border-secondary/35 hover:bg-surface'
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
            <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:sticky md:top-3 md:px-0 md:pt-0">
                <div className="page-container">
                    <div className="glass rounded-[1.75rem] px-4 py-3 sm:px-5">
                        <div className="flex items-center justify-between gap-3">
                            <NavLink to="/" className="flex min-w-0 items-center gap-3">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-surface shadow-[0_16px_30px_rgba(16,46,30,0.2)]">
                                    <Sparkles className="h-5 w-5" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-secondary">
                                        Daily archive
                                    </span>
                                    <span className="font-display block truncate text-2xl leading-none tracking-[-0.04em] text-text sm:text-[1.9rem]">
                                        My Daily Pick
                                    </span>
                                </span>
                            </NavLink>

                            <div className="hidden items-center gap-3 md:flex">
                                <nav className="flex items-center gap-2" aria-label="Primary navigation">
                                    {links.map((link) => (
                                        <NavLink key={link.to} to={link.to} className={desktopLinkClasses}>
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </nav>

                                <div className="h-7 w-px bg-border/75" aria-hidden="true" />

                                <NavLink
                                    to="/submit"
                                    className={({ isActive }) =>
                                        `button-primary !w-auto !px-5 !py-3 !text-sm ${
                                            isActive ? 'ring-2 ring-primary/25' : ''
                                        }`
                                    }
                                >
                                    Suggest a Pick
                                </NavLink>
                            </div>

                            <button
                                type="button"
                                onClick={() => setMenuOpen((current) => !current)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/75 bg-surface/75 text-text md:hidden"
                                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                            >
                                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-[5.4rem] md:hidden" aria-hidden="true" />

            {menuOpen && (
                <div className="fixed inset-0 z-40 md:hidden" aria-hidden={!menuOpen}>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMenuOpen(false)}
                        className="absolute inset-0 bg-[#0e1218]/48 backdrop-blur-sm"
                    />

                    <div className="page-container relative px-2 pt-[5.4rem]">
                        <nav
                            id="mobile-menu"
                            className="glass rounded-[1.6rem] border border-border/60 p-3"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                        >
                            <div className="space-y-2">
                                {links.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        className={mobileLinkClasses}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span>{link.label}</span>
                                        <span className="text-xs uppercase tracking-[0.14em] text-secondary/85">
                                            View
                                        </span>
                                    </NavLink>
                                ))}

                                <NavLink
                                    to="/submit"
                                    onClick={() => setMenuOpen(false)}
                                    className="button-primary !mt-2 !flex !w-full !justify-center !text-sm"
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


