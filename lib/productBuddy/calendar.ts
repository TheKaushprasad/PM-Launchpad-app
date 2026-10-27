// Calendar helpers for Product Buddy that need no Google sign-in: an "Add to Google Calendar"
// link and an .ics file (which Gmail and Outlook show as an invite with Yes / No / Maybe).

export interface CalendarEvent {
  uid: string;
  title: string;
  description: string;
  location: string;
  startAt: string; // ISO
  endAt: string; // ISO
  sequence?: number; // bump on every change so calendars replace the old copy
  organizerEmail?: string;
  attendees?: { name: string; email: string }[];
}

const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export function googleCalendarLink(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${icsDate(event.startAt)}/${icsDate(event.endAt)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// Lines longer than 75 characters must be folded (RFC 5545).
const fold = (line: string) => {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += 73) parts.push((i ? ' ' : '') + line.slice(i, i + 73));
  return parts.join('\r\n');
};

/**
 * REQUEST makes email clients show an invite; CANCEL removes the event; PUBLISH is for a plain download.
 * The same uid with a higher sequence replaces the earlier copy.
 */
export function buildIcs(event: CalendarEvent, method: 'REQUEST' | 'CANCEL' | 'PUBLISH' = 'PUBLISH'): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The NooB PM//Product Buddy//EN',
    'CALSCALE:GREGORIAN',
    `METHOD:${method}`,
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(event.startAt)}`,
    `DTEND:${icsDate(event.endAt)}`,
    `SEQUENCE:${event.sequence ?? 0}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    `STATUS:${method === 'CANCEL' ? 'CANCELLED' : 'CONFIRMED'}`,
  ];
  if (event.organizerEmail) lines.push(`ORGANIZER;CN=The NooB PM:mailto:${event.organizerEmail}`);
  for (const a of event.attendees || []) {
    lines.push(`ATTENDEE;CN=${escapeText(a.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${a.email}`);
  }
  if (method !== 'CANCEL') {
    lines.push('BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY', 'DESCRIPTION:Product Buddy mock interview in 30 minutes', 'END:VALARM');
  }
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** The calendar entry for a confirmed Product Buddy session; the same for both people. */
export function sessionCalendarEvent(
  session: { id: string; interviewType: string; topic: string; notes: string; startAt: string; endAt: string; meetingUrl: string; icsSequence: number; participants: Record<string, { name: string; email: string; role: string }> },
  appUrl: string,
): CalendarEvent {
  const people = Object.values(session.participants);
  const description = [
    `Product Buddy mock interview: ${session.interviewType}`,
    session.topic && `Topic: ${session.topic}`,
    ...people.map((p) => `${p.name}: ${p.role}`),
    session.notes && `Notes: ${session.notes}`,
    `Join the call: ${session.meetingUrl}`,
    `Manage or cancel: ${appUrl}/buddy?tab=sessions`,
  ].filter(Boolean).join('\n');
  return {
    uid: `buddy-${session.id}@thenoobpm.com`,
    title: `Product Buddy mock: ${session.interviewType} (${people.map((p) => p.name.split(' ')[0]).join(' & ')})`,
    description,
    location: session.meetingUrl,
    startAt: session.startAt,
    endAt: session.endAt,
    sequence: session.icsSequence,
  };
}
