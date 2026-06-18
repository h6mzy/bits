const Toast = (() => {
  let root;

  function init(selector = '#toastRoot') {
    root = document.querySelector(selector);

    if (!root) {
      root = document.createElement('div');
      root.id = selector.replace('#', '');
      root.className = 'toast-root';
      document.body.appendChild(root);
    }
  }

  function ensureRoot() {
    if (!root) init();
  }

  function show(message, opts = {}) {
    ensureRoot();

    const {
      type = 'default',
      duration = 2500
    } = opts;

    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;

    root.appendChild(el);

    requestAnimationFrame(() => {
      el.classList.add('show');
    });

    const hide = () => {
      el.classList.remove('show');
      el.addEventListener('transitionend', () => {
        el.remove();
      }, { once: true });
    };

    setTimeout(hide, duration);
  }

  return { init, show };
})();

export default Toast;
