export function mount(
  container,
  {
    onMount,
    onSubmit,
    onClose
  } = {}
) {
  onMount?.(container);

  const form = container.querySelector('form');

  if (!form || !onSubmit)
    return;

  form.onsubmit = async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    await onSubmit(data, container);

    onClose?.();
  };
}
