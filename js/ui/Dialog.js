import { injectCSS, mount, render } from '../index.js';

const defaultDialogStyle = {
  border: 'none',
  padding: '0',
  margin: 'auto',
  background: 'transparent',
  overflow: 'visible'
};

const defaultBodyStyle = {
  padding: 'var(--bits-dialog-padding, 1rem)',
  background: 'var(--bits-dialog-bg, white)',
  width: '100%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const Dialog = (() => {
  let dialog;
  let body;
  let removeBackdropCSS;

  function init({
    parent = document.body,
    dialogStyle,
    bodyStyle,
    backdropStyle
  } = {}) {

    dialog = document.createElement('dialog');
    dialog.className = 'dialog';
    body = document.createElement('div');

    const id = crypto.randomUUID();

    dialog.dataset.bits = id;

    Object.assign(dialog.style, defaultDialogStyle, dialogStyle);
    Object.assign(body.style, defaultBodyStyle, bodyStyle);

    removeBackdropCSS?.();

    removeBackdropCSS = injectCSS(
      `dialog[data-bits="${id}"]::backdrop`,
      backdropStyle
    );

    dialog.append(body);
    parent.append(dialog);

    dialog.addEventListener('click', e => {
      const rect = body.getBoundingClientRect();

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) close();
    });

    dialog.addEventListener('cancel', e => {
      e.preventDefault();
      close();
    });
  }

  function open(content, options = {}) {
    render(body, content);
  
    mount(body, {
      ...options,
      onClose: close
    });
  
    dialog.showModal();
  }

  function close() {
    dialog.close();
  }

  return { init, open, close };
})();

export default Dialog;
