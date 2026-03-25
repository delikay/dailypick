export const moods = [
    { id: 'happy', label: 'Happy', color: '#FFD93D', emoji: 'ðŸ˜Š' },
    { id: 'sad', label: 'Sad', color: '#6B7FD7', emoji: 'ðŸ˜¢' },
    { id: 'energetic', label: 'Energetic', color: '#FF6B6B', emoji: 'âš¡' },
    { id: 'calm', label: 'Calm', color: '#4ECDC4', emoji: 'ðŸ§˜' },
    { id: 'nostalgic', label: 'Nostalgic', color: '#C9B1FF', emoji: 'ðŸŒ…' },
    { id: 'romantic', label: 'Romantic', color: '#FF8FA3', emoji: 'ðŸ’•' },
    { id: 'reflective', label: 'Reflective', color: '#95E1D3', emoji: 'ðŸ¤”' },
    { id: 'adventurous', label: 'Adventurous', color: '#F9ED69', emoji: 'ðŸš€' },
];

export const getMood = (moodId) => {
    return moods.find(m => m.id === moodId) || moods[0];
};

