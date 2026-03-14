import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
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
    const heading = isTodayView ? "Today's pick" : 'Archive selection';
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
                <div className="section-frame flex h-72 items-center justify-center">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                        Loading entry
                    </div>
                </div>
            </Layout>
        );
    }

    if (!entry) {
        return (
            <Layout>
                <EmptyState
                    icon={Calendar}
                    title={isTodayView ? 'No entry for today yet' : 'No entry for this date'}
                    description={
                        isTodayView
                            ? 'Start your day by sharing the song and movie that match your mood right now.'
                            : "There's no entry recorded for this date. Try another day in the archive."
                    }
                    actionLabel="Browse archive"
                    actionTo="/archive"
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="section-frame px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                        <p className="editorial-kicker">
                            {isTodayView ? 'Now playing' : 'From the archive'}
                        </p>

                        <div className="mt-5 max-w-3xl">
                            <h1 className="display-title text-5xl text-text sm:text-[3.9rem] lg:text-[4.8rem]">
                                {heading}
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                                {isTodayView
                                    ? 'A daily pairing of music, film, and feeling. Personal enough to stay human, structured enough to revisit later.'
                                    : 'A saved snapshot from the archive, brought back with its original mood, track, and film pairing intact.'}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Link to="/archive" className="button-primary">
                                View archive
                            </Link>
                            <Link to="/submit" className="button-secondary">
                                Suggest a pick
                            </Link>
                            {!isTodayView && (
                                <Link to="/" className="button-ghost">
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Back to today</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <aside className="card-shell px-6 py-7 sm:px-7 sm:py-8">
                        <div className="relative z-[1]">
                            <p className="editorial-kicker">
                                {isTodayView ? 'Daily snapshot' : 'Selected entry'}
                            </p>
                            <h2 className="section-title mt-4 text-3xl text-text sm:text-4xl">
                                {formatDate(displayDate)}
                            </h2>
                            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                                One mood marker, one track, and one film shaping the tone of this day.
                            </p>

                            <div className="mt-6">
                                <MoodBadge mood={entry.mood} size="lg" />
                            </div>

                            <div className="accent-rule my-6" />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="surface-panel rounded-[1.4rem] border border-border/70 bg-surface/80 p-4">
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                        Track
                                    </p>
                                    <p className="mt-2 text-base font-semibold text-text">
                                        {entry.song?.title}
                                    </p>
                                    <p className="text-sm text-muted">{entry.song?.artist}</p>
                                </div>

                                <div className="surface-panel rounded-[1.4rem] border border-border/70 bg-surface/80 p-4">
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                        Movie
                                    </p>
                                    <p className="mt-2 text-base font-semibold text-text">
                                        {entry.movie?.title}
                                    </p>
                                    {entry.movie?.year && (
                                        <p className="text-sm text-muted">{entry.movie.year}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>

                {entry.caption && (
                    <section className="section-frame px-6 py-7 sm:px-8 lg:px-10">
                        <div className="grid gap-5 lg:grid-cols-[13rem_1fr]">
                            <div>
                                <p className="editorial-kicker">Journal note</p>
                            </div>
                            <blockquote className="font-display text-2xl leading-[1.2] tracking-[-0.04em] text-text sm:text-3xl lg:text-[2.6rem]">
                                "{entry.caption}"
                            </blockquote>
                        </div>
                    </section>
                )}

                <section className="grid gap-6 lg:grid-cols-2">
                    <SongCard song={entry.song} featured entry={entry} />
                    <MovieCard movie={entry.movie} featured entry={entry} />
                </section>

                <section className="section-frame px-6 py-5 sm:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="editorial-kicker mb-2">Share this entry</p>
                            <p className="text-sm leading-relaxed text-muted">
                                Save or send the exact day with its original date and mood intact.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <ShareButton entry={entry} className="!w-auto" />
                            {!isTodayView && (
                                <Link to="/" className="button-ghost">
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Return to today</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
