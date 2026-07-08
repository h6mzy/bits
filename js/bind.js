export function bind(form, draft) {
  form = typeof form === 'string'
    ? document.querySelector(form)
    : form;

  if (!form)
    throw new Error('Form not found.');

  const inputs = [...form.querySelectorAll('[name]')];

  inputs.forEach(load);

  form.addEventListener('input', update);
  form.addEventListener('change', update);

  const unsubscribe = draft.subscribe(() => {
    inputs.forEach(load);
  });

  return () => {
    form.removeEventListener('input', update);
    form.removeEventListener('change', update);
    unsubscribe();
  };

  function load(input) {
    const value = get(draft.value, input.name);

    switch (input.type) {

      case 'checkbox':
        input.checked = Array.isArray(value)
          ? value.includes(input.value)
          : !!value;
        break;

      case 'radio':
        input.checked = input.value === value;
        break;

      case 'file':
        // Browsers don't allow setting file inputs.
        break;

      case 'select-multiple':
        [...input.options].forEach(option => {
          option.selected = (value ?? []).includes(option.value);
        });
        break;

      default:
        input.value = value ?? '';
    }
  }

  function update(e) {
    const input = e.target;

    if (!input.name)
      return;

    const current = get(draft.value, input.name);

    let value;

    switch (input.type) {

      case 'number':
        value = input.value === ''
          ? null
          : input.valueAsNumber;
        break;

      case 'checkbox':
        if (Array.isArray(current)) {
          value = [...current];

          if (input.checked && !value.includes(input.value))
            value.push(input.value);

          if (!input.checked)
            value = value.filter(v => v !== input.value);
        } else {
          value = input.checked;
        }
        break;

      case 'radio':
        if (!input.checked)
          return;

        value = input.value;
        break;

      case 'file':
        value = input.multiple
          ? [...input.files]
          : input.files[0] ?? null;
        break;

      case 'select-multiple':
        value = [...input.selectedOptions].map(option => option.value);
        break;

      default:
        value = input.value;
    }

    draft.update(input.name, value);
  }
}

function get(obj, path) {
  return path
    .split('.')
    .reduce((o, key) => o?.[key], obj);
}
