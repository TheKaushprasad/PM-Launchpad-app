import type { AvailabilityWindow, Day } from './types';

// Availability is stored as weekly local-time windows plus a timezone; sessions use exact UTC times.

const WEEKDAY: Record<string, Day> = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
};

/** The weekday and minutes past midnight of an instant, as seen in `timezone`. */
export function localParts(iso: string, timezone: string): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value || '';
  return { day: WEEKDAY[get('weekday')] || 'Mon', minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

/** True when the whole session fits inside one of the person's weekly windows. */
export function fitsAvailability(windows: AvailabilityWindow[], timezone: string, startAt: string, durationMinutes: number): boolean {
  const { day, minutes } = localParts(startAt, timezone);
  return windows.some((w) => w.day === day && toMinutes(w.start) <= minutes && minutes + durationMinutes <= toMinutes(w.end));
}

export const isValidTimezone = (tz: string) => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

export function formatSlot(iso: string, timezone: string, durationMinutes?: number): string {
  const date = new Date(iso);
  const day = date.toLocaleDateString('en-IN', { timeZone: timezone, weekday: 'short', day: 'numeric', month: 'short' });
  const time = date.toLocaleTimeString('en-IN', { timeZone: timezone, hour: 'numeric', minute: '2-digit', hour12: true });
  const zone = new Intl.DateTimeFormat('en-IN', { timeZone: timezone, timeZoneName: 'short' }).formatToParts(date).find((p) => p.type === 'timeZoneName')?.value || timezone;
  return `${day}, ${time} ${zone}${durationMinutes ? ` · ${durationMinutes} min` : ''}`;
}

export function formatWindows(windows: AvailabilityWindow[]): string {
  return windows.map((w) => `${w.day} ${w.start}–${w.end}`).join(', ');
}
