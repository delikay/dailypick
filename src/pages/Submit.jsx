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
                <section className="section-frame px-6 py-14 text-center sm:px-8 sm:py-16">
                    <div
                        className="mx-auto flex max-w-2xl flex-col items-center"
                        aria-live="polite"
                    >
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 shadow-[0_18px_40px_rgba(16,185,129,0.18)]">
                            <Check className="h-10 w-10" />
                        </div>
                        <p className="editorial-kicker">Submission received</p>
                        <h1 className="section-title mt-5 text-4xl text-text sm:text-5xl">
                            Thanks for sending a pick.
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                            Your suggestion is on its way through. The next good entry might already be in your message.
                        </p>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="animate-fade-in grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
                <section className="section-frame px-6 py-8 sm:px-8 lg:px-10">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-primary text-surface shadow-[0_18px_34px_rgba(24,21,18,0.18)]">
                        <Mail className="h-6 w-6" />
                    </div>
                    <p className="editorial-kicker">Submit a suggestion</p>
                    <h1 className="display-title mt-5 text-5xl text-text sm:text-6xl">
                        Send the next song and film pair.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                        If a track or movie feels right for the archive, drop it here. Keep it simple, and add context only if it helps explain the choice.
                    </p>

                    <div className="accent-rule my-6" />

                    <div className="grid gap-4">
                        <div className="rounded-[1.4rem] border border-border/70 bg-surface/80 p-4">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                Best submissions
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                Clear song title, artist name, and one or more movie options that genuinely fit the mood.
                            </p>
                        </div>

                        <div className="rounded-[1.4rem] border border-border/70 bg-surface/80 p-4">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                Extra context
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                The suggestion field is optional, but it helps when there is a specific reason the pairing belongs together.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="card-shell px-6 py-7 sm:px-8">
                    <form onSubmit={handleSubmit} className="relative z-[1] space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="submit-name"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                                >
                                    <User className="h-4 w-4 text-secondary" />
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
                                    className="form-field"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="submit-suggestion"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                                >
                                    <MessageSquare className="h-4 w-4 text-secondary" />
                                    Suggestion or context
                                </label>
                                <textarea
                                    id="submit-suggestion"
                                    name="suggestion"
                                    value={formData.suggestion}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Why does this pairing fit?"
                                    className="form-field resize-none"
                                />
                            </div>

                            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
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
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                                >
                                    <Music className="h-4 w-4 text-secondary" />
                                    Artist name
                                </label>
                                <input
                                    id="submit-artist-name"
                                    type="text"
                                    name="artistName"
                                    value={formData.artistName}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    placeholder="Artist"
                                    className="form-field"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="submit-song-title"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                                >
                                    <Music className="h-4 w-4 text-secondary" />
                                    Song title
                                </label>
                                <input
                                    id="submit-song-title"
                                    type="text"
                                    name="songTitle"
                                    value={formData.songTitle}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    placeholder="Song"
                                    className="form-field"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="submit-movies"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                                >
                                    <Film className="h-4 w-4 text-secondary" />
                                    Movie picks
                                </label>
                                <textarea
                                    id="submit-movies"
                                    name="movies"
                                    value={formData.movies}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="One per line or comma separated"
                                    className="form-field resize-none"
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                className="rounded-[1.4rem] border border-red-500/20 bg-red-500/10 px-4 py-3"
                                aria-live="polite"
                            >
                                <p className="text-sm font-medium text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm leading-relaxed text-muted">
                                Required fields: artist, song title, and at least one movie suggestion.
                            </p>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        <span>Submitting</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        <span>Send pick</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </Layout>
    );
};

export default Submit;
