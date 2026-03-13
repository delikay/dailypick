import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { formatDate, getToday, isToday } from '../utils/dateUtils';
import { usePageMeta } from '../hooks/usePageMeta';
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

    const entry = dateParam ? getEntryByDate(dateParam) : getTodayEntry();
    const displayDate = dateParam || getToday();
    const isTodayView = isToday(displayDate);
    const heading = isTodayView ? "Today's pick" : 'Pick from the archive';
    const description = entry
        ? `${formatDate(displayDate)}: ${entry.song?.title} by ${entry.song?.artist} and ${entry.movie?.title}.`
        : isTodayView
            ? 'Check back for today\'s song and movie pairing.'
            : `Browse the My Daily Pick entry for ${formatDate(displayDate)}.`;

    usePageMeta({
        title: isTodayView ? "Today's Pick" : formatDate(displayDate),
        description,
        canonicalPath: dateParam ? `/?date=${displayDate}` : '/',
    });

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
                    title={isTodayView ? 'No entry for today yet' : 'No entry for this date'}
                    description={
                        isTodayView
                            ? 'Start your day by sharing what song and movie match your mood right now.'
                            : "There's no entry recorded for this date. Try checking another day!"
                    }
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text mb-3 tracking-tight">
                        {heading}
                    </h1>
                    <p className="text-lg sm:text-xl text-muted font-light max-w-2xl mx-auto">
                        {isTodayView
                            ? 'One song. One mood. Every day.'
                            : 'A saved snapshot of the song, movie, and mood for this day.'}
                    </p>
                </div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-muted mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{isTodayView ? 'Today' : 'Viewing'}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-text mb-4">
                        {formatDate(displayDate)}
                    </h2>
                    <MoodBadge mood={entry.mood} size="lg" />
                </div>

                {entry.caption && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <p className="text-center text-lg text-muted italic">
                            "{entry.caption}"
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <SongCard song={entry.song} featured entry={entry} />
                    <MovieCard movie={entry.movie} featured entry={entry} />
                </div>

                <ShareButton entry={entry} />

                <footer className="text-center mt-12 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/archive"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors shadow-sm"
                        >
                            View Archive
                        </Link>
                        <Link
                            to="/submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-secondary text-secondary rounded-full font-medium hover:bg-secondary/90 hover:text-white transition-colors shadow-sm"
                        >
                            Suggest a pick
                        </Link>
                    </div>

                    {!isTodayView && (
                        <div>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to today
                            </Link>
                        </div>
                    )}
                </footer>
            </div>
        </Layout>
    );
};

export default Home;
