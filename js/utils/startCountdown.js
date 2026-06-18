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
