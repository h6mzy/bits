import { Dialog } from '../index.js'

export async function Confirm(options) {
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
