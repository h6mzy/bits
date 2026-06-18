# bits

Tiny, reusable JavaScript utilities and UI primitives for the web.

No build step. No dependencies. Just import what you need.

------------------------------------------------------------------------

## Install / Usage

Use via CDN (recommended):

https://cdn.jsdelivr.net/gh/h6mzy/bits@v1.0.0/js/utils.js

------------------------------------------------------------------------

## Import Examples

### Single utility

import escapeHTML from
'https://cdn.jsdelivr.net/gh/h6mzy/bits@v1.0.0/js/escapeHTML.js';

------------------------------------------------------------------------

### Multiple utilities

import { formatDate, chunk, pickRandom } from
'https://cdn.jsdelivr.net/gh/h6mzy/bits@v1.0.0/js/utils.js';

------------------------------------------------------------------------

## Bits

### UI

-   Dialog
-   Toast

### Utils

-   escapeHTML
-   formatDate
-   chunk
-   pickRandom
-   startCountdown

------------------------------------------------------------------------

## Philosophy

-   Small and focused
-   Framework-agnostic
-   No dependencies
-   Copy-paste friendly
-   Works directly in the browser

------------------------------------------------------------------------

## Versioning

This project uses semantic versioning.

Always prefer tagged versions:

@v1.0.0

Avoid using @main in production.

------------------------------------------------------------------------

## Structure

js/ ├─ dialog.js ├─ toast.js ├─ escapeHTML.js ├─ formatDate.js ├─
chunk.js ├─ pickRandom.js ├─ startCountdown.js └─ utils.js

------------------------------------------------------------------------

## License

MIT
