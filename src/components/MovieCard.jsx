import { Film, Play } from 'lucide-react';
import ShareButton from './ShareButton';

const MovieCard = ({ movie, featured = false, entry }) => {
    if (!movie) return null;

    return (
        <article
            className={`card-shell hover-lift relative p-6 sm:p-7 ${featured ? 'min-h-[18rem]' : ''}`}
        >
            <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-rose-500/10 blur-3xl" />
            {entry && <ShareButton entry={entry} iconOnly />}

            <div className="relative z-[1] flex h-full flex-col">
                <span className="editorial-kicker">Screening</span>

                <div className="mt-6 flex items-start gap-4">
                    {movie.poster ? (
                        <img
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            className="h-28 w-20 flex-shrink-0 rounded-[1.15rem] border border-border/60 object-cover shadow-[0_18px_32px_rgba(24,21,18,0.14)]"
                            loading="lazy"
                            decoding="async"
                            onError={(event) => {
                                event.target.style.display = 'none';
                                event.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div
                        className={`flex h-28 w-20 flex-shrink-0 items-center justify-center rounded-[1.15rem] border border-rose-500/20 bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-[0_18px_35px_rgba(244,63,94,0.22)] ${movie.poster ? 'hidden' : 'flex'}`}
                    >
                        <Film className="h-7 w-7" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-muted">
                            Movie of the day
                        </p>
                        <h3 className="section-title mt-2 text-3xl text-text sm:text-[2.1rem]">
                            {movie.title}
                        </h3>
                        {movie.year && (
                            <p className="mt-2 text-base font-medium text-muted">{movie.year}</p>
                        )}
                    </div>
                </div>

                <div className="accent-rule my-6" />

                <p className="max-w-md text-sm leading-relaxed text-muted">
                    The film pairing that completes the mood and gives the day its second texture.
                </p>

                {movie.trailer && (
                    <a
                        href={movie.trailer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary mt-auto w-full sm:w-fit"
                    >
                        <Play className="h-4 w-4 text-secondary" />
                        <span>Watch trailer</span>
                    </a>
                )}
            </div>
        </article>
    );
};

export default MovieCard;
