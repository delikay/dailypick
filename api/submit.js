import { handleSuggestionSubmission } from '../server/submitSuggestion.js';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        response.status(405).json({ error: 'Method not allowed.' });
        return;
    }

    const payload =
        typeof request.body === 'string'
            ? JSON.parse(request.body || '{}')
            : request.body || {};

    const { status, body } = await handleSuggestionSubmission(payload);
    response.status(status).json(body);
}
