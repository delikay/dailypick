import { useEffect, useRef, useState } from 'react';
import { Mail, Music, Film, Send, Check, User, MessageSquare } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import Layout from '../components/Layout';

const INITIAL_FORM_DATA = {
    name: '',
    suggestion: '',
    artistName: '',
    songTitle: '',
    movies: '',
    website: '',
};

const Submit = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const resetTimerRef = useRef(null);

    usePageMeta({
        title: 'Submit a Pick',
        description: 'Send a song and movie suggestion to My Daily Pick.',
        canonicalPath: '/submit',
    });

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_DATA);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...formData,
            name: formData.name.trim(),
            suggestion: formData.suggestion.trim(),
            artistName: formData.artistName.trim(),
            songTitle: formData.songTitle.trim(),
            movies: formData.movies.trim(),
            website: formData.website.trim(),
        };

        if (!payload.artistName || !payload.songTitle || !payload.movies) {
            setError('Artist name, song title, and movie picks are required.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(responseData?.error || 'Unable to submit right now.');
            }

            setSubmitted(true);
            resetForm();

            resetTimerRef.current = setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        } catch (submitError) {
            setError(submitError.message || 'Failed to submit form. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Layout>
                <div
                    className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in"
                    aria-live="polite"
                >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-2">Submitted!</h2>
                    <p className="text-muted text-center max-w-md">
                        Your submission has been sent successfully.
                        Thanks for sharing your recommendations!
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="animate-fade-in max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 warm-shadow">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                        Submit Your Picks
                    </h1>
                    <p className="text-muted">
                        Share your favorite songs and movies with me. Fill out the form below and I&apos;ll receive your recommendations via email.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="submit-name"
                            className="flex items-center gap-2 text-sm font-medium text-text mb-2"
                        >
                            <User className="w-4 h-4" />
                            Name (optional)
                        </label>
                        <input
                            id="submit-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all warm-shadow"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="submit-suggestion"
                            className="flex items-center gap-2 text-sm font-medium text-text mb-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Suggestion
                        </label>
                        <textarea
                            id="submit-suggestion"
                            name="suggestion"
                            value={formData.suggestion}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Any suggestions or feedback?"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all resize-none warm-shadow"
                        />
                    </div>

                    <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="submit-website">Website</label>
                        <input
                            id="submit-website"
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            autoComplete="off"
                            tabIndex={-1}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="submit-artist-name"
                            className="flex items-center gap-2 text-sm font-medium text-text mb-2"
                        >
                            <Music className="w-4 h-4" />
                            Artist Name
                        </label>
                        <input
                            id="submit-artist-name"
                            type="text"
                            name="artistName"
                            value={formData.artistName}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter the artist's name"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all warm-shadow"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="submit-song-title"
                            className="flex items-center gap-2 text-sm font-medium text-text mb-2"
                        >
                            <Music className="w-4 h-4" />
                            Song Title
                        </label>
                        <input
                            id="submit-song-title"
                            type="text"
                            name="songTitle"
                            value={formData.songTitle}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter the song title"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all warm-shadow"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="submit-movies"
                            className="flex items-center gap-2 text-sm font-medium text-text mb-2"
                        >
                            <Film className="w-4 h-4" />
                            Movies
                        </label>
                        <textarea
                            id="submit-movies"
                            name="movies"
                            value={formData.movies}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Enter movie titles (one per line or comma-separated)"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all resize-none warm-shadow"
                        />
                    </div>

                    {error && (
                        <div
                            className="p-4 rounded-xl bg-red-500/20 border border-red-500/30"
                            aria-live="polite"
                        >
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed warm-shadow"
                    >
                        {submitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                <span>Submit</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Submit;
