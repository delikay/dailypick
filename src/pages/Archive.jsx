import { useState } from 'react';
import { Archive as ArchiveIcon, ChevronDown, Filter } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { usePageMeta } from '../hooks/usePageMeta';
import Layout from '../components/Layout';
import EntryCard from '../components/EntryCard';
import EmptyState from '../components/EmptyState';
import { moods } from '../utils/moodColors';
import { getPreviousDays } from '../utils/dateUtils';

const PER_PAGE = 9;
const ARCHIVE_WINDOW_DAYS = 36;

const Archive = () => {
    const { loading, getEntryByDate } = useEntries();
    const [selectedMood, setSelectedMood] = useState(null);
    const [page, setPage] = useState(1);

    usePageMeta({
        title: 'Archive',
        description: 'Browse the most recent 36 days of songs, movies, and moods from My Daily Pick.',
        canonicalPath: '/archive',
    });

    const recentDates = getPreviousDays(ARCHIVE_WINDOW_DAYS);
    const entries = recentDates
        .map((date) => getEntryByDate(date))
        .filter(Boolean);
    const moodCounts = moods.reduce((counts, mood) => {
        counts[mood.id] = entries.filter((entry) => entry.mood === mood.id).length;
        return counts;
    }, {});

    const filteredEntries = selectedMood
        ? entries.filter((entry) => entry.mood === selectedMood)
        : entries;

    const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PER_PAGE));
    const activePage = Math.min(page, totalPages);
    const startIndex = (activePage - 1) * PER_PAGE;
    const paginatedEntries = filteredEntries.slice(startIndex, startIndex + PER_PAGE);

    const handleMoodChange = (value) => {
        setSelectedMood(value || null);
        setPage(1);
    };

    const handleClearFilter = () => {
        setSelectedMood(null);
        setPage(1);
    };

    if (loading) {
        return (
            <Layout>
                <div className="section-frame flex h-72 items-center justify-center">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                        Loading archive
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6 sm:space-y-8">
                <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <header className="section-frame px-6 py-8 sm:px-8 lg:px-10">
                        <p className="editorial-kicker">Recent archive</p>
                        <h1 className="display-title mt-5 text-5xl text-text sm:text-6xl">
                            36 days of mood, music, and film.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                            The archive is intentionally tight: a rolling window of recent entries so each day still feels current.
                        </p>
                    </header>

                    <aside className="card-shell px-6 py-7 sm:px-7 sm:py-8">
                        <div className="relative z-[1]">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-primary text-surface">
                                <ArchiveIcon className="h-5 w-5" />
                            </div>
                            <p className="editorial-kicker">At a glance</p>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                        Entries
                                    </p>
                                    <p className="section-title mt-2 text-4xl text-text">
                                        {entries.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                        Filtered
                                    </p>
                                    <p className="section-title mt-2 text-4xl text-text">
                                        {filteredEntries.length}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-relaxed text-muted">
                                Use the mood filter to isolate a feeling and see only the entries that match it.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="section-frame px-6 py-6 sm:px-8 sm:py-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 text-sm font-semibold text-text">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                    <Filter className="h-4 w-4" />
                                </span>
                                <span>Filter the last 36 days by mood</span>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.96rem]">
                                Select one emotional register to narrow the archive. Each option shows how many recent entries sit inside that mood.
                            </p>
                        </div>

                        {selectedMood && (
                            <button
                                onClick={handleClearFilter}
                                type="button"
                                className="button-ghost w-full sm:w-auto"
                            >
                                Clear filter
                                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary/80">
                                    {entries.length - filteredEntries.length} hidden
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="accent-rule my-6" />

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-end">
                        <div>
                            <label
                                htmlFor="archive-mood-filter"
                                className="mb-3 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted"
                            >
                                Mood selection
                            </label>
                            <div className="premium-select-shell">
                                <select
                                    id="archive-mood-filter"
                                    value={selectedMood || ''}
                                    onChange={(event) => handleMoodChange(event.target.value)}
                                    className="premium-select"
                                >
                                    <option value="">All moods ({entries.length})</option>
                                    {moods.map((mood) => (
                                        <option key={mood.id} value={mood.id}>
                                            {mood.label} ({moodCounts[mood.id]})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="premium-select__icon h-4 w-4" />
                            </div>
                        </div>

                        <div className="surface-panel rounded-[1.3rem] border border-border/60 bg-surface/65 px-4 py-4 sm:px-5">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                Current view
                            </p>
                            <p className="mt-2 text-base font-semibold text-text">
                                {selectedMood
                                    ? `${moods.find((mood) => mood.id === selectedMood)?.label} mood`
                                    : 'All moods'}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-muted">
                                {selectedMood
                                    ? `${filteredEntries.length} entries shown from the last 36 days.`
                                    : `Showing all ${entries.length} entries in the active archive window.`}
                            </p>
                        </div>
                    </div>

                    {selectedMood && (
                        <p className="mt-5 text-sm leading-relaxed text-muted">
                            Showing <span className="font-semibold text-text">{filteredEntries.length}</span>{' '}
                            entries tagged{' '}
                            <span className="font-semibold text-text">
                                {moods.find((mood) => mood.id === selectedMood)?.label}
                            </span>
                            .
                        </p>
                    )}
                </section>

                {filteredEntries.length === 0 ? (
                    <EmptyState
                        icon={ArchiveIcon}
                        title={selectedMood ? 'No entries match this mood' : 'No entries yet'}
                        description={
                            selectedMood
                                ? 'Try a different mood or clear the filter to return to the full 36-day view.'
                                : 'Start curating daily songs and movies to build out the archive.'
                        }
                    />
                ) : (
                    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {paginatedEntries.map((entry) => (
                            <EntryCard key={entry.id} entry={entry} />
                        ))}
                    </section>
                )}

                {filteredEntries.length > PER_PAGE && (
                    <section className="section-frame px-6 py-5 sm:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted">
                                Page <span className="font-semibold text-text">{activePage}</span> of{' '}
                                <span className="font-semibold text-text">{totalPages}</span>
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row">
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
