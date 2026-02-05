import { Film, Play } from 'lucide-react';

const MovieCard = ({ movie, featured = false }) => {
    if (!movie) return null;

    return (
        <div className={`glass rounded-2xl p-6 hover-lift ${featured ? 'col-span-1' : ''}`}>
            <div className="flex items-start gap-4">
                {/* Poster or Icon */}
                {movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-14 h-20 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className={`w-14 h-20 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 items-center justify-center flex-shrink-0 ${movie.poster ? 'hidden' : 'flex'}`}
                >
                    <Film className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted mb-1">Movie of the Day</p>
                    <h3 className="text-lg font-semibold text-text truncate">{movie.title}</h3>
                    {movie.year && <p className="text-muted text-sm">{movie.year}</p>}
                </div>
            </div>

            {/* Trailer Link */}
            {movie.trailer && (
                <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                >
                    <Play className="w-4 h-4" />
                    <span>Watch Trailer</span>
                </a>
            )}
        </div>
    );
};

export default MovieCard;
