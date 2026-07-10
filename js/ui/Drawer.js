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

    drawer.addEventListener('click', e => {
      if (e.target === drawer) close();
    });

    parent.append(drawer);

    return drawer;
  }

  function open(content, {
    side = 'right',
    onMount
  } = {}) {
    if (!drawer) init();

    currentSide = side;

    const layout = layouts[currentSide];

    drawer.replaceChildren();

    Object.assign(drawer.style, {
      justifyContent: layout.justifyContent,
      alignItems: layout.alignItems
    });

    panel = document.createElement('div');

    Object.assign(panel.style, {
      width: layout.width,
      height: layout.height,
      maxWidth: '100%',
      maxHeight: '100%',
      background: 'var(--bits-drawer-bg, white)',
      overflow: 'auto',
      padding: 'var(--bits-drawer-padding, 1rem)',
      transform: layout.transform,
      transition: 'transform .2s'
    });

    if (typeof content === 'string') {
      panel.innerHTML = content;
    } else {
      panel.append(content);
    }

    drawer.append(panel);

    requestAnimationFrame(() => {
      drawer.style.opacity = '1';
      drawer.style.visibility = 'visible';
      drawer.style.pointerEvents = 'auto';
      panel.style.transform = 'translate(0, 0)';
    });

    onMount?.(panel);

    return panel;
  }

  function close() {
    if (!panel) return;

    panel.addEventListener('transitionend', () => {
      drawer.style.visibility = 'hidden';
    }, { once: true });

    panel.style.transform = layouts[currentSide].transform;

    drawer.style.opacity = '0';
    drawer.style.pointerEvents = 'none';
  }

  return {
    init,
    open,
    close
  };
})();

export default Drawer;
