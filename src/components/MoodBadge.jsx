import { getMood } from '../utils/moodColors';

const MoodBadge = ({ mood, size = 'md' }) => {
    const moodData = getMood(mood);

    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${sizeClasses[size]}`}
            style={{
                backgroundColor: moodData.color + '20',
                borderColor: moodData.color + '40',
                color: moodData.color,
            }}
        >
            <span>{moodData.emoji}</span>
            <span>{moodData.label}</span>
        </span>
    );
};

export default MoodBadge;
