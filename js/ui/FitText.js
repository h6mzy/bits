const FitText = (() => {
  function init(root = document, {
    min = 8,
    max = 256,
    observe = true
  } = {}) {
    const elements =
      typeof root === 'string'
        ? [...document.querySelectorAll(root)]
        : root instanceof Element || root instanceof Document
          ? [...root.querySelectorAll('.fit-text')]
          : [...root];

    const cleanups = [];

    for (const el of elements) {
      el.style.whiteSpace = 'nowrap';
      el.style.overflow = 'hidden';

      const resize = () => {
        let low = min;
        let high = max;

        while (low <= high) {
          const size = (low + high) >> 1;

          el.style.fontSize = `${size}px`;

          const fits =
            el.scrollWidth <= el.clientWidth &&
            el.scrollHeight <= el.clientHeight;

          if (fits)
            low = size + 1;
          else
            high = size - 1;
        }

        el.style.fontSize = `${high}px`;
      };

      resize();

      if (!observe) {
        cleanups.push(() => {});
        continue;
      }

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(el);

      const mutationObserver = new MutationObserver(resize);
      mutationObserver.observe(el, {
        childList: true,
        characterData: true,
        subtree: true
      });

      cleanups.push(() => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      });
    }

    return () => cleanups.forEach(fn => fn());
  }

  return {
    init
  };
})();

export default FitText;
