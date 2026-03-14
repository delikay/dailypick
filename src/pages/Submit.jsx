import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Music, Film, Send, Check, User, MessageSquare } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import Layout from '../components/Layout';

const FORM_SUBMIT_ACTION = 'https://formsubmit.co/263fb238367735dd5f48e44391562b79';
const SUCCESS_PATH = '/submit?status=success';

const Submit = () => {
    const [searchParams] = useSearchParams();
    const nextUrl =
        typeof window === 'undefined' ? SUCCESS_PATH : `${window.location.origin}${SUCCESS_PATH}`;
    const isSubmitted = searchParams.get('status') === 'success';

    usePageMeta({
        title: 'Submit a Pick',
        description: 'Send a song and movie suggestion to My Daily Pick.',
        canonicalPath: '/submit',
    });

    if (isSubmitted) {
        return (
            <Layout>
                <section className="section-frame px-6 py-14 text-center sm:px-8 sm:py-16">
                    <div className="mx-auto flex max-w-2xl flex-col items-center" aria-live="polite">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 shadow-[0_18px_40px_rgba(16,185,129,0.18)]">
                            <Check className="h-10 w-10" />
                        </div>
                        <p className="editorial-kicker">Submission received</p>
                        <h1 className="section-title mt-5 text-4xl text-text sm:text-5xl">
                            Thanks for sending a pick.
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                            Your suggestion has been sent through FormSubmit.
                        </p>
                        <Link to="/submit" className="button-primary mt-8 !w-auto !px-6">
                            Send another pick
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
                <section className="section-frame px-6 py-8 sm:px-8 lg:px-10">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-primary text-surface shadow-[0_18px_34px_rgba(24,21,18,0.18)]">
                        <Mail className="h-6 w-6" />
                    </div>
                    <p className="editorial-kicker">Submit a suggestion</p>
                    <h1 className="display-title mt-5 text-5xl text-text sm:text-6xl">
                        Send the next song and film pair.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                        If a track or movie feels right for the archive, drop it here. Keep it simple,
                        and add context only if it helps explain the choice.
                    </p>

                    <div className="accent-rule my-6" />

                    <div className="grid gap-4">
                        <div className="surface-panel rounded-[1.4rem] border border-border/70 bg-surface/80 p-4">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                Best submissions
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                Clear song title, artist name, and one or more movie options that
                                genuinely fit the mood.
                            </p>
                        </div>

                        <div className="surface-panel rounded-[1.4rem] border border-border/70 bg-surface/80 p-4">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                                Delivery
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                This form posts directly to FormSubmit only.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="card-shell px-6 py-7 sm:px-8">
                    <form
                        action={FORM_SUBMIT_ACTION}
                        method="POST"
                        className="relative z-[1] space-y-5"
                    >
                        <input type="hidden" name="_subject" value="New My Daily Pick suggestion" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_next" value={nextUrl} />

                        <div
                            className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                            aria-hidden="true"
                        >
                            <label htmlFor="submit-honey">Leave this field blank</label>
                            <input
                                id="submit-honey"
                                type="text"
                                name="_honey"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

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
                                    rows={4}
                                    placeholder="Why does this pairing fit?"
                                    className="form-field resize-none"
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
                                    required
                                    rows={5}
                                    placeholder="One per line or comma separated"
                                    className="form-field resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm leading-relaxed text-muted">
                                Required fields: artist, song title, and at least one movie suggestion.
                            </p>

                            <button
                                type="submit"
                                className="button-primary !w-auto self-start !px-3.5 !py-2 !text-xs"
                            >
                                <Send className="h-3.5 w-3.5" />
                                <span>Send pick</span>
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </Layout>
    );
};

export default Submit;
