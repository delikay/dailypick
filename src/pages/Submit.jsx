import { useState } from 'react';
import { Mail, Music, Film, Send, Check } from 'lucide-react';
import Layout from '../components/Layout';

const Submit = () => {
    const [formData, setFormData] = useState({
        artistName: '',
        songTitle: '',
        movies: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('https://formsubmit.co/ajax/263fb238367735dd5f48e44391562b79', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    artistName: formData.artistName,
                    songTitle: formData.songTitle,
                    movies: formData.movies,
                    submittedDate: new Date().toLocaleDateString()
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setSubmitting(false);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({
                        artistName: '',
                        songTitle: '',
                        movies: ''
                    });
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (err) {
            setError('Failed to submit form. Please try again.');
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-2">Submitted!</h2>
                    <p className="text-muted text-center max-w-md">
                        Your submission has been sent successfully. 
                        Thanks for sharing your recommendations!
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="animate-fade-in max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 warm-shadow">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                        Submit Your Picks
                    </h1>
                    <p className="text-muted">
                        Share your favorite songs and movies with me. Fill out the form below and i'll receive your recommendations via email.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Artist Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                            <Music className="w-4 h-4" />
                            Artist Name
                        </label>
                        <input
                            type="text"
                            name="artistName"
                            value={formData.artistName}
                            onChange={handleChange}
                            required
                            placeholder="Enter the artist's name"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all warm-shadow"
                        />
                    </div>

                    {/* Song Title */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                            <Music className="w-4 h-4" />
                            Song Title
                        </label>
                        <input
                            type="text"
                            name="songTitle"
                            value={formData.songTitle}
                            onChange={handleChange}
                            required
                            placeholder="Enter the song title"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all warm-shadow"
                        />
                    </div>

                    {/* Movies */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                            <Film className="w-4 h-4" />
                            Movies
                        </label>
                        <textarea
                            name="movies"
                            value={formData.movies}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Enter movie titles (one per line or comma-separated)"
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all resize-none warm-shadow"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed warm-shadow"
                    >
                        {submitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                <span>Submit</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 p-4 bg-surface/50 rounded-xl">
                    <p className="text-xs text-muted text-center">
                        Your submission will be sent directly. 
                        No email required!
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Submit;
