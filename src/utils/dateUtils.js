const MS_PER_DAY = 1000 * 60 * 60 * 24;

const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

const getDaysInMonth = (year, month) => {
    const monthLengths = [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    return monthLengths[month - 1] ?? 0;
};

export const parseDateParts = (dateString) => {
    if (typeof dateString !== 'string') return null;

    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;

    const [, yearString, monthString, dayString] = match;
    const year = Number(yearString);
    const month = Number(monthString);
    const day = Number(dayString);

    if (month < 1 || month > 12) return null;
    if (day < 1 || day > getDaysInMonth(year, month)) return null;

    return { year, month, day };
};

export const isValidDateString = (dateString) => {
    return parseDateParts(dateString) !== null;
};

const createLocalDate = (dateString) => {
    const parts = parseDateParts(dateString);
    if (!parts) return null;

    return new Date(parts.year, parts.month - 1, parts.day);
};

export const formatIsoDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatDate = (dateString) => {
    const date = createLocalDate(dateString);
    if (!date) return dateString;

    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatShortDate = (dateString) => {
    const date = createLocalDate(dateString);
    if (!date) return dateString;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
};

export const getToday = () => {
    return formatIsoDate(new Date());
};

export const isToday = (dateString) => {
    return isValidDateString(dateString) && dateString === getToday();
};

const toUtcDayValue = (parts) => {
    return Date.UTC(parts.year, parts.month - 1, parts.day) / MS_PER_DAY;
};

export const getDaysAgo = (dateString) => {
    const parts = parseDateParts(dateString);
    const todayParts = parseDateParts(getToday());

    if (!parts || !todayParts) return '';

    const diffDays = Math.round(toUtcDayValue(todayParts) - toUtcDayValue(parts));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 0) return formatShortDate(dateString);
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }

    return formatShortDate(dateString);
};

export const getPreviousDays = (daysCount) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < daysCount; i += 1) {
        const date = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - i,
        );
        dates.push(formatIsoDate(date));
    }

    return dates;
};
