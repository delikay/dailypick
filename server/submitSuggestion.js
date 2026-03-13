const FORM_SUBMIT_ENDPOINT =
    process.env.FORMSUBMIT_ENDPOINT ||
    'https://formsubmit.co/ajax/263fb238367735dd5f48e44391562b79';

const MAX_LENGTH = {
    name: 80,
    suggestion: 1000,
    artistName: 120,
    songTitle: 120,
    movies: 1000,
    website: 120,
};

const normalizeText = (value, maxLength) => {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLength);
};

const createJsonResponse = (status, body) => ({ status, body });

export const readJsonRequestBody = async (request) => {
    const chunks = [];

    for await (const chunk of request) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    if (chunks.length === 0) {
        return {};
    }

    const rawBody = Buffer.concat(chunks).toString('utf8');
    return rawBody ? JSON.parse(rawBody) : {};
};

export const handleSuggestionSubmission = async (payload = {}) => {
    const submission = {
        name: normalizeText(payload.name, MAX_LENGTH.name),
        suggestion: normalizeText(payload.suggestion, MAX_LENGTH.suggestion),
        artistName: normalizeText(payload.artistName, MAX_LENGTH.artistName),
        songTitle: normalizeText(payload.songTitle, MAX_LENGTH.songTitle),
        movies: normalizeText(payload.movies, MAX_LENGTH.movies),
        website: normalizeText(payload.website, MAX_LENGTH.website),
    };

    if (submission.website) {
        return createJsonResponse(400, { error: 'Spam detected.' });
    }

    if (!submission.artistName || !submission.songTitle || !submission.movies) {
        return createJsonResponse(400, {
            error: 'Artist name, song title, and movie picks are required.',
        });
    }

    try {
        const response = await fetch(FORM_SUBMIT_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: submission.name,
                suggestion: submission.suggestion,
                artistName: submission.artistName,
                songTitle: submission.songTitle,
                movies: submission.movies,
                submittedAt: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            return createJsonResponse(502, {
                error: 'The submission service is unavailable right now.',
            });
        }

        return createJsonResponse(200, { ok: true });
    } catch {
        return createJsonResponse(502, {
            error: 'Unable to send your submission right now.',
        });
    }
};
