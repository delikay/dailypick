import { useState } from 'react';
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

    // Get the last 6 days from today
    const recentDates = getPreviousDays(6);
    
    // Find entries for those dates (if they exist)
    const entries = recentDates
        .map(date => getEntryByDate(date))
        .filter(entry => entry !== undefined);
    
    const filteredEntries = selectedMood
        ? entries.filter(e => e.mood === selectedMood)
        : entries;

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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-text flex items-center gap-3">
                            <ArchiveIcon className="w-8 h-8 text-primary" />
                            Archive
                        </h1>
                        <p className="text-muted mt-1">
                            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} from the last 6 days
                        </p>
                    </div>

                    {/* Mood Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted" />
                        <select
                            value={selectedMood || ''}
                            onChange={(e) => setSelectedMood(e.target.value || null)}
                            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="">All moods</option>
                            {moods.map(mood => (
                                <option key={mood.id} value={mood.id}>
                                    {mood.emoji} {mood.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Entries Grid */}
                {filteredEntries.length === 0 ? (
                    <EmptyState
                        icon={ArchiveIcon}
                        title={selectedMood ? "No entries with this mood" : "No entries yet"}
                        description={
                            selectedMood
                                ? "Try selecting a different mood or clear the filter."
                                : "Start curating your daily songs and movies to build your archive."
                        }
                    />
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredEntries.map(entry => (
                            <EntryCard key={entry.id} entry={entry} />
                        ))}
                    </div>
                )}

                {/* Clear Filter */}
                {selectedMood && filteredEntries.length > 0 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setSelectedMood(null)}
                            className="text-primary hover:underline text-sm"
                        >
                            Clear filter ({entries.length - filteredEntries.length} hidden)
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Archive;
