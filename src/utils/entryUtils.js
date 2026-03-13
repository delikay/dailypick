import { isValidDateString } from './dateUtils';

const HTTP_PROTOCOLS = new Set(['http:', 'https:']);

const SPOTIFY_TRACK_ID_PATTERN = /^[A-Za-z0-9]{22}$/;

const isLikelyPlaceholderSpotifyTrackId = (trackId) => {
    return /^.{0,10}(.{2,3})\1{3,}$/.test(trackId);
};

const sanitizeHttpUrl = (value) => {
    if (typeof value !== 'string') return null;

    const trimmed = value.trim();
    if (!trimmed) return null;

    try {
        const parsedUrl = new URL(trimmed);
        return HTTP_PROTOCOLS.has(parsedUrl.protocol) ? parsedUrl.toString() : null;
    } catch {
        return null;
    }
};

const sanitizeSpotifyTrackUrl = (value) => {
    const parsedUrl = sanitizeHttpUrl(value);
    if (!parsedUrl) return null;

    const spotifyUrl = new URL(parsedUrl);
    if (spotifyUrl.hostname !== 'open.spotify.com') return null;

    const match = spotifyUrl.pathname.match(/^\/track\/([A-Za-z0-9]+)$/);
    if (!match) return null;

    const trackId = match[1];
    if (!SPOTIFY_TRACK_ID_PATTERN.test(trackId)) return null;
    if (isLikelyPlaceholderSpotifyTrackId(trackId)) return null;

    return spotifyUrl.toString();
};

export const sanitizeEntry = (entry) => {
    if (!entry || !isValidDateString(entry.date)) {
        return null;
    }

    return {
        ...entry,
        id: entry.id ?? entry.date,
        song: entry.song
            ? {
                ...entry.song,
                link: sanitizeSpotifyTrackUrl(entry.song.link),
            }
            : null,
        movie: entry.movie
            ? {
                ...entry.movie,
                poster: sanitizeHttpUrl(entry.movie.poster),
                trailer: sanitizeHttpUrl(entry.movie.trailer),
            }
            : null,
    };
};

export const sanitizeEntries = (entries) => {
    return entries.map(sanitizeEntry).filter(Boolean);
};
