/** Active trade show surfaced on `/en/events` (QR landing + booth booking). */

export const tradeShowEvent = {
	isActive: true,
	organizationName: 'Ontario Association of Fire Chiefs',
	tradeShowName: 'OAFC 2026 Conference and Trade Show',
	heroBadge: 'OAFC 2026 Conference and Trade Show',
	boothNumber: '60',
	dateRange: 'November 19–21, 2026',
	venueName: 'Niagara Falls Convention Centre',
	venueCity: 'Niagara Falls, ON',
	officialEventUrl: 'mailto:events@oafc.on.ca',
} as const;

export function tradeShowEventSummary(): string {
	return `${tradeShowEvent.dateRange} · ${tradeShowEvent.venueName}, ${tradeShowEvent.venueCity}`;
}