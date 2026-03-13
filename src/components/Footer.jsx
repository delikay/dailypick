import { Heart, Music2, Clapperboard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="page-container pb-4">
            <div className="section-frame px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="editorial-kicker mb-2">Daily archive</p>
                        <p className="max-w-xl text-sm leading-relaxed text-muted">
                            Built as a quiet log of songs, films, and the moods that connected them.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-sm text-muted md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-4 py-2">
                            <Music2 className="h-4 w-4 text-secondary" />
                            <Clapperboard className="h-4 w-4 text-secondary" />
                            <span>One song. One movie. Every day.</span>
                        </div>
                        <p className="inline-flex items-center gap-1.5">
                            Made with <Heart className="h-4 w-4 fill-secondary text-secondary" />
                            by <span className="font-semibold text-text">delikay</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
