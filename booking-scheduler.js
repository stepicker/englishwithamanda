/* Zoom Scheduler's supported postMessage booking callback. */
(function () {
  'use strict';
  const frame = document.querySelector('.booking-page__scheduler');
  if (!frame) return;
  const zoomOrigin = 'https://scheduler.zoom.us';
  let redirected = false;
  const debug = new URLSearchParams(window.location.search).has('schedulerDebug');
  const report = (message, details) => {
    if (debug) console.info('[Zoom Scheduler]', message, details ? JSON.stringify(details) : '');
  };
  if (!['http:', 'https:'].includes(window.location.protocol)) {
    frame.src = frame.dataset.src;
    console.warn('[Zoom Scheduler] Open this page through an HTTP(S) server. A file:// page cannot supply a valid callback origin.');
    return;
  }
  const nonemptyString = value => typeof value === 'string' && value.trim().length > 0;

  window.addEventListener('message', function (event) {
    if (redirected || event.origin !== zoomOrigin || event.source !== frame.contentWindow) return;
    const data = event.data;
    // Diagnostic output contains field names only, never booking values.
    report('Message from scheduler iframe', {
      type: typeof data?.type === 'string' ? data.type : typeof data,
      payloadKeys: data?.payload && typeof data.payload === 'object' ? Object.keys(data.payload) : []
    });
    if (!data || data.type !== 'bookingForm') return;
    // Zoom emits bookingForm after booking; event/attendee IDs are optional
    // in its legacy callback and must not gate the redirect.
    const payload = data.payload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return;
    const destination = new URL('zoom-confirmation/', window.location.href);
    destination.search = '';
    destination.hash = '';
    // These optional fields match our confirmation page. Do not forward emails,
    // IDs, arbitrary callback fields, or a destination supplied by the sender.
    for (const key of ['start', 'timeZone', 'bookerDisplayName']) {
      if (nonemptyString(payload[key]) && payload[key].length <= 300) {
        destination.searchParams.set(key, payload[key].trim());
      }
    }
    report('Booking callback accepted; opening confirmation');
    redirected = true;
    window.location.assign(destination.href);
  });

  // Exact parent origin, including a local preview port when applicable.
  // Register the listener before loading the callback-enabled scheduler.
  const src = new URL(frame.dataset.src);
  report('Listener ready', { origin: window.location.origin });
  if (src.origin !== zoomOrigin) return;
  src.searchParams.set('origin', window.location.origin);
  frame.src = src.href;
}());
