import { Heart, Sparkles, Calendar, Music, Film, Share2 } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import Layout from '../components/Layout';

const highlights = [
    {
        icon: Calendar,
        title: 'Daily mood tracking',
        description: 'A lightweight ritual that captures how a day felt, not just what happened in it.',
    },
    {
        icon: Music,
        title: 'Song-led memory',
        description: 'Tracks become anchors for specific moments, seasons, and states of mind.',
    },
    {
        icon: Film,
        title: 'Film pairings',
        description: 'Each entry gets a second texture through a movie choice that deepens the mood.',
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
        description: 'Learn the story behind My Daily Pick and how daily moods shape the music and movie selections.',
        canonicalPath: '/about',
    });

    return (
        <Layout>
            <div className="animate-fade-in space-y-6 sm:space-y-8">
                <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                    <header className="section-frame px-6 py-8 sm:px-8 lg:px-10">
                        <p className="editorial-kicker">About the project</p>
                        <h1 className="display-title mt-5 text-5xl text-text sm:text-6xl lg:text-[5.1rem]">
                            A personal archive told through songs and movies.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                            My Daily Pick started as a way to record emotional weather without over-explaining it. One song and one film were enough to define the tone.
                        </p>
                    </header>

                    <aside className="card-shell px-6 py-7 sm:px-7 sm:py-8">
                        <div className="relative z-[1]">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-secondary/12 text-secondary">
                                <Heart className="h-5 w-5" />
                            </div>
                            <p className="editorial-kicker">Why it works</p>
                            <p className="mt-5 text-base leading-relaxed text-muted">
                                The format stays small enough to remain honest. Instead of trying to summarize a whole day, it preserves a mood through two carefully chosen references.
                            </p>
                            <div className="accent-rule my-6" />
                            <p className="text-sm leading-relaxed text-muted">
                                Over time, the archive becomes less of a playlist or watchlist and more of a personal map.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="section-frame px-6 py-8 sm:px-8 lg:px-10">
                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="editorial-kicker">The story</p>
                            <h2 className="section-title mt-4 text-4xl text-text sm:text-5xl">
                                A journal without the weight of full diary entries.
                            </h2>
                        </div>

                        <div className="space-y-4 text-base leading-relaxed text-muted">
                            <p>
                                Each day, I record how I&apos;m feeling, save a song that matches that mood, and pair it with a movie that belongs in the same emotional world.
                            </p>
                            <p>
                                Some days call for something bright and direct. Others feel cinematic, restless, nostalgic, or reflective. The archive gives those moods a shape without flattening them.
                            </p>
                            <p>
                                That structure is what makes the project useful: it is simple enough to keep going, and rich enough to reveal patterns over time.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-5">
                        <p className="editorial-kicker">What defines it</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {highlights.map((highlight) => (
                            <article key={highlight.title} className="card-shell p-6 sm:p-7">
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-primary/8 text-primary">
                                    <highlight.icon className="h-5 w-5" />
                                </div>
                                <h3 className="section-title text-3xl text-text">{highlight.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                                    {highlight.description}
                                </p>
                            </article>
                        ))}

                        <article className="card-shell p-6 sm:p-7 md:col-span-2">
                            <div className="grid gap-5 lg:grid-cols-[14rem_1fr] lg:items-start">
                                <div>
                                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-secondary/12 text-secondary">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <p className="editorial-kicker">Long term value</p>
                                </div>
                                <div>
                                    <h3 className="section-title text-3xl text-text sm:text-4xl">
                                        The archive becomes more interesting the longer it stays alive.
                                    </h3>
                                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                                        Repeated moods, surprise pairings, seasonal shifts, and recurring artists start to tell their own story. The design should feel like it respects that history, not like it came from a one-click template.
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
