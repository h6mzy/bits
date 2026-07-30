import { Dialog } from '../index.js'

async function confirm({
  title = 'Confirm',
  message = '',
  confirmText = 'OK',
  cancelText = 'Cancel'
} = {}) {

  return new Promise(resolve => {

    Dialog.open(`
      <div class="bits-confirm">
        <h3>${title}</h3>
        <p>${message}</p>

        <footer>
          <button type="button" data-cancel>
            ${cancelText}
          </button>

          <button type="button" data-confirm>
            ${confirmText}
          </button>
        </footer>
      </div>
    `);

    const dialog = document.querySelector('.bits-dialog');

    dialog.querySelector('[data-cancel]').onclick = () => {
      Dialog.close();
      resolve(false);
    };

    dialog.querySelector('[data-confirm]').onclick = () => {
      Dialog.close();
      resolve(true);
    };
  });
}
