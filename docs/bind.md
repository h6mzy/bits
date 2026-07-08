# bind()

Tiny two-way form binding for plain JavaScript.

## Features

-   Two-way binding between a form and a draft store
-   Supports nested paths (`user.name`)
-   Works with standard HTML forms
-   No dependencies

## Installation

``` js
import { bind } from './bind.js';
```

## Requirements

The `draft` object is expected to expose:

``` js
draft.value        // current object
draft.update(path, value)
draft.subscribe(callback)
```

## Usage

``` html
<form id="profile">
  <input name="name">
  <input name="age" type="number">

  <label>
    <input type="checkbox" name="active">
    Active
  </label>

  <button>Save</button>
</form>
```

``` js
const unbind = bind('#profile', draft);

// Later
unbind();
```

Whenever the user edits the form, `draft.update()` is called. Whenever
the draft changes, the form is automatically updated.

## Supported Controls

  Control                                   Value
  ----------------------------------------- ------------------
  text, email, password, search, url, tel   string
  textarea                                  string
  number                                    number or `null`
  checkbox                                  boolean
  checkbox group                            array
  radio                                     string
  select                                    string
  select multiple                           array
  file                                      File or `null`
  multiple file                             File\[\]

## Nested Properties

Input names can reference nested properties.

``` html
<input name="club.name">
<input name="club.manager.name">
```

## Cleanup

`bind()` returns a cleanup function.

``` js
const unbind = bind(form, draft);

// ...

unbind();
```

## License

MIT
