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
        <div className="section-frame px-6 py-10 text-left sm:px-8 sm:py-12">
            {Icon && (
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-border/70 bg-surface/90 text-secondary shadow-[0_16px_30px_rgba(16,46,30,0.08)]">
                    <Icon className="h-7 w-7" />
                </div>
            )}

            <div className="max-w-2xl">
                <p className="editorial-kicker mb-3">Nothing here yet</p>
                <h3 className="section-title text-3xl text-text sm:text-4xl">{title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
            </div>

            {actionLabel && actionTo && (
                <div className="mt-8">
                    <Link to={actionTo} className="button-primary">
                        <span>{actionLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EmptyState;

