import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { formatDate, isToday } from '../utils/dateUtils';

const copyText = async (value) => {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};

const buildShareText = (entry) => {
    const songTitle = entry.song?.title || 'a song';
    const movieTitle = entry.movie?.title || 'a movie';
    const label = isToday(entry.date)
        ? "Today's pick"
        : `My Daily Pick for ${formatDate(entry.date)}`;

    return `${label}: ${songTitle} and ${movieTitle}.`;
};

const ShareButton = ({ entry, iconOnly = false, className = '' }) => {
    const [status, setStatus] = useState('idle');

    if (!entry) return null;

    const shareUrl = `${window.location.origin}/?date=${entry.date}`;
    const shareText = buildShareText(entry);

    const setCopiedState = () => {
        setStatus('copied');
        window.setTimeout(() => setStatus('idle'), 2000);
    };

    const handleShare = async (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Daily Pick',
                    text: shareText,
                    url: shareUrl,
                });
                return;
            } catch {
                setStatus('idle');
            }
        }

        try {
            await copyText(`${shareText} ${shareUrl}`);
            setCopiedState();
        } catch {
            setStatus('error');
            window.setTimeout(() => setStatus('idle'), 2000);
        }
    };

    const icon = status === 'copied' ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />;
    const label = status === 'copied' ? 'Copied!' : status === 'error' ? 'Unable to copy' : 'Share';

    if (iconOnly) {
        return (
            <button
                onClick={handleShare}
                type="button"
                title={label}
                className={`p-2 rounded-full bg-secondary/80 text-white hover:bg-secondary transition-colors shadow absolute top-3 right-3 z-10 ${className}`}
                aria-label={label}
            >
                {icon}
            </button>
        );
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleShare}
                type="button"
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-colors warm-shadow"
            >
                {status === 'copied' ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{label}</span>
            </button>
        </div>
    );
};

export default ShareButton;
