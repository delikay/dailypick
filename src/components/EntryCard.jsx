import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import MoodBadge from './MoodBadge';
import { formatShortDate, getDaysAgo } from '../utils/dateUtils';

const EntryCard = ({ entry }) => {
    if (!entry) return null;

    return (
        <Link
            to={`/?date=${entry.date}`}
            className="card-shell hover-lift group block p-5 sm:p-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-secondary">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatShortDate(entry.date)}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-muted">{getDaysAgo(entry.date)}</p>
                </div>

                <MoodBadge mood={entry.mood} size="sm" />
            </div>

            <div className="accent-rule my-5" />

            <div className="space-y-4">
                <div className="min-w-0 rounded-[1.15rem] border border-border/65 bg-surface/75 px-4 py-3">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                        Song
                    </p>
                    <p className="mt-1 truncate text-base font-semibold text-text">
                        {entry.song?.title}
                    </p>
                    <p className="truncate text-sm text-muted">{entry.song?.artist}</p>
                </div>

                <div className="min-w-0 rounded-[1.15rem] border border-border/65 bg-surface/75 px-4 py-3">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                        Movie
                    </p>
                    <p className="mt-1 truncate text-base font-semibold text-text">
                        {entry.movie?.title}
                    </p>
                    {entry.movie?.year && <p className="text-sm text-muted">{entry.movie.year}</p>}
                </div>
            </div>

            {entry.caption && (
                <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-muted">
                    {entry.caption}
                </p>
            )}

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                <span>Open entry</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
        </Link>
    );
};

export default EntryCard;
