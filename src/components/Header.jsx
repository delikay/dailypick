import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Music, Film, Archive, Home, Info, Send, Menu, X } from 'lucide-react';
import { formatDate, getToday } from '../utils/dateUtils';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const today = formatDate(getToday());

    return (
        <header className="glass sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center warm-shadow">
                                <Music className="w-5 h-5 text-white" />
                            </div>
                            <Film className="w-4 h-4 text-secondary absolute -bottom-1 -right-1" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                                My daily pick
                            </h1>
                            <p className="text-xs text-muted hidden sm:block">{today}</p>
                        </div>
                    </NavLink>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1 sm:gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-muted hover:text-text hover:bg-surface-light/50'
                                }`
                            }
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm font-medium">Home</span>
                        </NavLink>

                        <NavLink
                            to="/archive"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-muted hover:text-text hover:bg-surface-light/50'
                                }`
                            }
                        >
                            <Archive className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm font-medium">Archive</span>
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-muted hover:text-text hover:bg-surface-light/50'
                                }`
                            }
                        >
                            <Info className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm font-medium">About</span>
                        </NavLink>

                        <NavLink
                            to="/submit"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
                                    ? 'bg-primary text-white'
                                    : 'bg-secondary text-white hover:bg-secondary/90'
                                }`
                            }
                        >
                            <Send className="w-4 h-4" />
                            <span className="text-sm font-medium">Submit</span>
                        </NavLink>

                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-muted hover:text-text hover:bg-surface-light/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <nav className={`md:hidden mt-4 pt-4 border-t border-border mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
                    <div className="flex flex-col space-y-2">
                            <NavLink
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary/20 text-primary'
                                        : 'text-muted hover:text-text hover:bg-surface-light/50'
                                    }`
                                }
                            >
                                <Home className="w-5 h-5" />
                                <span className="font-medium">Home</span>
                            </NavLink>

                            <NavLink
                                to="/archive"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary/20 text-primary'
                                        : 'text-muted hover:text-text hover:bg-surface-light/50'
                                    }`
                                }
                            >
                                <Archive className="w-5 h-5" />
                                <span className="font-medium">Archive</span>
                            </NavLink>

                            <NavLink
                                to="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary/20 text-primary'
                                        : 'text-muted hover:text-text hover:bg-surface-light/50'
                                    }`
                                }
                            >
                                <Info className="w-5 h-5" />
                                <span className="font-medium">About</span>
                            </NavLink>

                            <NavLink
                                to="/submit"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary text-white'
                                        : 'bg-secondary text-white hover:bg-secondary/90'
                                    }`
                                }
                            >
                                <Send className="w-5 h-5" />
                                <span className="font-medium">Submit</span>
                            </NavLink>
                        </div>
                    </nav>
            </div>
        </header>
    );
};

export default Header;
