import { Link } from 'react-router-dom';
import { ArrowRight, Music, Film, Calendar } from 'lucide-react';
import MoodBadge from './MoodBadge';
import { formatShortDate, getDaysAgo } from '../utils/dateUtils';

const EntryCard = ({ entry }) => {
    if (!entry) return null;

    return (
        <Link
            to={`/?date=${entry.date}`}
            className="glass rounded-2xl p-6 hover-lift block group border border-border/30 shadow-sm hover:shadow-lg transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-muted text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{formatShortDate(entry.date)}</span>
                </div>
                <span className="text-xs text-muted bg-surface/50 px-2 py-1 rounded-full">{getDaysAgo(entry.date)}</span>
            </div>

            <div className="mb-5 flex justify-center">
                <MoodBadge mood={entry.mood} size="md" />
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                    <Music className="w-5 h-5 text-secondary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <span className="text-text font-medium truncate block">{entry.song?.title}</span>
                        <span className="text-muted truncate block">- {entry.song?.artist}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <Film className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <span className="text-text font-medium truncate block">{entry.movie?.title}</span>
                        {entry.movie?.year && (
                            <span className="text-muted">({entry.movie.year})</span>
                        )}
                    </div>
                </div>
            </div>

            {entry.caption && (
                <p className="mt-4 text-sm text-muted line-clamp-2 italic leading-relaxed">
                    "{entry.caption}"
                </p>
            )}

            <div className="mt-5 inline-flex items-center gap-2 text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                <span>View full entry</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </div>
        </Link>
    );
};

export default EntryCard;
