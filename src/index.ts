import queryString from "query-string";

const updateUri = () => {
  const time = getCurrentTime();
  if (time) {
    const uri = createUri(time);
    history.pushState({}, "", uri);
  }
};

const REFRESH_RATE_MS = 1000;

setInterval(updateUri, REFRESH_RATE_MS);

/**
 * Find the current video time
 */
const getCurrentTime = (): string | null => {
  const node = document.querySelector(
    `p[data-a-target="player-seekbar-current-time"]`
  );
  return node ? node.textContent : null;
};

/**
 * Convert the video time format into the format expected by the
 * in the twitch.tv uri query string (XXhXXmXXs)
 * @param time Parsed DOM video time
 */
const formatTime = (time: string): string | null => {
  const timeUnits = time.split(":");
  if (timeUnits.length !== 3) return null;
  /* If twitch.tv gives us 00:00:00, don't set that as the time */
  if (timeUnits.some((unit) => Number(unit) !== 0))
    return `${timeUnits[0]}h${timeUnits[1]}m${timeUnits[2]}s`;
  return null;
};

/**
 * Generate a new URI wth the latest video timestamp
 * @param time Raw video time string parsed from the twitch.tv
 * uri (XX:XX:XX)
 */
const createUri = (time: string): string => {
  const { href } = window.location;
  const parsed = queryString.parseUrl(href);
  const nextTime = formatTime(time);
  if (parsed.query.t && nextTime) parsed.query.t = time;
  return queryString.stringifyUrl(parsed, { encode: false });
};
