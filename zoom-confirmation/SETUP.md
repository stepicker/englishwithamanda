# Zoom trial confirmation

Page: `/zoom-confirmation/`. The scheduler lives on `booking.html`.
PayPal checkout is configured in index.html. This static page does not verify
payment completion or change the Reserved / Awaiting Payment status.

## Redirect fields

Mapping follows the sample Zoom redirect supplied by the site owner:

- `start`: ISO 8601 timestamp with Z or an explicit UTC offset.
- `timeZone`: IANA zone selected for the booking, such as Europe/Berlin.
- `bookerDisplayName`: student's full name, rendered as plain text.

All other fields are ignored, including `end` (equal to `start` in the supplied
sample), email, IDs, summary and assignedTo. Display only the start time; do not
infer an end time. The date, time and GMT offset use the supplied timeZone, with
seasonal daylight-saving rules for the lesson date. The visitor's device zone
never overrides the booking zone. Missing/invalid date or zone retains the email
fallback; absent names leave the name row hidden. The two fields render independently.
The heading remains Reserved, since a scheduled lesson is not proof of payment.

Synthetic preview, not a real reservation:
`/zoom-confirmation/?start=2026-09-25T13%3A00%3A00.000Z&timeZone=Europe%2FBerlin&bookerDisplayName=Example%20Student`

No query values are rendered as HTML or control the payment URL. The page uses
noindex and no-referrer. No personal data is stored by this page's JavaScript.

## Embedded booking callback

Keep Zoom's own confirmation page selected; disable its external redirect.
`booking-scheduler.js` adds the exact embedding page origin to the iframe URL
and listens for Zoom's `bookingForm` message. It verifies both origin and iframe
window, accepts the bookingForm object payload (IDs are optional), and
navigates the Booking page to our fixed same-origin confirmation URL once.
Only optional start, timeZone and bookerDisplayName strings are forwarded.
Missing date/time fields retain the email fallback. The callback's fields may
differ from external-redirect fields; no appointment time is inferred.

Verified locally with simulated events: trusted success, wrong origin/window,
malformed messages, legacy callbacks without IDs, duplicate callbacks and optional field filtering.
An actual Zoom booking still needs to confirm this account's callback payload;
no booking or payment was submitted during development. Callbacks without event/attendee IDs are accepted. Missing or non-object payloads
are ignored. For debugging, open `booking.html?schedulerDebug=1` and inspect the
browser console for `[Zoom Scheduler]` entries: readiness, message type and payload
field names only. No personal values are logged. Test through HTTP(S), not file://.

Sources:
- https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0083594
- https://devforum.zoom.us/t/embedded-zoom-scheduler-unable-to-retrieve-booking-details-or-host-user-id-after-booking/140526
