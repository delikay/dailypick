import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionTo
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            {Icon && (
                <div className="w-20 h-20 rounded-2xl bg-surface flex items-center justify-center mb-6">
                    <Icon className="w-10 h-10 text-muted" />
                </div>
            )}
            <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
            <p className="text-muted max-w-md mb-6">{description}</p>
            {actionLabel && actionTo && (
                <Link
                    to={actionTo}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-opacity"
                >
                    <Plus className="w-5 h-5" />
                    {actionLabel}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
