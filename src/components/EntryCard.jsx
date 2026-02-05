import { Link } from 'react-router-dom';
import { Music, Film, Calendar } from 'lucide-react';
import MoodBadge from './MoodBadge';
import { formatShortDate, getDaysAgo } from '../utils/dateUtils';

const EntryCard = ({ entry }) => {
    if (!entry) return null;

    return (
        <Link
            to={`/?date=${entry.date}`}
            className="glass rounded-2xl p-5 hover-lift block group"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-muted text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatShortDate(entry.date)}</span>
                </div>
                <span className="text-xs text-muted">{getDaysAgo(entry.date)}</span>
            </div>

            {/* Mood */}
            <div className="mb-4">
                <MoodBadge mood={entry.mood} size="sm" />
            </div>

            {/* Content Preview */}
            <div className="space-y-2">
                {/* Song */}
                <div className="flex items-center gap-2 text-sm">
                    <Music className="w-4 h-4 text-green-400" />
                    <span className="text-text truncate">{entry.song?.title}</span>
                    <span className="text-muted truncate">- {entry.song?.artist}</span>
                </div>

                {/* Movie */}
                <div className="flex items-center gap-2 text-sm">
                    <Film className="w-4 h-4 text-red-400" />
                    <span className="text-text truncate">{entry.movie?.title}</span>
                    {entry.movie?.year && (
                        <span className="text-muted">({entry.movie.year})</span>
                    )}
                </div>
            </div>

            {/* Caption Preview */}
            {entry.caption && (
                <p className="mt-3 text-sm text-muted line-clamp-2 italic">
                    "{entry.caption}"
                </p>
            )}

            {/* Hover indicator */}
            <div className="mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View full entry →
            </div>
        </Link>
    );
};

export default EntryCard;
