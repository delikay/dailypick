import { Music, ExternalLink } from 'lucide-react';
import ShareButton from './ShareButton';

const SongCard = ({ song, featured = false, entry }) => {
    if (!song) return null;

    return (
        <article
            className={`card-shell hover-lift relative p-6 sm:p-7 ${featured ? 'min-h-[18rem]' : ''}`}
        >
            <div className="pointer-events-none absolute -left-12 top-8 h-32 w-32 rounded-full bg-emerald-500/14 blur-3xl" />
            {entry && <ShareButton entry={entry} iconOnly />}

            <div className="relative z-[1] flex h-full flex-col">
                <span className="editorial-kicker">Soundtrack</span>

                <div className="mt-6 flex items-start gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.4rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_18px_35px_rgba(22,163,74,0.22)]">
                        <Music className="h-7 w-7" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-muted">
                            Song of the day
                        </p>
                        <h3 className="section-title mt-2 text-3xl text-text sm:text-[2.1rem]">
                            {song.title}
                        </h3>
                        <p className="mt-2 text-base font-medium text-muted">{song.artist}</p>
                    </div>
                </div>

                <div className="accent-rule my-6" />

                <p className="max-w-md text-sm leading-relaxed text-muted">
                    A single track carrying the emotional temperature of this day.
                </p>

                {song.link && (
                    <a
                        href={song.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary mt-auto w-full sm:w-fit"
                    >
                        <span>Play on Spotify</span>
                        <ExternalLink className="h-4 w-4 text-secondary" />
                    </a>
                )}
            </div>
        </article>
    );
};

export default SongCard;
