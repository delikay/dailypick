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
                <section className="section-frame px-5 py-10 text-center sm:px-6 sm:py-12">
                    <div className="mx-auto flex max-w-2xl flex-col items-center" aria-live="polite">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-sm">
                            <Check className="h-8 w-8" />
                        </div>
                        <p className="editorial-kicker">Submission received</p>
                        <h1 className="section-title mt-4 text-3xl text-text sm:text-4xl">
                            Thanks for sending a pick.
                        </h1>
                        <Link to="/submit" className="button-primary mt-6 !w-auto !px-5">
                            Send another pick
                        </Link>
                        <Link to="/archive" className="mt-3 text-[0.8125rem] font-medium text-muted">
                            Browse the archive
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
                <section className="section-frame px-5 py-6 sm:px-6 lg:px-8">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-surface shadow-sm">
                        <Mail className="h-5 w-5" />
                    </div>
                    <p className="editorial-kicker">Submit a suggestion</p>
                    <h1 className="display-title mt-4 text-4xl text-text sm:text-5xl">
                        Send the next song and film pair.
                    </h1>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                        If a track or movie feels right for the archive, drop it here. Keep it simple,
                        and add context only if it helps explain the choice.
                    </p>

                    <div className="accent-rule my-5" />

                    <div className="grid gap-3">
                        <div className="surface-panel rounded-xl border border-border/60 bg-surface/80 p-3.5">
                            <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                Best submissions
                            </p>
                            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                                Clear song title, artist name, and one or more movie options that
                                clearly belong together.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="card-shell px-5 py-6 sm:px-6">
                    <form
                        action={FORM_SUBMIT_ACTION}
                        method="POST"
                        className="relative z-[1] space-y-4"
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

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="submit-name"
                                    className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-text"
                                >
                                    <User className="h-3.5 w-3.5 text-secondary" />
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
                                    className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-text"
                                >
                                    <MessageSquare className="h-3.5 w-3.5 text-secondary" />
                                    Suggestion or context
                                </label>
                                <textarea
                                    id="submit-suggestion"
                                    name="suggestion"
                                    rows={3}
                                    placeholder="Why does this pairing fit?"
                                    className="form-field resize-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="submit-artist-name"
                                    className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-text"
                                >
                                    <Music className="h-3.5 w-3.5 text-secondary" />
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
                                    className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-text"
                                >
                                    <Music className="h-3.5 w-3.5 text-secondary" />
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
                                    className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-text"
                                >
                                    <Film className="h-3.5 w-3.5 text-secondary" />
                                    Movie picks
                                </label>
                                <textarea
                                    id="submit-movies"
                                    name="movies"
                                    required
                                    rows={4}
                                    placeholder="One per line or comma separated"
                                    className="form-field resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          
                            <button
                                type="submit"
                                className="button-primary !w-auto self-start !px-3.5 !py-2 !text-[0.8125rem]"
                            >
                                <Send className="h-3 w-3" />
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
