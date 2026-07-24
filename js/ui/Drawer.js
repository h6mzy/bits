import { mount, render } from '../index.js';

const layouts = {
  right: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    width: 'clamp(300px, 40%, 500px)',
    height: '100%',
    transform: 'translateX(100%)'
  },

  left: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: 'clamp(300px, 40%, 500px)',
    height: '100%',
    transform: 'translateX(-100%)'
  },

  top: {
    justifyContent: 'stretch',
    alignItems: 'flex-start',
    width: '100%',
    height: 'clamp(300px, 40%, 500px)',
    transform: 'translateY(-100%)'
  },

  bottom: {
    justifyContent: 'stretch',
    alignItems: 'flex-end',
    width: '100%',
    height: 'clamp(300px, 40%, 500px)',
    transform: 'translateY(100%)'
  }
};

const Drawer = (() => {
  let drawer;
  let panel;
  let currentSide = 'right';
  let isOpen = false;

  function init({
    parent = document.body,
    position = 'fixed'
  } = {}) {

    if (drawer) return drawer;

    drawer = document.createElement('aside');
    drawer.className = 'bits-drawer';

    Object.assign(drawer.style, {
      position,
      inset: '0',
      display: 'flex',
      background: 'var(--bits-drawer-backdrop, transparent)',
      opacity: '0',
      visibility: 'hidden',
      pointerEvents: 'none',
      transition: 'opacity .2s',
      zIndex: '9999'
    });

    panel = document.createElement('div');

    Object.assign(panel.style, {
      maxWidth: '100%',
      maxHeight: '100%',
      background: 'var(--bits-drawer-bg, white)',
      overflow: 'auto',
      padding: 'var(--bits-drawer-padding, 1rem)',
      transition: 'transform .2s'
    });

    drawer.append(panel);

    drawer.addEventListener('click', e => {
      if (e.target === drawer)
        close();
    });

    parent.append(drawer);

    return drawer;
  }

  function open(content, {
    side = 'right',
    ...options
  } = {}) {

    if (!drawer)
      init();

    currentSide = side;

    const layout = layouts[currentSide];

    Object.assign(drawer.style, {
      justifyContent: layout.justifyContent,
      alignItems: layout.alignItems,
      opacity: '1',
      visibility: 'visible',
      pointerEvents: 'auto'
    });

    Object.assign(panel.style, {
      width: layout.width,
      height: layout.height,
      transform: isOpen
        ? 'translate(0, 0)'
        : layout.transform
    });

    render(panel, content);

    mount(panel, {
      ...options,
      onClose: close
    });

    if (!isOpen) {
      requestAnimationFrame(() => {
        panel.style.transform = 'translate(0, 0)';
      });

      isOpen = true;
    }

    return panel;
  }

  function close() {
    if (!isOpen)
      return;

    panel.addEventListener('transitionend', () => {
      drawer.style.visibility = 'hidden';
      drawer.style.pointerEvents = 'none';
      isOpen = false;
    }, { once: true });

    drawer.style.opacity = '0';
    panel.style.transform = layouts[currentSide].transform;
  }

  return {
    init,
    open,
    close
  };
})();

export default Drawer;
