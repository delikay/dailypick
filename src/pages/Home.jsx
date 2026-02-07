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
                {/* Main Header Section */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text mb-3 tracking-tight">
                        TODAY'S PICK
                    </h1>
                    <p className="text-lg sm:text-xl text-muted font-light max-w-2xl mx-auto">
                        Because every day sounds different...
                    </p>
                </header>

                {/* Date & Mood Section */}
                <section className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 text-muted mb-4">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wide">
                            {isTodayView ? "Today" : "Viewing"}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
                        {formatDate(displayDate)}
                    </h2>
                    <MoodBadge mood={entry.mood} size="lg" />
                </section>

                {/* Caption Section */}
                {entry.caption && (
                    <section className="max-w-3xl mx-auto mb-12">
                        <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                            <p className="text-center text-xl text-text italic leading-relaxed">
                                "{entry.caption}"
                            </p>
                        </div>
                    </section>
                )}

                {/* Content Cards Section */}
                <section className="mb-12">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <SongCard song={entry.song} featured entry={entry} />
                        <MovieCard movie={entry.movie} featured entry={entry} />
                    </div>
                </section>

                {/* Navigation Section */}
                <footer className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/archive"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors shadow-sm"
                        >
                            View Archive
                        </a>
                    </div>
                    
                    {!isTodayView && (
                        <div>
                            <a
                                href="/"
                                className="text-primary hover:underline text-sm font-medium"
                            >
                                ← Back to today
                            </a>
                        </div>
                    )}
                </footer>
            </div>
        </Layout>
    );
};

export default Home;
