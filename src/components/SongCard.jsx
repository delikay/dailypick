import { Music, ExternalLink } from 'lucide-react';
import ShareButton from './ShareButton';

const SongCard = ({ song, featured = false, entry }) => {
    if (!song) return null;

    return (
        <article
            className={`card-shell relative p-5 sm:p-6 ${featured ? 'min-h-[15rem]' : ''}`}
        >
            {entry && <ShareButton entry={entry} iconOnly />}

            <div className="relative z-[1] flex h-full flex-col">
                <span className="editorial-kicker">Soundtrack</span>

                <div className="mt-5 flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border/60 bg-surface/80 text-secondary">
                        <Music className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                            Featured track
                        </p>
                        <h3 className="section-title mt-1.5 text-2xl text-text sm:text-[1.75rem]">
                            {song.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-muted">{song.artist}</p>
                    </div>
                </div>

                <div className="accent-rule my-5" />

                <p className="max-w-md text-[0.8125rem] leading-relaxed text-muted">
                    A single song anchoring the tone of this entry.
                </p>

                {song.link && (
                    <a
                        href={song.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary mt-auto w-full sm:w-fit"
                    >
                        <span>Play on Spotify</span>
                        <ExternalLink className="h-3.5 w-3.5 text-secondary" />
                    </a>
                )}
            </div>
        </article>
    );
};

export default SongCard;
