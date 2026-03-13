import { useEffect } from 'react';

const DEFAULT_TITLE = 'My Daily Pick';
const DEFAULT_DESCRIPTION = 'A daily journal of songs, movies, and moods.';

const ensureMetaTag = (selector, attributes) => {
    let tag = document.head.querySelector(selector);

    if (!tag) {
        tag = document.createElement('meta');
        document.head.appendChild(tag);
    }

    Object.entries(attributes).forEach(([key, value]) => {
        tag.setAttribute(key, value);
    });

    return tag;
};

const ensureCanonicalLink = () => {
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }

    return canonicalLink;
};

export const usePageMeta = ({
    title,
    description = DEFAULT_DESCRIPTION,
    canonicalPath = '/',
}) => {
    useEffect(() => {
        const nextTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
        document.title = nextTitle;

        ensureMetaTag('meta[name="description"]', {
            name: 'description',
            content: description,
        });

        ensureMetaTag('meta[property="og:title"]', {
            property: 'og:title',
            content: nextTitle,
        });

        ensureMetaTag('meta[property="og:description"]', {
            property: 'og:description',
            content: description,
        });

        ensureMetaTag('meta[name="twitter:title"]', {
            name: 'twitter:title',
            content: nextTitle,
        });

        ensureMetaTag('meta[name="twitter:description"]', {
            name: 'twitter:description',
            content: description,
        });

        const canonicalLink = ensureCanonicalLink();
        canonicalLink.setAttribute(
            'href',
            new URL(canonicalPath, window.location.origin).toString(),
        );
    }, [canonicalPath, description, title]);
};
