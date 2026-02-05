import { Music, ExternalLink } from 'lucide-react';

const SongCard = ({ song, featured = false }) => {
    if (!song) return null;

    return (
        <div className={`glass rounded-2xl p-6 hover-lift ${featured ? 'col-span-1' : ''}`}>
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Music className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted mb-1">Song of the Day</p>
                    <h3 className="text-lg font-semibold text-text truncate">{song.title}</h3>
                    <p className="text-muted text-sm truncate">{song.artist}</p>
                </div>
            </div>

            {/* Spotify Link */}
            {song.link && (
                <a
                    href={song.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-sm font-medium"
                >
                    <span>Play on Spotify</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </div>
    );
};

export default SongCard;
