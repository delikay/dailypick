import { getMood } from '../utils/moodColors';

const MoodBadge = ({ mood, size = 'md' }) => {
    const moodData = getMood(mood);

    const sizeClasses = {
        sm: 'gap-2 px-3 py-1.5 text-xs',
        md: 'gap-2.5 px-4 py-2 text-sm',
        lg: 'gap-3 px-5 py-2.5 text-sm sm:text-base',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border font-semibold tracking-[0.01em] shadow-[0_10px_25px_rgba(23,20,16,0.06)] ${sizeClasses[size]}`}
            style={{
                backgroundColor: `${moodData.color}18`,
                borderColor: `${moodData.color}40`,
                color: moodData.color,
            }}
        >
            <span className="text-base leading-none sm:text-lg">{moodData.emoji}</span>
            <span>{moodData.label}</span>
        </span>
    );
};

export default MoodBadge;
