import { Heart, Sparkles, Calendar, Music, Film, Share2 } from 'lucide-react';
import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout>
            <div className="animate-fade-in">
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-secondary" />
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text tracking-tight">
                            About My Daily Pick
                        </h1>
                    </div>
                    <p className="text-lg sm:text-xl text-muted font-light max-w-2xl mx-auto">
                        A personal journey through music and movies
                    </p>
                </header>

                {/* Story Section */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-secondary" />
                            <h2 className="text-2xl font-bold text-text">My Story</h2>
                        </div>
                        <div className="space-y-4 text-muted leading-relaxed">
                            <p className="text-lg">
                                My daily pick is my personal journal where I capture my daily mood through the songs and movies that resonate with me.
                            </p>
                            <p>
                                Each day, I record how I'm feeling, share a song that matches my mood, and choose a movie that complements my emotional state. Over time, this becomes a meaningful archive of my emotional journey told through music and movies.
                            </p>
                            <p>
                                Whether I'm feeling energetic and need an upbeat track, nostalgic and craving a classic movie, or reflective and drawn to something more contemplative, My daily pick helps me document those moments and uncover patterns in my moods and tastes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">What Makes It Special</h2>
                        <p className="text-muted">Discover the features that make this journey unique</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-surface rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-text mb-2">Daily Mood Tracking</h3>
                            <p className="text-muted text-sm">Capture your emotional state with expressive mood indicators</p>
                        </div>
                        <div className="bg-surface rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Music className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-text mb-2">Song Recommendations</h3>
                            <p className="text-muted text-sm">Discover new music that matches your current mood</p>
                        </div>
                        <div className="bg-surface rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Film className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-text mb-2">Movie Picks</h3>
                            <p className="text-muted text-sm">Find films that complement your emotional journey</p>
                        </div>
                        <div className="bg-surface rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Share2 className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-text mb-2">Share & Connect</h3>
                            <p className="text-muted text-sm">Share your daily picks and connect with others</p>
                        </div>
                        <div className="bg-surface rounded-xl p-6 text-center sm:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-text mb-2">Personal Archive</h3>
                            <p className="text-muted text-sm">Build a beautiful collection of your emotional moments</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default About;
