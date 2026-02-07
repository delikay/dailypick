import { useState, useEffect } from 'react';
import { Archive as ArchiveIcon, Filter } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import Layout from '../components/Layout';
import EntryCard from '../components/EntryCard';
import EmptyState from '../components/EmptyState';
import { moods } from '../utils/moodColors';
import { getPreviousDays } from '../utils/dateUtils';

const Archive = () => {
    const { getAllEntries, loading, getEntryByDate } = useEntries();
    const [selectedMood, setSelectedMood] = useState(null);

    // Get the last 18 days from today
    const recentDates = getPreviousDays(18);
    
    // Find entries for those dates (if they exist)
    const entries = recentDates
        .map(date => getEntryByDate(date))
        .filter(entry => entry !== undefined);
    
    const filteredEntries = selectedMood
        ? entries.filter(e => e.mood === selectedMood)
        : entries;

    // Pagination: 9 entries per page
    const [page, setPage] = useState(1);
    const PER_PAGE = 9;
    const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PER_PAGE));
    useEffect(() => {
        setPage(1);
    }, [selectedMood]);

    const startIndex = (page - 1) * PER_PAGE;
    const paginatedEntries = filteredEntries.slice(startIndex, startIndex + PER_PAGE);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse-soft text-muted">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="animate-fade-in">
                {/* Header */}
                <header className="text-center mb-10">
                    <div className="inline-flex items-center justify-center gap-3 mb-3">
                        <ArchiveIcon className="w-9 h-9 text-primary" />
                        <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
                            Archive
                        </h1>
                    </div>
                    <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
                        {entries.length} {entries.length === 1 ? 'entry' : 'entries'} from the last 18 days
                    </p>
                </header>

                {/* Controls */}
                <section className="mb-8">
                    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-muted">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">Filter by mood</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <select
                                value={selectedMood || ''}
                                onChange={(e) => setSelectedMood(e.target.value || null)}
                                className="bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-secondary/30"
                            >
                                <option value="">All moods</option>
                                {moods.map(mood => (
                                    <option key={mood.id} value={mood.id}>
                                        {mood.emoji} {mood.label}
                                    </option>
                                ))}
                            </select>

                            {selectedMood && filteredEntries.length > 0 && (
                                <button
                                    onClick={() => setSelectedMood(null)}
                                    className="px-4 py-3 rounded-xl bg-surface border border-border text-sm font-medium text-text hover:bg-surface-hover transition-colors"
                                >
                                    Clear filter ({entries.length - filteredEntries.length} hidden)
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Entries Grid */}
                {filteredEntries.length === 0 ? (
                    <div className="max-w-3xl mx-auto">
                        <EmptyState
                            icon={ArchiveIcon}
                            title={selectedMood ? "No entries with this mood" : "No entries yet"}
                            description={
                                selectedMood
                                    ? "Try selecting a different mood or clear the filter."
                                    : "Start curating your daily songs and movies to build your archive."
                            }
                        />
                    </div>
                ) : (
                    <section className="max-w-6xl mx-auto">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedEntries.map(entry => (
                                <EntryCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Pagination Controls */}
                {filteredEntries.length > PER_PAGE && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors ${page === 1 ? 'opacity-50 cursor-not-allowed border-border bg-surface' : 'border-border bg-surface hover:bg-surface-hover text-text'}`}
                        >
                            Prev
                        </button>

                        <div className="text-sm text-muted">
                            Page <span className="text-text font-semibold">{page}</span> of <span className="text-text font-semibold">{totalPages}</span>
                        </div>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors ${page === totalPages ? 'opacity-50 cursor-not-allowed border-border bg-surface' : 'border-border bg-surface hover:bg-surface-hover text-text'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Archive;
