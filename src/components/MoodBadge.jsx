import { getMood } from '../utils/moodColors';

const MoodBadge = ({ mood, size = 'md' }) => {
    const moodData = getMood(mood);

    const sizeClasses = {
        sm: {
            badge: 'gap-2 px-3 py-1.5 text-xs',
            dot: 'h-2 w-2',
        },
        md: {
            badge: 'gap-2.5 px-4 py-2 text-sm',
            dot: 'h-2.5 w-2.5',
        },
        lg: {
            badge: 'gap-3 px-5 py-2.5 text-sm sm:text-base',
            dot: 'h-3 w-3',
        },
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border bg-surface/85 font-semibold tracking-[0.01em] shadow-[0_8px_20px_rgba(15,44,29,0.05)] ${sizeClasses[size].badge}`}
            style={{
                borderColor: `${moodData.color}30`,
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

