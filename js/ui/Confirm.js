import { Dialog } from '../index.js'

async function Confirm(options) {
  return new Promise(resolve => {

    Dialog.open(template(options), {
      onMount(body) {

        body.querySelector('[data-cancel]').onclick = () => {
          Dialog.close();
          resolve(false);
        };

        body.querySelector('[data-confirm]').onclick = () => {
          Dialog.close();
          resolve(true);
        };
      }
    });

  });
}

function template({
  title = 'Confirm',
  message = '',
  confirmText = 'OK',
  cancelText = 'Cancel'
} = {}) {
  return `
    <div class="bits-confirm">
      <h3>${title}</h3>

      <p>${message}</p>

      <footer>
        <button
          type="button"
          data-cancel>
          ${cancelText}
        </button>

        <button
          type="button"
          data-confirm>
          ${confirmText}
        </button>
      </footer>
    </div>
  `;
}

export default Confirm
