import { Heart, Music2, Clapperboard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="page-container pb-3">
            <div className="section-frame px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="editorial-kicker mb-1.5">Daily archive</p>
                        <p className="max-w-xl text-[0.8125rem] leading-relaxed text-muted">
                            Built as a quiet log of songs, films, and the days they belong to.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-1.5 text-[0.8125rem] text-muted md:items-end">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/70 px-3 py-1.5">
                            <Music2 className="h-3.5 w-3.5 text-secondary" />
                            <Clapperboard className="h-3.5 w-3.5 text-secondary" />
                            <span>One song. One movie. Every day.</span>
                        </div>
                        <p className="inline-flex items-center gap-1.5">
                            Made with <Heart className="h-3.5 w-3.5 fill-secondary text-secondary" />
                            by <span className="font-semibold text-text">delikay</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
