import queryString from "query-string";
import ElapsedTime from "./types/ElapsedTime";

const REFRESH_RATE_MS = 1000;
let previousTime: ElapsedTime | null = null;

/**
 * Retrieve the elapsed video time and set it as the
 * current address bar string
 */
const updateAddressBar = () => {
  const time = getElapsedTime();
  if (!time) return;

  if (!previousTime || !isEqual(previousTime, time)) {
    history.pushState({}, "", createUri(time));
    previousTime = time;
  }
};

setInterval(updateAddressBar, REFRESH_RATE_MS);

/**
 * Find the current video time
 */
const getElapsedTime = (): ElapsedTime | null => {
  const node = document.querySelector(
    `p[data-a-target="player-seekbar-current-time"]`
  );
  if (!node || !node.textContent) return null;
  return parseDuration(node.textContent);
};

/**
 * Generate a new URI wth the latest video timestamp
 * @param time Raw video time string parsed from the twitch.tv
 * uri (XX:XX:XX)
 */
const createUri = (duration: ElapsedTime): string => {
  const parsedUrl = queryString.parseUrl(window.location.href);
  parsedUrl.query.t = toString(duration);
  return queryString.stringifyUrl(parsedUrl, { encode: false });
};

/**
 * Parse the twitch DOM timestamp into structured data
 * @param time Twitch timestamp in the form XX:XX:XX
 */
const parseDuration = (duration: string): ElapsedTime | null => {
  const elements = duration.split(":");

  if (elements.length !== 3) return null;

  const parsed = {
    hours: Number(elements[0]),
    minutes: Number(elements[1]),
    seconds: Number(elements[2]),
  };
  return isValid(parsed) ? parsed : null;
};

/**
 * Format a duration into th one expected by a twitch.tv
 * query string
 * @param duration
 */
export const toString = (duration: ElapsedTime): string =>
  `${duration.hours}h${duration.minutes}m${duration.seconds}s`;

/**
 * Determine if two duration elements are equal
 * @param a Comparison element
 * @param b Comparison element
 */

export const isEqual = (a: ElapsedTime, b: ElapsedTime) =>
  a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds;

/**
 * Determine if the duration elements constitute a valid elapsed time
 * @param t Current time
 */
export const isValid = (t: ElapsedTime) => t.hours || t.minutes || t.seconds;
