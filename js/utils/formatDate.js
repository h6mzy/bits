export function formatDate(value, opts = {}) {
  const {
    locale = 'en-US',
    day = 'numeric',
    month = 'short',
    year = 'numeric',
    hour,
    minute,
    hour12 = true
  } = opts;

  return new Intl.DateTimeFormat(locale, {
    day,
    month,
    year,
    hour,
    minute,
    hour12
  }).format(new Date(value));
}
