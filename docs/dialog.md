# Dialog

A tiny wrapper around the native `<dialog>` element.

**[Open in CodePen →](YOUR-CODEPEN-URL)**

## Use

```js
import { Dialog } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits/js/index.js';

Dialog.init();

Dialog.open('Hello!');
```

## With an element

```js
const message = document.createElement('p');
message.textContent = 'Hello!';

Dialog.open(message);
```

## Close

```js
Dialog.close();
```

## Styling

Bits handles the behaviour. You handle the appearance.

```css
.bits-dialog {
  padding: 2rem;
  border: 0;
  border-radius: 1rem;
}

.bits-dialog::backdrop {
  background: rgb(0 0 0 / .5);
}
```

## API

```text
Dialog.init()
Dialog.open(content)
Dialog.close()
```

That's it.
