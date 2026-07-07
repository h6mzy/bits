export function draft(data) {
  const original = structuredClone(data);
  const value = structuredClone(data);

  return {
    original,
    value,

    bind,
    diff,
    reset,
    commit,
    save,

    get changed() {
      return Object.keys(diff()).length > 0;
    }
  };

  function bind(form) {
    form = typeof form === 'string'
      ? document.querySelector(form)
      : form;

    if (!form) return;

    // Populate form
    form.querySelectorAll('[name]').forEach(input => {
      const val = get(value, input.name);

      switch (input.type) {
        case 'checkbox':
          input.checked = !!val;
          break;

        case 'file':
          break;

        default:
          input.value = val ?? '';
      }
    });

    // Update object
    form.addEventListener('input', e => {
      const input = e.target;

      if (!input.name) return;

      let val;

      switch (input.type) {
        case 'checkbox':
          val = input.checked;
          break;

        case 'number':
          val = input.valueAsNumber;
          break;

        case 'file':
          val = input.files[0] ?? null;
          break;

        default:
          val = input.value;
      }

      set(value, input.name, val);
    });
  }

  function diff() {
    return diffObject(original, value);
  }

  function reset() {
    replace(value, original);
  }

  function commit() {
    replace(original, value);
  }

  async function save(fn) {
    const changes = diff();
  
    if (!Object.keys(changes).length)
      return;
  
    const result = await fn(changes, value);
  
    commit();
  
    return result;
  }
}

/* ---------- helpers ---------- */

function get(obj, path) {
  return path.split('.').reduce((o, key) => o?.[key], obj);
}

function set(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();

  const target = keys.reduce((o, key) => {
    o[key] ??= {};
    return o[key];
  }, obj);

  target[last] = value;
}

function replace(target, source) {
  Object.keys(target).forEach(key => delete target[key]);
  Object.assign(target, structuredClone(source));
}

function diffObject(a, b) {
  const out = {};

  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const av = a[key];
    const bv = b[key];

    if (JSON.stringify(av) === JSON.stringify(bv))
      continue;

    if (
      av &&
      bv &&
      typeof av === 'object' &&
      typeof bv === 'object' &&
      !Array.isArray(av)
    ) {
      const child = diffObject(av, bv);

      if (Object.keys(child).length)
        out[key] = child;
    } else {
      out[key] = bv;
    }
  }

  return out;
}
