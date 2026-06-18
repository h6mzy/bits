const Dialog = (() => {
  let el, content;

  function init(selector = '#dialog') {
    el = document.querySelector(selector);

    if (!el) throw new Error('Dialog element not found');

    content = el.querySelector('.dialog-content');

    if (!content) {
      content = document.createElement('div');
      content.className = 'dialog-body';
      el.appendChild(content);
    }

    el.addEventListener('click', e => {
      if (e.target === el) close();
    });

    el.addEventListener('cancel', e => {
      e.preventDefault();
      close();
    });
  }

  function open(html, { onSubmit, onMount } = {}) {
    content.innerHTML = html;

    const form = content.querySelector('form');

    onMount?.(content);

    if (form && onSubmit) {
      form.onsubmit = async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        await onSubmit(data, content);
        close();
      };
    }

    el.showModal();
  }

  function close() {
    el.close();
  }

  return { init, open, close };
})();

export default Dialog;
