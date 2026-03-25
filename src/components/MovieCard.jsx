import { Film, Play } from 'lucide-react';
import ShareButton from './ShareButton';

const MovieCard = ({ movie, featured = false, entry }) => {
    if (!movie) return null;

    return (
        <article
            className={`card-shell relative p-5 sm:p-6 ${featured ? 'min-h-[15rem]' : ''}`}
        >
            {entry && <ShareButton entry={entry} iconOnly />}

            <div className="relative z-[1] flex h-full flex-col">
                <span className="editorial-kicker">Screening</span>

                <div className="mt-5 flex items-start gap-3">
                    {movie.poster ? (
                        <img
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            className="h-24 w-[4.25rem] flex-shrink-0 rounded-xl border border-border/50 object-cover shadow-sm"
                            loading="lazy"
                            decoding="async"
                            onError={(event) => {
                                event.target.style.display = 'none';
                                event.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div
                        className={`flex h-24 w-[4.25rem] flex-shrink-0 items-center justify-center rounded-xl border border-border/60 bg-surface/85 text-primary ${movie.poster ? 'hidden' : 'flex'}`}
                    >
                        <Film className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                            Featured film
                        </p>
                        <h3 className="section-title mt-1.5 text-2xl text-text sm:text-[1.75rem]">
                            {movie.title}
                        </h3>
                        {movie.year && (
                            <p className="mt-1.5 text-sm font-medium text-muted">{movie.year}</p>
                        )}
                    </div>
                </div>

                <div className="accent-rule my-5" />

                <p className="max-w-md text-[0.8125rem] leading-relaxed text-muted">
                    The film pairing that gives the entry its second register.
                </p>

                {movie.trailer && (
                    <a
                        href={movie.trailer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary mt-auto w-full sm:w-fit"
                    >
                        <Play className="h-3.5 w-3.5 text-secondary" />
                        <span>Watch trailer</span>
                    </a>
                )}
            </div>
        </article>
    );
};

export default MovieCard;
