import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clapperboard, Music2, Quote } from 'lucide-react';
import { formatShortDate, getDaysAgo } from '../utils/dateUtils';

const EntryCard = ({ entry }) => {
    if (!entry) return null;

    return (
        <Link
            to={`/?date=${entry.date}`}
            className="card-shell block overflow-hidden p-0"
        >
            <div className="relative z-[1] flex h-full flex-col">
                <div className="flex items-start justify-between gap-2.5 border-b border-border/50 bg-surface/60 px-4 py-3 sm:px-5">
                    <div>
                        <p className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-secondary">
                            <Calendar className="h-3 w-3" />
                            <span>{formatShortDate(entry.date)}</span>
                        </p>
                        <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
                            {getDaysAgo(entry.date)}
                        </p>
                    </div>
                </div>

                <div className="flex-1 space-y-2.5 px-4 py-4 sm:px-5">
                    <div className="surface-panel min-w-0 rounded-lg border border-border/60 bg-surface/80 px-3.5 py-3">
                        <div className="flex items-start gap-2.5">
                            <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                                <Music2 className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                    Song
                                </p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-text">
                                    {entry.song?.title}
                                </p>
                                <p className="truncate text-[0.8125rem] text-muted">{entry.song?.artist}</p>
                            </div>
                        </div>
                    </div>

                    <div className="surface-panel min-w-0 rounded-lg border border-border/60 bg-surface/80 px-3.5 py-3">
                        <div className="flex items-start gap-2.5">
                            <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                                <Clapperboard className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                    Movie
                                </p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-text">
                                    {entry.movie?.title}
                                </p>
                                {entry.movie?.year && (
                                    <p className="text-[0.8125rem] text-muted">{entry.movie.year}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {entry.caption && (
                        <div className="rounded-lg border border-border/50 bg-surface/60 px-3.5 py-2.5">
                            <div className="inline-flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                <Quote className="h-3 w-3" />
                                <span>Note</span>
                            </div>
                            <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-muted">
                                {entry.caption}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-border/50 bg-surface/60 px-4 py-3 sm:px-5">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">
                        Open entry
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-secondary">
                        View day
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default EntryCard;
