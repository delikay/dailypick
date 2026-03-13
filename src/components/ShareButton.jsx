import { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';
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

    const label =
        status === 'copied' ? 'Copied!' : status === 'error' ? 'Unable to copy' : 'Share entry';

    if (iconOnly) {
        return (
            <button
                onClick={handleShare}
                type="button"
                title={label}
                className={`absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface/90 text-text shadow-[0_12px_24px_rgba(24,21,18,0.08)] hover:bg-white ${className}`}
                aria-label={label}
            >
                {status === 'copied' ? (
                    <Check className="h-4 w-4 text-secondary" />
                ) : (
                    <Link2 className="h-4 w-4 text-secondary" />
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleShare}
            type="button"
            className={`button-secondary ${className}`}
        >
            {status === 'copied' ? (
                <Check className="h-4 w-4 text-secondary" />
            ) : (
                <Share2 className="h-4 w-4 text-secondary" />
            )}
            <span>{label}</span>
        </button>
    );
};

export default ShareButton;
