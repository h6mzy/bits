import { render } from '../index.js';

const Dialog = (() => {
  let dialog;

  function init({ parent = document.body } = {}) {
    dialog = document.createElement('dialog');
    dialog.className = 'bits-dialog';

    parent.append(dialog);

    dialog.addEventListener('click', e => {
      if (e.target === dialog) close();
    });

    dialog.addEventListener('cancel', e => {
      e.preventDefault();
      close();
    });
  }

  function open(content) {
    if (!dialog) init();

    render(dialog, content);
    dialog.showModal();
  }

  function close() {
    dialog?.close();
  }

  return { init, open, close };
})();

export default Dialog;
