const defaultDialogStyle = {
  position: 'fixed',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--bits-dialog-backdrop, transparent)',
  opacity: '0',
  visibility: 'hidden',
  pointerEvents: 'none',
  transition: 'opacity .2s',
  zIndex: '9999'
}

const defaultBodyStyle = {
  padding: 'var(--bits-dialog-padding, 1rem)',
  width: '100%',
  maxWidth: '500px',
  height: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
  background: 'var(--bits-dialog-bg, white)'
}

const Dialog = (() => {
  let dialog;
  let body;

  function init(parent = document.body, { dialogStyle, bodyStyle } = {}) {
    dialog = document.createElement('dialog');
    dialog.className = 'dialog';
    body = document.createElement('div');

    Object.assign(dialog.style, defaultDialogStyle);
    Object.assign(body.style, defaultBodyStyle);

    Object.assign(dialog.style, dialogStyle);
    Object.assign(body.style, bodyStyle);

    dialog.append(body);
    parent.append(dialog);

    dialog.addEventListener('click', e => {
      if (e.target === dialog) close();
    });

    dialog.addEventListener('cancel', e => {
      e.preventDefault();
      close();
    });
  }

  function open(html, { onSubmit, onMount } = {}) {
    body.innerHTML = html;

    const form = body.querySelector('form');

    onMount?.(body);

    if (form && onSubmit) {
      form.onsubmit = async e => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        await onSubmit(data, body);

        close();
      };
    }

    dialog.showModal();
  }

  function close() {
    dialog.close();
  }

  return { init, open, close };
})();

export default Dialog;
