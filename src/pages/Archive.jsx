import { useState } from 'react';
import { Archive as ArchiveIcon } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { usePageMeta } from '../hooks/usePageMeta';
import Layout from '../components/Layout';
import EntryCard from '../components/EntryCard';
import EmptyState from '../components/EmptyState';
import { getPreviousDays } from '../utils/dateUtils';

const PER_PAGE = 9;
const ARCHIVE_WINDOW_DAYS = 36;

const Archive = () => {
    const { loading, getEntryByDate } = useEntries();
    const [page, setPage] = useState(1);

    usePageMeta({
        title: 'Archive',
        description: 'Browse the most recent 36 days of songs, movies, and notes from My Daily Pick.',
        canonicalPath: '/archive',
    });

    const recentDates = getPreviousDays(ARCHIVE_WINDOW_DAYS);
    const entries = recentDates
        .map((date) => getEntryByDate(date))
        .filter(Boolean);
    const totalPages = Math.max(1, Math.ceil(entries.length / PER_PAGE));
    const activePage = Math.min(page, totalPages);
    const startIndex = (activePage - 1) * PER_PAGE;
    const paginatedEntries = entries.slice(startIndex, startIndex + PER_PAGE);

    if (loading) {
        return (
            <Layout>
                <div className="section-frame flex h-56 items-center justify-center">
                    <div className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-muted">
                        Loading archive
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-5 sm:space-y-6">
                <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                    <header className="section-frame px-5 py-6 sm:px-6 lg:px-8">
                        <p className="editorial-kicker">Recent archive</p>
                        <h1 className="display-title mt-4 text-4xl text-text sm:text-5xl">
                            36 days of songs, films, and notes.
                        </h1>
                        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                            The archive is intentionally tight: a rolling window of recent entries so each day still feels current.
                        </p>
                    </header>

                    <aside className="card-shell px-5 py-6 sm:px-6 sm:py-7">
                        <div className="relative z-[1]">
                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-surface">
                                <ArchiveIcon className="h-4 w-4" />
                            </div>
                            <p className="editorial-kicker">At a glance</p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div>
                                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                        Entries
                                    </p>
                                    <p className="section-title mt-1.5 text-3xl text-text">
                                        {entries.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                        On this page
                                    </p>
                                    <p className="section-title mt-1.5 text-3xl text-text">
                                        {paginatedEntries.length}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
                                Browse the latest entries in order and open any day for the full pairing.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="section-frame px-5 py-5 sm:px-6 sm:py-6">
                    <div className="grid gap-3.5 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-end">
                        <div>
                            <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                Archive window
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                This page covers the most recent {ARCHIVE_WINDOW_DAYS} days, ordered from newest to oldest.
                            </p>
                        </div>

                        <div className="surface-panel rounded-xl border border-border/50 bg-surface/65 px-3.5 py-3 sm:px-4">
                            <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                Current view
                            </p>
                            <p className="mt-1.5 text-sm font-semibold text-text">
                                Latest archive entries
                            </p>
                            <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">
                                Showing {paginatedEntries.length} of {entries.length} entries in the active archive window.
                            </p>
                        </div>
                    </div>
                </section>

                {entries.length === 0 ? (
                    <EmptyState
                        icon={ArchiveIcon}
                        title="No entries yet"
                        description="Start curating daily songs and movies to build out the archive."
                    />
                ) : (
                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {paginatedEntries.map((entry) => (
                            <EntryCard key={entry.id} entry={entry} />
                        ))}
                    </section>
                )}

                {entries.length > PER_PAGE && (
                    <section className="section-frame px-5 py-4 sm:px-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[0.8125rem] text-muted">
                                Page <span className="font-semibold text-text">{activePage}</span> of{' '}
                                <span className="font-semibold text-text">{totalPages}</span>
                            </p>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <button
                                    onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                                    type="button"
                                    disabled={activePage === 1}
                                    className="button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                <button
                                    onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                                    type="button"
                                    disabled={activePage === totalPages}
                                    className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next page
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default Archive;
