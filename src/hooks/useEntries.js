import initialEntries from '../data/entries.json';
import { getToday } from '../utils/dateUtils';

export const useEntries = () => {
    const entries = initialEntries;
    const loading = false;

    // Get today's entry
    const getTodayEntry = () => {
        const today = getToday();
        return entries.find(entry => entry.date === today);
    };

    // Get entry by date
    const getEntryByDate = (date) => {
        return entries.find(entry => entry.date === date);
    };

    // Get all entries sorted by date
    const getAllEntries = () => {
        return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    // Filter entries by mood
    const getEntriesByMood = (moodId) => {
        return entries.filter(entry => entry.mood === moodId);
    };

    return {
        entries,
        loading,
        getTodayEntry,
        getEntryByDate,
        getAllEntries,
        getEntriesByMood,
    };
};
