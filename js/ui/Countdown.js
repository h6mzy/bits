const Countdown = (() => {
  const pad = n => String(n).padStart(2, '0');

  function mount(selector, target) {
    const root = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;

    if (!root) return;

    const els = {
      days: root.querySelector('[data-days]'),
      hours: root.querySelector('[data-hours]'),
      minutes: root.querySelector('[data-minutes]'),
      seconds: root.querySelector('[data-seconds]'),
    };

    const targetTime =
      typeof target === 'number'
        ? target
        : new Date(target).getTime();

    let id;
    let stopped = false;

    const set = (el, value, fin = false) => {
      if (!el) return;

      el.textContent = pad(value);
      el.parentElement.classList.toggle("finished", fin);
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
        clearInterval(id);
        update(0, 0, 0, 0);
        root.classList.add('ended');
        return;
      }

      const d = Math.floor(diff / 86400000); diff %= 86400000;
      const h = Math.floor(diff / 3600000);  diff %= 3600000;
      const m = Math.floor(diff / 60000);    diff %= 60000;
      const s = Math.floor(diff / 1000);

      update(d, h, m, s);
    };

    id = setInterval(tick, 1000);
    tick();

    return {
      stop() {
        stopped = true;
        clearInterval(id);
      },

      restart(newTarget) {
        clearInterval(id);
        return mount(root, newTarget ?? targetTime);
      }
    };
  }

  return { mount };
})();

export default Countdown;
