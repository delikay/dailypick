import { useEffect, useRef } from 'react';
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
    const contentRef = useRef(null);
    const dateParam = searchParams.get('date');
    const { getTodayEntry, getEntryByDate, loading } = useEntries();

    const entry = dateParam ? getEntryByDate(dateParam) : getTodayEntry();
    const displayDate = dateParam || getToday();
    const isTodayView = isToday(displayDate);
    const sectionTitle = isTodayView ? 'Daily pick overview' : 'Archive pick overview';
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

    useEffect(() => {
        const container = contentRef.current;
        if (!container || !entry || typeof window === 'undefined') {
            return undefined;
        }

        const sections = Array.from(container.querySelectorAll('[data-home-reveal]'));
        if (sections.length === 0) {
            return undefined;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        container.classList.add('home-reveal-ready');

        if (prefersReducedMotion) {
            sections.forEach((section) => section.classList.add('is-visible'));
            return () => {
                container.classList.remove('home-reveal-ready');
            };
        }

        sections.forEach((section, index) => {
            section.classList.remove('is-visible');
            section.style.setProperty('--reveal-delay', `${index * 70}ms`);
        });

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entryItem) => {
                    if (!entryItem.isIntersecting) return;
                    entryItem.target.classList.add('is-visible');
                    currentObserver.unobserve(entryItem.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
            sections.forEach((section) => section.style.removeProperty('--reveal-delay'));
            container.classList.remove('home-reveal-ready');
        };
    }, [displayDate, entry, entry?.id, entry?.caption]);

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

    return (
        <Layout>
            <div ref={contentRef} className="space-y-5 sm:space-y-6 lg:space-y-8">
                <section
                    data-home-reveal
                    className="home-reveal section-frame px-5 py-6 sm:px-6 lg:px-8 lg:py-8"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="section-title text-2xl text-text sm:text-3xl">
                                {sectionTitle}
                            </h1>
                            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                                One day, one movie, Everyday.
                            </p>
                            <p className="mt-0.5 text-[0.8125rem] font-medium text-muted">
                                {formatDate(displayDate)}
                            </p>
                        </div>

                        <div className="surface-panel w-full max-w-xs rounded-xl border border-border/60 bg-surface/80 px-3.5 py-2.5 sm:w-auto">
                            <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                Mood
                            </p>
                            <div className="mt-1.5">
                                <MoodBadge mood={entry.mood} size="sm" />
                            </div>
                        </div>
                    </div>
                </section>

                {entry.caption && (
                    <section
                        data-home-reveal
                        className="home-reveal section-frame px-5 py-5 sm:px-6 lg:px-8"
                    >
                        <div className="grid gap-4 lg:grid-cols-[11rem_1fr]">
                            <div>
                                <p className="editorial-kicker">Journal note</p>
                            </div>
                            <blockquote className="font-display text-xl leading-[1.2] tracking-[-0.03em] text-text sm:text-2xl lg:text-[2.1rem]">
                                "{entry.caption}"
                            </blockquote>
                        </div>
                    </section>
                )}

                <section data-home-reveal className="home-reveal grid gap-5 lg:grid-cols-2">
                    <SongCard song={entry.song} featured entry={entry} />
                    <MovieCard movie={entry.movie} featured entry={entry} />
                </section>

                <section
                    data-home-reveal
                    className="home-reveal section-frame px-5 py-4 sm:px-6"
                >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="editorial-kicker mb-1.5">Share this entry</p>
                            <p className="text-[0.8125rem] leading-relaxed text-muted">
                                Save or send the exact day with its original date and mood intact.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <ShareButton entry={entry} className="!w-auto" />
                            {!isTodayView && (
                                <Link to="/" className="button-ghost">
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    <span>Return to today</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section data-home-reveal className="home-reveal px-5 py-4 sm:px-6">
                    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-2.5 sm:flex-row sm:flex-wrap">
                        <Link to="/archive" className="button-primary !w-auto">
                            View archive
                        </Link>
                        <Link to="/submit" className="button-secondary !w-auto">
                            Suggest a pick
                        </Link>
                        {!isTodayView && (
                            <Link to="/" className="button-ghost !w-auto">
                                <ArrowLeft className="h-3.5 w-3.5" />
                                <span>Back to today</span>
                            </Link>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
