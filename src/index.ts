import queryString from "query-string";

const updateUri = () => {
  const time = getCurrentTime();
  console.log(time);
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
const formatTime = (time: string): string => {
  const timeUnits = time.split(":");
  if (timeUnits.length !== 3) return "";
  return `${timeUnits[0]}h${timeUnits[1]}m${timeUnits[2]}s`;
};

/**
 * Generate a new URI wth the latest video timestamp
 * @param time Raw video time string parsed from the twitch.tv
 * uri (XX:XX:XX)
 */
const createUri = (time: string): string => {
  const { href } = window.location;
  const parsed = queryString.parseUrl(href);
  if (parsed.query.t) parsed.query.t = formatTime(time);
  return queryString.stringifyUrl(parsed, { encode: false });
};
