/* Display the fields supplied in Zoom Scheduler confirmation redirects. */
(function () {
  'use strict';
  function readLesson(search) {
    const params = new URLSearchParams(search);
    const startValue = params.get('start');
    const zone = params.get('timeZone');
    const timestamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
    if (!timestamp.test(startValue || '') || !zone) return null;
    const start = new Date(startValue);
    if (!Number.isFinite(start.getTime())) return null;
    try {
      const date = new Intl.DateTimeFormat('en-GB', {
        timeZone: zone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });
      const time = new Intl.DateTimeFormat('en-GB', {
        timeZone: zone, hour: 'numeric', minute: '2-digit', hour12: true
      });
      return {
        when: date.format(start) + ', ' + time.format(start),
        timezone: zone + ' · ' + new Intl.DateTimeFormat('en-GB', {
          timeZone: zone, timeZoneName: 'longOffset'
        }).formatToParts(start).find(part => part.type === 'timeZoneName').value
      };
    } catch (_) { return null; }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { readLesson };
  if (typeof document === 'undefined') return;
  const studentName = (new URLSearchParams(window.location.search).get('bookerDisplayName') || '').trim();
  if (studentName) {
    document.getElementById('lesson-student').textContent = studentName;
    document.getElementById('lesson-student-row').hidden = false;
  }
  const lesson = readLesson(window.location.search);
  if (!lesson) return;
  document.getElementById('lesson-time').textContent = lesson.when;
  document.getElementById('lesson-timezone').textContent = lesson.timezone;
  document.getElementById('lesson-timezone-row').hidden = false;
}());
