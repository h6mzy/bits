const Countdown = (() => {
  const pad = n => String(n).padStart(2, '0');

  const createUnit = (key, label) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'bits-time';

    const number = document.createElement('span');
    number.className = 'bits-num';
    number.dataset[key] = '';

    const unit = document.createElement('span');
    unit.className = 'bits-unit';
    unit.textContent = label;

    wrapper.append(number, unit);

    return wrapper;
  };

  const Countdown = target => {
    const root = document.createElement('div');
    root.className = 'bits-countdown';

    root.append(
      createUnit('days', 'DAY'),
      createUnit('hours', 'HRS'),
      createUnit('minutes', 'MIN'),
      createUnit('seconds', 'SEC')
    );

    let interval;
    let stopped = false;
    let targetTime;

    const els = {
      days: root.querySelector('[data-days]'),
      hours: root.querySelector('[data-hours]'),
      minutes: root.querySelector('[data-minutes]'),
      seconds: root.querySelector('[data-seconds]')
    };

    const set = (el, value, finished = false) => {
      if (!el) return;

      el.textContent = pad(value);
      el.parentElement.classList.toggle('finished', finished);
    };

    const update = (d, h, m, s) => {
      set(els.days, d, d === 0);
      set(els.hours, h, d + h === 0);
      set(els.minutes, m, d + h + m === 0);
      set(els.seconds, s);
    };

    const tick = () => {
      if (stopped) return;

      let diff = targetTime - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        update(0, 0, 0, 0);
        root.classList.add('ended');
        return;
      }

      const d = Math.floor(diff / 86400000);
      diff %= 86400000;

      const h = Math.floor(diff / 3600000);
      diff %= 3600000;

      const m = Math.floor(diff / 60000);
      diff %= 60000;

      const s = Math.floor(diff / 1000);

      update(d, h, m, s);
    };

    const start = newTarget => {
      targetTime =
        typeof newTarget === 'number'
          ? newTarget
          : new Date(newTarget).getTime();

      stopped = false;

      root.classList.remove('ended');

      clearInterval(interval);

      tick();
      interval = setInterval(tick, 1000);
    };

    root.stop = () => {
      stopped = true;
      clearInterval(interval);
    };

    root.restart = newTarget => {
      start(newTarget ?? target);
    };

    start(target);

    return root;
  };

  return Countdown;
})();

export default Countdown;
