import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout>
            <div className="animate-fade-in max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-text mb-6">About My daily pick</h1>

                <div className="space-y-4 text-muted">
                    <p className="text-lg">
                        My daily pick is my personal journal where I capture my daily mood through the songs and movies that resonate with me.
                    </p>

                    <p>
                        Each day, I record how I’m feeling, share a song that matches my mood, and choose a movie that complements my emotional state. Over time, this becomes a meaningful archive of my emotional journey told through music and movie.
                    </p>

                    <p>
                        Whether I'm feeling energetic and need an upbeat track, nostalgic and craving a classic movie, or reflective and drawn to something more contemplative, My daily pick helps me document those moments and uncover patterns in my moods and tastes.
                    </p>

                    <div className="mt-8 p-6 bg-surface rounded-xl">
                        <h2 className="text-xl font-semibold text-text mb-3">Features</h2>
                        <ul className="space-y-2 text-sm">
                            <li>• Daily mood tracking with expressive emojis</li>
                            <li>• Song and movie recommendations for each day</li>
                            <li>• Personal captions to capture thoughts</li>
                            <li>• Browse archive of entries</li>
                            <li>• Share my daily picks with friends</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
