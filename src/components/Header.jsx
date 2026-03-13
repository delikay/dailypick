import { useState } from 'react';
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
    const today = formatDate(getToday());

    return (
        <header className="sticky top-3 z-50">
            <div className="page-container">
                <div className="glass rounded-[2rem] px-4 py-4 sm:px-5">
                    <div className="flex items-center justify-between gap-4">
                        <NavLink to="/" className="group flex min-w-0 items-center gap-4">
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
                            {navItems.map(({ to, label, icon: Icon }) => (
                                <NavLink key={to} to={to} className={getNavClasses}>
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
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
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>

                    <nav
                        id="mobile-navigation"
                        className={`mobile-menu md:hidden ${mobileMenuOpen ? 'open mt-4 pt-4' : ''}`}
                        aria-hidden={!mobileMenuOpen}
                    >
                        <div className="section-frame space-y-2 p-3">
                            <div className="rounded-2xl bg-surface/80 px-4 py-3">
                                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary">
                                    Today
                                </p>
                                <p className="mt-1 text-sm font-semibold text-text">{today}</p>
                            </div>

                            {navItems.map(({ to, label, icon: Icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                                            isActive
                                                ? 'bg-primary text-surface'
                                                : 'bg-surface/75 text-text'
                                        }`
                                    }
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
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
        </header>
    );
};

export default Header;
