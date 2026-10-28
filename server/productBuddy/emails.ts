import { getResendClient } from '../../services/resendService';
import { buildIcs, googleCalendarLink, sessionCalendarEvent } from '../../lib/productBuddy/calendar';
import { formatSlot } from '../../lib/productBuddy/time';
import { SESSION_KIND_LABELS, type BuddyRequest, type BuddySession } from '../../lib/productBuddy/types';

// Product Buddy emails, sent through Resend. Email is the notification, never the system of record:
// every action (accept, decline, cancel) happens on the site. Without RESEND_API_KEY (common in local
// dev) emails are skipped and the site still works; the session card has the same calendar links.

const SENDER = 'The NooB PM <no-reply@thenoobpm.com>';
const ORGANIZER = 'no-reply@thenoobpm.com';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

interface Mail {
  to: string;
  subject: string;
  lines: string[]; // plain sentences; "Label: value" lines are shown as rows
  button?: { label: string; url: string };
  extraButtons?: { label: string; url: string }[];
  ics?: { content: string; method: 'REQUEST' | 'CANCEL' };
}

function render(mail: Mail) {
  const row = (line: string) => {
    const i = line.indexOf(': ');
    return i > 0 && i < 24
      ? `<tr><td style="padding:4px 12px 4px 0;color:#64748B;font-size:14px;white-space:nowrap;vertical-align:top">${esc(line.slice(0, i))}</td><td style="padding:4px 0;font-size:14px;color:#0F172A;font-weight:600">${esc(line.slice(i + 2))}</td></tr>`
      : `<tr><td colspan="2" style="padding:6px 0;font-size:15px;line-height:1.5;color:#1E293B">${esc(line)}</td></tr>`;
  };
  const btn = (b: { label: string; url: string }, primary: boolean) =>
    `<a href="${esc(b.url)}" style="display:inline-block;margin:6px 8px 0 0;padding:10px 18px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;${primary ? 'background:#064E3B;color:#fff' : 'background:#ECFDF5;color:#064E3B;border:1px solid #A7F3D0'}">${esc(b.label)}</a>`;
  const buttons = [mail.button && btn(mail.button, true), ...(mail.extraButtons || []).map((b) => btn(b, false))].filter(Boolean).join('');
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#F1F5F9;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif">
<table role="presentation" width="100%" style="padding:28px 16px"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px;background:#fff;border:1px solid #E2E8F0;border-radius:16px;padding:28px">
<tr><td style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#047857;padding-bottom:8px">Product Buddy · The NooB PM</td></tr>
<tr><td><table role="presentation">${mail.lines.map(row).join('')}</table></td></tr>
<tr><td style="padding-top:14px">${buttons}</td></tr>
<tr><td style="padding-top:22px;font-size:12px;color:#94A3B8">You got this because you have a Product Buddy profile on thenoobpm.com. Turn off matching on your profile to stop new requests.</td></tr>
</table></td></tr></table></body></html>`;
  const text = [...mail.lines, mail.button && `${mail.button.label}: ${mail.button.url}`, ...(mail.extraButtons || []).map((b) => `${b.label}: ${b.url}`)].filter(Boolean).join('\n');
  return { html, text };
}

async function send(mail: Mail): Promise<void> {
  if (!mail.to || !process.env.RESEND_API_KEY) {
    if (mail.to) console.log(`[ProductBuddy] RESEND_API_KEY not set, skipped email: ${mail.subject}`);
    return;
  }
  const { html, text } = render(mail);
  try {
    const { error } = await getResendClient().emails.send({
      from: SENDER,
      to: [mail.to],
      subject: mail.subject,
      html,
      text,
      attachments: mail.ics
        ? [{ filename: mail.ics.method === 'CANCEL' ? 'cancel.ics' : 'invite.ics', content: Buffer.from(mail.ics.content), contentType: `text/calendar; charset=utf-8; method=${mail.ics.method}` }]
        : undefined,
    });
    if (error) console.error('[ProductBuddy] Email failed:', error.message);
  } catch (err: any) {
    // A failed email never undoes the booking; the request or session is still on the site.
    console.error('[ProductBuddy] Email failed:', err?.message || err);
  }
}

const first = (name: string) => name.split(' ')[0] || name;

export async function emailNewRequest(request: BuddyRequest, recipient: { name: string; email: string; timezone: string }, appUrl: string) {
  await send({
    to: recipient.email,
    subject: `${first(request.requester.name)} wants a ${request.interviewType} mock interview with you`,
    lines: [
      `Hi ${first(recipient.name)},`,
      `${request.requester.name} (${request.requester.currentRole || request.requester.profession}) sent you a Product Buddy mock interview request.`,
      `Interview: ${request.interviewType}`,
      `Format: ${SESSION_KIND_LABELS[request.kind]}`,
      `When: ${formatSlot(request.startAt, recipient.timezone, request.durationMinutes)}`,
      ...(request.topic ? [`Topic: ${request.topic}`] : []),
      `This request went to up to 3 people. The first to accept gets the session.`,
    ],
    button: { label: 'Accept or decline', url: `${appUrl}/buddy?tab=requests&request=${request.id}` },
  });
}

export async function emailSlotFilled(request: BuddyRequest, to: { name: string; email: string }, appUrl: string) {
  await send({
    to: to.email,
    subject: `${first(request.requester.name)} found a partner for this slot`,
    lines: [
      `Hi ${first(to.name)},`,
      `${request.requester.name} found a Product Buddy for the ${request.interviewType} mock, so this request is closed. Thanks for offering!`,
      `Want your own practice slot? Find a buddy in a couple of clicks.`,
    ],
    button: { label: 'Find a buddy', url: `${appUrl}/buddy` },
  });
}

export async function emailAllDeclined(request: BuddyRequest, to: { email: string }, appUrl: string) {
  await send({
    to: to.email,
    subject: `No one could take your ${request.interviewType} mock`,
    lines: [
      `Hi ${first(request.requester.name)},`,
      `Everyone you asked for ${formatSlot(request.startAt, request.timezone)} said no or ran out of time. Try another time, or ask different people.`,
    ],
    button: { label: 'Find another buddy', url: `${appUrl}/buddy` },
  });
}

export async function emailSessionConfirmed(session: BuddySession, uid: string, timezone: string, appUrl: string) {
  const me = session.participants[uid];
  const partner = Object.entries(session.participants).find(([id]) => id !== uid)?.[1];
  if (!me || !partner) return;
  const event = sessionCalendarEvent(session, appUrl);
  const ics = buildIcs({ ...event, organizerEmail: ORGANIZER, attendees: Object.values(session.participants).filter((p) => p.email) }, 'REQUEST');
  await send({
    to: me.email,
    subject: `Confirmed: ${session.interviewType} mock with ${first(partner.name)}, ${formatSlot(session.startAt, timezone)}`,
    lines: [
      `Hi ${first(me.name)}, your Product Buddy session is confirmed.`,
      `Partner: ${partner.name}${partner.email ? ` (${partner.email})` : ""}`,
      `When: ${formatSlot(session.startAt, timezone, Math.round((Date.parse(session.endAt) - Date.parse(session.startAt)) / 60000))}`,
      `Interview: ${session.interviewType}`,
      `Your role: ${me.role}`,
      ...(session.topic ? [`Topic: ${session.topic}`] : []),
      ...(session.notes ? [`Notes: ${session.notes}`] : []),
      `Call link: ${session.meetingUrl}`,
      `The calendar invite is attached. If it doesn't show, use the Google Calendar button.`,
      session.kit?.[uid]
        ? `Your interviewer kit (the question you'll ask, follow-ups and a rubric) is on the session page. Keep it to yourself until the call.`
        : `${first(partner.name)} gets a question and rubric for you, so come ready to answer cold.`,
      `After the call, leave ${first(partner.name)} 3 quick lines of feedback on the session page.`,
      `Can't make it? Cancel on the site so ${first(partner.name)} isn't left waiting.`,
    ],
    button: { label: 'Join the call', url: session.meetingUrl },
    extraButtons: [
      { label: 'Add to Google Calendar', url: googleCalendarLink(event) },
      { label: 'Manage session', url: `${appUrl}/buddy?tab=sessions` },
    ],
    ics: { content: ics, method: 'REQUEST' },
  });
}

export async function emailSessionCancelled(session: BuddySession, to: { name: string; email: string; timezone: string }, cancelledByName: string, appUrl: string) {
  const event = sessionCalendarEvent(session, appUrl);
  const ics = buildIcs({ ...event, organizerEmail: ORGANIZER, attendees: Object.values(session.participants).filter((p) => p.email) }, 'CANCEL');
  await send({
    to: to.email,
    subject: `Cancelled: ${session.interviewType} mock, ${formatSlot(session.startAt, to.timezone)}`,
    lines: [
      `Hi ${first(to.name)},`,
      `${cancelledByName} cancelled your Product Buddy session on ${formatSlot(session.startAt, to.timezone)}.`,
      ...(session.cancelReason ? [`Reason: ${session.cancelReason}`] : []),
      `The attached file removes it from your calendar. Sorry about that. Find another buddy below.`,
    ],
    button: { label: 'Find another buddy', url: `${appUrl}/buddy` },
    ics: { content: ics, method: 'CANCEL' },
  });
}

export async function emailFeedbackReceived(session: BuddySession, to: { name: string; email: string }, fromName: string, alreadyGaveTheirs: boolean, appUrl: string) {
  await send({
    to: to.email,
    subject: `${first(fromName)} left you feedback on your ${session.interviewType} mock`,
    lines: [
      `Hi ${first(to.name)},`,
      alreadyGaveTheirs
        ? `${fromName} shared feedback on your mock interview. Read it on the session page.`
        : `${fromName} shared feedback on your mock interview. Leave yours for them (3 quick lines) and you'll both see what the other wrote.`,
    ],
    button: { label: alreadyGaveTheirs ? 'Read feedback' : 'Give feedback to read theirs', url: `${appUrl}/buddy?tab=sessions` },
  });
}
