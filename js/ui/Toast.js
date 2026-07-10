const defaultRootStyle = {
  position: 'fixed',
  left: '50%',
  bottom: '20px',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: '9999',
  pointerEvents: 'none'
};

const defaultToastStyle = {
  padding: '12px 16px',
  borderRadius: '8px',
  opacity: '0',
  transform: 'translateY(6px)',
  transition: 'opacity .2s ease, transform .2s ease',
  pointerEvents: 'auto'
};

const Toast = (() => {
  let root;

  function init(parent = document.body, { rootStyle = {} } = {}) {
    if (root) return;

    root = document.createElement('div');

    Object.assign(root.style, defaultRootStyle, rootStyle);

    parent.append(root);
  }

  function show(message, {
    duration = 2500,
    toastStyle = {}
  } = {}) {

    if (!root) init();

    const toast = document.createElement('div');

    toast.textContent = message;

    Object.assign(
      toast.style,
      defaultToastStyle,
      toastStyle
    );

    root.append(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';

      toast.addEventListener('transitionend', () => {
        toast.remove();
      }, { once: true });

    }, duration);
  }

  return {
    init,
    show
  };

})();

export default Toast;
