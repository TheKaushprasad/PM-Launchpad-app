# Product Buddy (peer mock interviews)

Find another PM candidate for a mock interview. Local-only for now: on in `npm run dev`, hidden on the
live site (the page, the sidebar link and the API all stay off).

## How it works

1. **Profile once** (`/buddy` → Profile): role, experience, interview types, domains, whether you want to be
   interviewed, interview others or both, and weekly free times in your timezone.
2. **Find a buddy**: pick a format (swap turns, interview me, I interview them), interview type, date, time and
   length. Only people who are open to that role, free in their weekly times and not already booked are shown,
   with the reasons they match. No "95% match" scores.
3. **Ask up to 3 people at once.** One request, one time slot. The first to accept gets the session; the others
   are emailed that it's filled, and a late accept shows "already taken". Requests close after 24 hours or 2 hours
   before the session, whichever is first.
4. **Confirmed**: both people get an email with a free Jitsi call link, an `.ics` calendar invite (Gmail and
   Outlook show Yes / No / Maybe), and an "Add to Google Calendar" button. No Google sign-in or app review needed.
   Either person can swap in their own Meet/Zoom link, or cancel (the other person gets a cancel file that removes
   the event).
5. **After the call**: "Did it happen?" records a done or a no-show.

Also: decline with a note ("Sat 11 am works"), withdraw a sent request, block someone, and a 10 requests/day cap.

## Where things live

- `server/productBuddy/routes.ts`: all API routes and rules. Firestore is server-only (Admin SDK):
  `buddy_profiles`, `buddy_requests`, `buddy_sessions`. No Firestore rules change is needed (default deny).
- Booking runs in a Firestore transaction that also writes both people's profiles, so two accepts can't
  double-book anyone.
- `server/productBuddy/emails.ts`: emails through Resend. Skipped (logged) when `RESEND_API_KEY` is missing.
- `lib/productBuddy/`: shared types, calendar (`.ics` + Google Calendar link) and timezone helpers.
- `components/productBuddy/`: the `/buddy` page.

## Testing on your own

Needs `FIREBASE_SERVICE_ACCOUNT_KEY` in your local `.env` (same as other server features); emails also need
`RESEND_API_KEY`. In `npm run dev`, Find a buddy shows **Add sample buddies** (three test profiles, free every day
7 am–11 pm IST). Send them a request, then on Requests use **Simulate a sample buddy accepting** to see the
confirmed session. Both buttons only work locally. Sample profiles are written to the real (named) Firestore
database, so delete the `sample_*` docs in `buddy_profiles` when done.

## Launching

Set `VITE_PRODUCT_BUDDY_ENABLED=true` in Vercel (Production and Preview) and redeploy. Before launch: decide on
WhatsApp (not built; email only for now), and seed enough profiles that searches aren't empty.
