function mount(container, onMount, onSubmit, close) {
  onMount?.(container);

  const form = container.querySelector('form');

  if (!form || !onSubmit)
    return;

  form.onsubmit = async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    await onSubmit(data, container);

    close();
  };
}
