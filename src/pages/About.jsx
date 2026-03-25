import { Heart, Sparkles, Calendar, Music, Film, Share2 } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import Layout from '../components/Layout';

const highlights = [
    {
        icon: Calendar,
        title: 'Daily logging',
        description: 'A lightweight ritual that captures one clear pairing from each day.',
    },
    {
        icon: Music,
        title: 'Song-led memory',
        description: 'Tracks become anchors for specific moments, seasons, and routines.',
    },
    {
        icon: Film,
        title: 'Film pairings',
        description: 'Each entry gets a second texture through a movie choice that expands the pairing.',
    },
    {
        icon: Share2,
        title: 'Shareable entries',
        description: 'Any saved day can be passed around as a clean, focused link.',
    },
];

const About = () => {
    usePageMeta({
        title: 'About',
        description: 'Learn the story behind My Daily Pick and how daily song and movie pairings shape the archive.',
        canonicalPath: '/about',
    });

    return (
        <Layout>
            <div className="space-y-5 sm:space-y-6">
                <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                    <header className="section-frame px-5 py-6 sm:px-6 lg:px-8">
                        <p className="editorial-kicker">About the project</p>
                        <h1 className="display-title mt-4 text-4xl text-text sm:text-5xl lg:text-[4.2rem]">
                            A personal archive told through songs and movies.
                        </h1>
                        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                            My Daily Pick started as a way to mark each day without over-explaining it. One song and one film were enough to define the entry.
                        </p>
                    </header>

                    <aside className="card-shell px-5 py-6 sm:px-6 sm:py-7">
                        <div className="relative z-[1]">
                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                <Heart className="h-4 w-4" />
                            </div>
                            <p className="editorial-kicker">Why it works</p>
                            <p className="mt-4 text-sm leading-relaxed text-muted">
                                The format stays small enough to remain honest. Instead of trying to summarize a whole day, it preserves a clear pairing through two carefully chosen references.
                            </p>
                            <div className="accent-rule my-5" />
                            <p className="text-[0.8125rem] leading-relaxed text-muted">
                                Over time, the archive becomes less of a playlist or watchlist and more of a personal map.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="section-frame px-5 py-6 sm:px-6 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="editorial-kicker">The story</p>
                            <h2 className="section-title mt-3 text-3xl text-text sm:text-4xl">
                                A journal without the weight of full diary entries.
                            </h2>
                        </div>

                        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
                            <p>
                                Each day, I save a song, pair it with a movie, and leave a note when the day needs one.
                            </p>
                            <p>
                                Some days call for something bright and direct. Others lean quieter, stranger, or more cinematic. The archive gives those shifts a shape without turning them into a heavy diary.
                            </p>
                            <p>
                                That structure is what makes the project useful: it is simple enough to keep going, and rich enough to reveal patterns over time.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-4">
                        <p className="editorial-kicker">What defines it</p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        {highlights.map((highlight) => (
                            <article key={highlight.title} className="card-shell p-5 sm:p-6">
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                                    <highlight.icon className="h-4 w-4" />
                                </div>
                                <h3 className="section-title text-2xl text-text">{highlight.title}</h3>
                                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted sm:text-sm">
                                    {highlight.description}
                                </p>
                            </article>
                        ))}

                        <article className="card-shell p-5 sm:p-6 md:col-span-2">
                            <div className="grid gap-4 lg:grid-cols-[12rem_1fr] lg:items-start">
                                <div>
                                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <p className="editorial-kicker">Long term value</p>
                                </div>
                                <div>
                                    <h3 className="section-title text-2xl text-text sm:text-3xl">
                                        The archive becomes more interesting the longer it stays alive.
                                    </h3>
                                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                                        Repeated pairings, seasonal shifts, and recurring artists start to tell their own story. The design should feel like it respects that history, not like it came from a one-click template.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default About;
