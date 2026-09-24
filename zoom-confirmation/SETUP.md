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

After deployment, configure Zoom's Trial Lesson Confirmation Page to redirect
to the full website `/zoom-confirmation/` URL with booking parameters enabled.
Check that the host resolves `/zoom-confirmation` to the directory while preserving
the query. No Zoom account settings were changed by this implementation.
A real booking-to-payment flow still needs verification; no booking or payment
was submitted during development. Payment uses target=_top to leave an iframe.
