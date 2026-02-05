import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Music, Film, MessageSquare, Calendar, Check } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { getToday } from '../utils/dateUtils';
import { moods } from '../utils/moodColors';
import Layout from '../components/Layout';

const AddEntry = () => {
    const navigate = useNavigate();
    const { addEntry, getEntryByDate } = useEntries();
    const today = getToday();

    const [formData, setFormData] = useState({
        date: today,
        mood: '',
        song: { title: '', artist: '', link: '' },
        movie: { title: '', year: '', poster: '', trailer: '' },
        caption: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const existingEntry = getEntryByDate(formData.date);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate brief delay for UX
        setTimeout(() => {
            addEntry({
                ...formData,
                movie: {
                    ...formData.movie,
                    year: formData.movie.year ? parseInt(formData.movie.year) : null,
                },
            });
            setSuccess(true);
            setTimeout(() => navigate('/'), 1000);
        }, 300);
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateSong = (field, value) => {
        setFormData(prev => ({
            ...prev,
            song: { ...prev.song, [field]: value },
        }));
    };

    const updateMovie = (field, value) => {
        setFormData(prev => ({
            ...prev,
            movie: { ...prev.movie, [field]: value },
        }));
    };

    const isValid = formData.mood && formData.song.title && formData.movie.title;

    if (success) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                        <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-2">Entry Saved!</h2>
                    <p className="text-muted">Redirecting to home...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto animate-fade-in">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text flex items-center justify-center gap-3">
                        <Plus className="w-8 h-8 text-primary" />
                        Add Entry
                    </h1>
                    <p className="text-muted mt-2">
                        Share your song and movie of the day
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Date Picker */}
                    <div className="glass rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-3">
                            <Calendar className="w-4 h-4 text-primary" />
                            Date
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => updateField('date', e.target.value)}
                            max={today}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        {existingEntry && (
                            <p className="mt-2 text-sm text-yellow-400">
                                ⚠️ An entry exists for this date. Saving will update it.
                            </p>
                        )}
                    </div>

                    {/* Mood Selector */}
                    <div className="glass rounded-2xl p-6">
                        <label className="block text-sm font-medium text-text mb-4">
                            How are you feeling? *
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {moods.map(mood => (
                                <button
                                    key={mood.id}
                                    type="button"
                                    onClick={() => updateField('mood', mood.id)}
                                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${formData.mood === mood.id
                                            ? 'border-current scale-105'
                                            : 'border-transparent bg-surface hover:bg-surface-light'
                                        }`}
                                    style={formData.mood === mood.id ? { borderColor: mood.color, backgroundColor: mood.color + '20' } : {}}
                                >
                                    <span className="text-2xl">{mood.emoji}</span>
                                    <span className="text-xs text-muted">{mood.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Song Section */}
                    <div className="glass rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-4">
                            <Music className="w-4 h-4 text-green-400" />
                            Song of the Day *
                        </label>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Song title"
                                value={formData.song.title}
                                onChange={(e) => updateSong('title', e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            />
                            <input
                                type="text"
                                placeholder="Artist name"
                                value={formData.song.artist}
                                onChange={(e) => updateSong('artist', e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            />
                            <input
                                type="url"
                                placeholder="Spotify link (optional)"
                                value={formData.song.link}
                                onChange={(e) => updateSong('link', e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            />
                        </div>
                    </div>

                    {/* Movie Section */}
                    <div className="glass rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-4">
                            <Film className="w-4 h-4 text-red-400" />
                            Movie of the Day *
                        </label>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Movie title"
                                value={formData.movie.title}
                                onChange={(e) => updateMovie('title', e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            />
                            <input
                                type="number"
                                placeholder="Year (optional)"
                                value={formData.movie.year}
                                onChange={(e) => updateMovie('year', e.target.value)}
                                min="1900"
                                max="2030"
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            />
                            <input
                                type="url"
                                placeholder="Poster image URL (optional)"
                                value={formData.movie.poster}
                                onChange={(e) => updateMovie('poster', e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            />
                            <input
                                type="url"
                                placeholder="Trailer link (optional)"
                                value={formData.movie.trailer}
                                onChange={(e) => updateMovie('trailer', e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            />
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="glass rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-3">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            Caption (optional)
                        </label>
                        <textarea
                            placeholder="What's on your mind today?"
                            value={formData.caption}
                            onChange={(e) => updateField('caption', e.target.value)}
                            rows={3}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!isValid || submitting}
                        className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${isValid && !submitting
                                ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                                : 'bg-surface-light text-muted cursor-not-allowed'
                            }`}
                    >
                        {submitting ? 'Saving...' : existingEntry ? 'Update Entry' : 'Save Entry'}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddEntry;
