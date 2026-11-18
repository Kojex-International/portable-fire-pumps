/** Frappe CRM booth visitor form (same UI as CRM Leads → Book booth visitor iframe). */

const DEFAULT_CRM_BOOTH_BOOK_BASE = 'https://crm.kojex.com/booth-book';

function normalizeBaseUrl(raw: string | undefined): string {
	const trimmed = (raw || DEFAULT_CRM_BOOTH_BOOK_BASE).trim().replace(/\/$/, '');
	return trimmed || DEFAULT_CRM_BOOTH_BOOK_BASE;
}

/** CRM page URL for top-level navigation (iPad / staff-assisted booking). */
export function crmBoothBookPageUrl(): string {
	return normalizeBaseUrl(import.meta.env.PUBLIC_CRM_BOOTH_BOOK_URL);
}

/** Embed URL for website iframe — matches `docs/booking-calendar-sync.md`. */
export function crmBoothBookEmbedUrl(): string {
	const base = crmBoothBookPageUrl();
	const url = new URL(base);
	url.searchParams.set('embed', '1');
	return url.toString();
}