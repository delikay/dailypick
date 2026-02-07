import { useSearchParams } from 'react-router-dom';
import { Calendar, Sparkles } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { formatDate, getToday, isToday } from '../utils/dateUtils';
import Layout from '../components/Layout';
import MoodBadge from '../components/MoodBadge';
import SongCard from '../components/SongCard';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import ShareButton from '../components/ShareButton';

const Home = () => {
    const [searchParams] = useSearchParams();
    const dateParam = searchParams.get('date');
    const { getTodayEntry, getEntryByDate, loading } = useEntries();

    // Get entry for the requested date or today
    const entry = dateParam ? getEntryByDate(dateParam) : getTodayEntry();
    const displayDate = dateParam || getToday();
    const isTodayView = isToday(displayDate);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse-soft text-muted">Loading...</div>
                </div>
            </Layout>
        );
    }

    if (!entry) {
        return (
            <Layout>
                <EmptyState
                    icon={Sparkles}
                    title={isTodayView ? "No entry for today yet" : "No entry for this date"}
                    description={
                        isTodayView
                            ? "Start your day by sharing what song and movie match your mood right now."
                            : "There's no entry recorded for this date. Try checking another day!"
                    }
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="animate-fade-in">
                {/* Main Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Today's Pick</h1>
                    <p className="text-muted">Because every day sounds different.</p>
                </div>

                {/* Date Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-muted mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                            {isTodayView ? "Today" : "Viewing"}
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                        {formatDate(displayDate)}
                    </h1>
                    <MoodBadge mood={entry.mood} size="lg" />
                </div>

                {/* Caption */}
                {entry.caption && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <p className="text-center text-lg text-muted italic">
                            "{entry.caption}"
                        </p>
                    </div>
                )}

                {/* Song & Movie Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <SongCard song={entry.song} featured entry={entry} />
                    <MovieCard movie={entry.movie} featured entry={entry} />
                </div>

                {/* Archive Link */}
                <div className="text-center mt-8">
                    <a
                        href="/archive"
                        className="text-primary hover:underline text-sm"
                    >
                        View Archive
                    </a>
                </div>

                {/* Back to Today Link */}
                {!isTodayView && (
                    <div className="text-center mt-8">
                        <a
                            href="/"
                            className="text-primary hover:underline text-sm"
                        >
                            ← Back to today
                        </a>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Home;
