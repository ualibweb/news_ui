/*
 * The times returned by the API are the number of seconds since
 * the Unix epoch in Central Time (Unix Time minus 6 hours). The
 * constructor for JavaScript's Date object used here expects times to
 * be the number of milliseconds since the Unix epoch in UTC.
 */
function apiToJsTime(apiTime) {
  var jsTime;

  // Convert from Central Time to UTC.
  jsTime = apiTime + (6 * 60 * 60);

  // Convert from seconds to milliseconds.
  jsTime *= 1000;

  return jsTime;
}
