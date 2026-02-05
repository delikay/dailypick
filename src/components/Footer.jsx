import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto py-6 text-center">
            <p className="text-muted text-sm flex items-center justify-center gap-1">
                Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> for daily vibes
            </p>
        </footer>
    );
};

export default Footer;
