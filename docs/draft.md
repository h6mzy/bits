# Draft

Tiny object editing for JavaScript.

## Features

- Edit a cloned object
- Track changes
- Generate nested diffs
- Reset or commit changes
- Save only modified fields
- Zero dependencies

---

## Installation

```js
import { draft } from './draft.js';
```

---

## Quick Start

```js
const player = draft({
  name: 'John',
  age: 20
});

player.value.name = 'James';

console.log(player.changed);
// true

console.log(player.diff());
// { name: 'James' }

player.reset();
```

---

## API

### `draft(data)`

Creates a new draft.

### `draft.value`

Editable object.

### `draft.original`

Original object.

### `draft.changed`

Returns whether any value has changed.

### `draft.diff()`

Returns only changed values.

### `draft.reset()`

Restores the original values.

### `draft.commit()`

Accepts current values as the new original.

### `draft.clear()`

Clears all values while preserving object structure.

### `draft.update()`

Update values.

### `draft.save(fn)`

Runs `fn(changes, value)` and commits on success.

```js
await player.save(async changes => {
  await api.patch(changes);
});
```

### `draft.subscribe(fn)`

Subscribes to draft updates.

```js
const unsubscribe = player.subscribe(d => {
  console.log(d.changed);
});

unsubscribe();
```

---

## Notes

- Root value must be a plain object.
- Nested objects are supported.
- Nested arrays are supported.
- Uses `structuredClone()`.

---

## Examples

- `examples/draft-basic.html`
- `examples/draft-save.html`
