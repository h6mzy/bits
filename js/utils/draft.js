export function draft(data, { shallow = false } = {}) {
  if (!isPlainObject(data)) {
    throw new TypeError('draft() expects a plain object.');
  }

  const clone = shallow
    ? shallowClone
    : structuredClone;

  // State
  const original = clone(data);
  const value = clone(data);
  const empty = createEmpty(data);

  const listeners = new Set();

  // API
  const api = {
    original,
    value,
    get changed() {
      return hasChanges();
    },
    diff,
    reset,
    commit,
    clear,
    update,
    save,
    subscribe
  };

  return api;

  // Public
  function diff() {
    return diffObject(original, value);
  }

  function reset() {
    return apply(() => {
      replace(value, original, clone);
    });
  }

  function commit() {
    replace(original, value, clone);
    return api;
  }

  function clear() {
    return apply(() => {
      replace(value, empty, clone);
    });
  }

  function update(path, value) {
    return apply(() => {
      set(api.value, path, value);
    });
  }

  async function save(fn) {
    if (!hasChanges())
      return value;

    const changes = diff();

    const result = await fn(changes, value);

    commit();

    return result;
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  // Private
  function apply(fn) {
    fn();
    notify();
    return api;
  }

  function notify() {
    listeners.forEach(fn => fn(api));
  }

  function hasChanges() {
    return !equal(original, value);
  }
}

// Helpers
function shallowClone(value) {
  if (Array.isArray(value))
    return [...value];

  if (isPlainObject(value))
    return { ...value };

  return value;
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function get(obj, path) {
  return path
    .split('.')
    .reduce((o, key) => o?.[key], obj);
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

function replace(target, source, clone) {
  if (Array.isArray(target)) {
    target.length = 0;
    target.push(...clone(source));
    return;
  }

  Object.keys(target).forEach(key => delete target[key]);
  Object.assign(target, clone(source));
}

function equal(a, b) {
  if (Object.is(a, b))
    return true;

  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  )
    return false;

  // Arrays
  if (Array.isArray(a) || Array.isArray(b)) {
    if (
      !Array.isArray(a) ||
      !Array.isArray(b) ||
      a.length !== b.length
    )
      return false;

    return a.every((value, index) =>
      equal(value, b[index])
    );
  }

  // Plain objects
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = new Set([
      ...Object.keys(a),
      ...Object.keys(b)
    ]);

    return [...keys].every(key =>
      equal(a[key], b[key])
    );
  }

  return false;
}

function diffObject(original, value) {
  const diff = {};

  for (const key of new Set([
    ...Object.keys(original),
    ...Object.keys(value)
  ])) {
    const before = original[key];
    const after = value[key];

    if (equal(before, after))
      continue;

    if (
      before &&
      after &&
      isPlainObject(before) &&
      isPlainObject(after)
    ) {
      const child = diffObject(before, after);

      if (Object.keys(child).length)
        diff[key] = child;
    } else {
      diff[key] = after;
    }
  }

  return diff;
}

function createEmpty(obj) {
  if (Array.isArray(obj))
    return [];

  if (obj === null)
    return null;

  if (typeof obj !== 'object')
    return null;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      createEmpty(value)
    ])
  );
}
