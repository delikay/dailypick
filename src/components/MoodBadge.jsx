import { getMood } from '../utils/moodColors';

const MoodBadge = ({ mood, size = 'md' }) => {
    const moodData = getMood(mood);

    const sizeClasses = {
        sm: {
            badge: 'gap-1.5 px-2.5 py-1 text-[0.6875rem]',
            dot: 'h-1.5 w-1.5',
        },
        md: {
            badge: 'gap-2 px-3 py-1.5 text-[0.8125rem]',
            dot: 'h-2 w-2',
        },
        lg: {
            badge: 'gap-2.5 px-4 py-2 text-[0.8125rem] sm:text-sm',
            dot: 'h-2.5 w-2.5',
        },
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border bg-surface/85 font-semibold tracking-[0.01em] shadow-sm ${sizeClasses[size].badge}`}
            style={{
                borderColor: `${moodData.color}28`,
                color: 'var(--color-text)',
            }}
        >
            <span
                className={`rounded-full ${sizeClasses[size].dot}`}
                style={{ backgroundColor: moodData.color }}
                aria-hidden="true"
            />
            <span>{moodData.label}</span>
        </span>
    );
};

export default MoodBadge;
