export function pickRandom(arr, count = 1) {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

export function chunk(arr, size = 11) {
  const out = [];

  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }

  return out;
}

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

export function startCountdown(target, { onTick, onEnd } = {}) {
  const end =
    typeof target === 'number'
      ? target
      : new Date(target).getTime();

  let id;

  const tick = () => {
    let diff = end - Date.now();

    if (diff <= 0) {
      clearInterval(id);

      onTick?.({
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });

      onEnd?.();
      return;
    }

    const total = diff;

    const days = Math.floor(diff / 86400000);
    diff %= 86400000;

    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;

    const minutes = Math.floor(diff / 60000);
    diff %= 60000;

    const seconds = Math.floor(diff / 1000);

    onTick?.({
      total,
      days,
      hours,
      minutes,
      seconds
    });
  };

  tick();

  id = setInterval(tick, 1000);

  return () => clearInterval(id);
}

export function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
