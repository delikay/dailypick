export const moods = [
    { id: 'happy', label: 'Happy', color: '#FFD93D', emoji: '😊', gradient: 'from-yellow-400 to-orange-400' },
    { id: 'sad', label: 'Sad', color: '#6B7FD7', emoji: '😢', gradient: 'from-blue-400 to-indigo-500' },
    { id: 'energetic', label: 'Energetic', color: '#FF6B6B', emoji: '⚡', gradient: 'from-red-400 to-pink-500' },
    { id: 'calm', label: 'Calm', color: '#4ECDC4', emoji: '🧘', gradient: 'from-teal-400 to-cyan-400' },
    { id: 'nostalgic', label: 'Nostalgic', color: '#C9B1FF', emoji: '🌅', gradient: 'from-purple-400 to-pink-400' },
    { id: 'romantic', label: 'Romantic', color: '#FF8FA3', emoji: '💕', gradient: 'from-pink-400 to-rose-400' },
    { id: 'reflective', label: 'Reflective', color: '#95E1D3', emoji: '🤔', gradient: 'from-emerald-400 to-teal-400' },
    { id: 'adventurous', label: 'Adventurous', color: '#F9ED69', emoji: '🚀', gradient: 'from-yellow-300 to-lime-400' },
];

export const getMood = (moodId) => {
    return moods.find(m => m.id === moodId) || moods[0];
};

export const getMoodStyle = (moodId) => {
    const mood = getMood(moodId);
    return {
        backgroundColor: mood.color + '20',
        borderColor: mood.color,
        color: mood.color,
    };
};
