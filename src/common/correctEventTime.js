/*
 * Correct the given event time so that it will always be displayed in
 * Central Time by Angular's date filter. Returns the corrected date in
 * JavaScript time (the # of milliseconds since the Unix epoch).
 */
function correctEventTime(apiEventTime) {
  const CURRENT_LOCALE_OFFSET_MILLISECONDS = (new Date()).getTimezoneOffset() * 60 * 1000;
  const CENTRAL_TIME_OFFSET_MILLISECONDS = 6 * 60 * 60 * 1000;

  return apiToJsTime(apiEventTime) + CURRENT_LOCALE_OFFSET_MILLISECONDS - CENTRAL_TIME_OFFSET_MILLISECONDS;
}
