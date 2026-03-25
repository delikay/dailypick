import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionTo,
}) => {
    return (
        <div className="section-frame px-5 py-8 text-left sm:px-6 sm:py-10">
            {Icon && (
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl border border-border/60 bg-surface/90 text-secondary shadow-sm">
                    <Icon className="h-6 w-6" />
                </div>
            )}

            <div className="max-w-2xl">
                <p className="editorial-kicker mb-2">Nothing here yet</p>
                <h3 className="section-title text-2xl text-text sm:text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
            </div>

            {actionLabel && actionTo && (
                <div className="mt-6">
                    <Link to={actionTo} className="button-primary">
                        <span>{actionLabel}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EmptyState;
