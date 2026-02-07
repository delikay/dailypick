import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

/**
 * ShareButton
 * Renders a button that invokes the native Web Share API when available.
 * Falls back to copying the share text + URL to the clipboard.
 */
const ShareButton = ({ entry, iconOnly = false, className = "" }) => {
    const [copied, setCopied] = useState(false);

    if (!entry) return null;

    const shareUrl = `${window.location.origin}/?date=${entry.date}`;
    const shareText = "Today's picks from My daily pick";

    const handleShare = async (e) => {
        e?.stopPropagation?.();
        e?.preventDefault?.();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My daily pick',
                    text: shareText,
                    url: shareUrl,
                });
            } catch (_) {
                /* ignore cancel */
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (_) {
                alert('Unable to copy link');
            }
        }
    };

    if (iconOnly) {
        return (
            <button
                onClick={handleShare}
                title={copied ? 'Copied!' : 'Share'}
                className={`p-2 rounded-full bg-secondary/80 text-white hover:bg-secondary transition-colors shadow absolute top-3 right-3 z-10 ${className}`}
                aria-label="Share"
            >
                {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            </button>
        );
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleShare}
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-colors warm-shadow"
            >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
        </div>
    );
};

export default ShareButton;
