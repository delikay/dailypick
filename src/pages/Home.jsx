import { Link, useSearchParams } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowUpRight,
    Calendar,
    Clapperboard,
    Library,
    Music4,
    Sparkles,
} from 'lucide-react';
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
    const { getTodayEntry, getEntryByDate, getAllEntries, loading } = useEntries();

    const entry = dateParam ? getEntryByDate(dateParam) : getTodayEntry();
    const displayDate = dateParam || getToday();
    const isTodayView = isToday(displayDate);
    const totalEntries = getAllEntries().length;
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
                <div className="section-frame flex h-56 items-center justify-center">
                    <div className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-muted">
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

    const noteText = entry.caption?.trim()
        ? entry.caption
        : isTodayView
            ? 'No note written yet for today. Keep this streak intentional with a short line.'
            : 'No journal note was saved for this archive entry.';

    return (
        <Layout>
            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                <section className="section-frame overflow-hidden p-0">
                    <div className="grid lg:grid-cols-[1.3fr_0.9fr]">
                        <div className="px-5 py-7 sm:px-6 sm:py-8 lg:px-8">
                            <p className="editorial-kicker">Daily pick</p>

                            <h1 className="display-title mt-4 text-4xl text-text sm:text-5xl lg:text-[4rem]">
                                {isTodayView ? 'Today\'s Moodboard' : 'Archive Moodboard'}
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                                One date, one soundtrack, one screening. Structured as a hero and bento stack for quick scanning.
                            </p>

                            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link to="/archive" className="button-primary !w-auto">
                                    <Library className="h-3.5 w-3.5" />
                                    <span>View archive</span>
                                </Link>
                                <Link to="/submit" className="button-secondary !w-auto">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                    <span>Suggest a pick</span>
                                </Link>
                                {!isTodayView && (
                                    <Link to="/" className="button-ghost !w-auto">
                                        <ArrowLeft className="h-3.5 w-3.5" />
                                        <span>Back to today</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <aside className="border-t border-border/60 bg-surface/65 px-5 py-7 sm:px-6 sm:py-8 lg:border-l lg:border-t-0 lg:px-7">
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="surface-panel rounded-xl border border-border/60 bg-surface/90 px-3.5 py-3">
                                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                        Date
                                    </p>
                                    <p className="mt-1.5 text-sm font-semibold text-text">{formatDate(displayDate)}</p>
                                </div>

                                <div className="surface-panel rounded-xl border border-border/60 bg-surface/90 px-3.5 py-3">
                                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                        Mood
                                    </p>
                                    <div className="mt-1.5">
                                        <MoodBadge mood={entry.mood} size="sm" />
                                    </div>
                                </div>

                                <div className="surface-panel rounded-xl border border-border/60 bg-surface/90 px-3.5 py-3 sm:col-span-2 lg:col-span-1">
                                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                        Entries logged
                                    </p>
                                    <p className="mt-1.5 section-title text-2xl text-text">{totalEntries}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <ShareButton entry={entry} className="!w-full !justify-center" />
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-6">
                    <article className="section-frame px-5 py-6 sm:px-6 lg:col-span-4 lg:px-7">
                        <p className="editorial-kicker mb-2">Journal note</p>
                        <blockquote className="font-display text-[1.55rem] leading-[1.16] tracking-[-0.03em] text-text sm:text-[1.9rem] lg:text-[2.25rem]">
                            "{noteText}"
                        </blockquote>
                    </article>

                    <article className="card-shell px-5 py-6 sm:px-6 lg:col-span-2">
                        <div className="flex h-full flex-col gap-3">
                            <p className="editorial-kicker">Bento actions</p>
                            <p className="text-[0.8125rem] leading-relaxed text-muted">
                                Keep this entry portable and connected to its source date.
                            </p>
                            <div className="accent-rule my-1.5" />
                            <div className="space-y-2.5">
                                <div className="surface-panel rounded-lg border border-border/60 bg-surface/80 px-3.5 py-2.5">
                                    <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-text">
                                        <Sparkles className="h-3.5 w-3.5 text-secondary" />
                                        <span>Hero + bento home structure</span>
                                    </div>
                                </div>
                                <div className="surface-panel rounded-lg border border-border/60 bg-surface/80 px-3.5 py-2.5">
                                    <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-text">
                                        <Music4 className="h-3.5 w-3.5 text-secondary" />
                                        <span>Linked soundtrack card</span>
                                    </div>
                                </div>
                                <div className="surface-panel rounded-lg border border-border/60 bg-surface/80 px-3.5 py-2.5">
                                    <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-text">
                                        <Clapperboard className="h-3.5 w-3.5 text-secondary" />
                                        <span>Companion movie card</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="lg:col-span-3">
                        <SongCard song={entry.song} featured entry={entry} />
                    </div>

                    <div className="lg:col-span-3">
                        <MovieCard movie={entry.movie} featured entry={entry} />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
