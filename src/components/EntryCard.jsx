import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clapperboard, Music2, Quote } from 'lucide-react';
import MoodBadge from './MoodBadge';
import { formatShortDate, getDaysAgo } from '../utils/dateUtils';

const EntryCard = ({ entry }) => {
    if (!entry) return null;

    return (
        <Link
            to={`/?date=${entry.date}`}
            className="card-shell hover-lift block overflow-hidden p-0"
        >
            <div className="relative z-[1] flex h-full flex-col">
                <div className="flex items-start justify-between gap-3 border-b border-border/55 bg-surface/65 px-5 py-4 sm:px-6">
                    <div>
                        <p className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-secondary">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatShortDate(entry.date)}</span>
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                            {getDaysAgo(entry.date)}
                        </p>
                    </div>

                    <MoodBadge mood={entry.mood} size="sm" />
                </div>

                <div className="flex-1 space-y-3 px-5 py-5 sm:px-6">
                    <div className="surface-panel min-w-0 rounded-[1.1rem] border border-border/65 bg-surface/80 px-4 py-3.5">
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                                <Music2 className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted">
                                    Song
                                </p>
                                <p className="mt-1 truncate text-base font-semibold text-text">
                                    {entry.song?.title}
                                </p>
                                <p className="truncate text-sm text-muted">{entry.song?.artist}</p>
                            </div>
                        </div>
                    </div>

                    <div className="surface-panel min-w-0 rounded-[1.1rem] border border-border/65 bg-surface/80 px-4 py-3.5">
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/12 text-secondary">
                                <Clapperboard className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted">
                                    Movie
                                </p>
                                <p className="mt-1 truncate text-base font-semibold text-text">
                                    {entry.movie?.title}
                                </p>
                                {entry.movie?.year && (
                                    <p className="text-sm text-muted">{entry.movie.year}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {entry.caption && (
                        <div className="rounded-[1.1rem] border border-border/55 bg-surface/65 px-4 py-3">
                            <div className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted">
                                <Quote className="h-3.5 w-3.5" />
                                <span>Note</span>
                            </div>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                                {entry.caption}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-border/55 bg-surface/65 px-5 py-4 sm:px-6">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                        Open entry
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                        View day
                        <ArrowRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default EntryCard;
