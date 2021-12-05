# Tagin

Simple tag input for Bootstrap. Supports bootstrap v4 and v5.

Demo: [https://tagin.netlify.app/](https://tagin.netlify.app/)

## Features

- Custom separators
- Enable/disable duplicates
- Custom transform
- Supports Bootstrap validation style
- Fast
- Small
- No dependencies


## Installation

Install tagin with npm:
```bash
npm install tagin
```

Install from cdn:
```html
<link rel="stylesheet" href="https://unpkg.com/tagin/dist/css/tagin.min.css">
<script src="https://unpkg.com/tagin/dist/js/tagin.min.js" type="module"></script>
```

## Usage/Examples

Place `css` between `<head></head>` tags:
```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/tagin/dist/css/tagin.min.css">
</head>
```

Place `js` before `</body>` tag:
```html
<body>
    ...
    <script src="https://unpkg.com/tagin/dist/js/tagin.min.js" type="module"></script>
</body>
```
In your script file, import Tagin (Change location according to your path):
```js
import Tagin from "./tagin.js";
```

#### 1. Basic Usage (No `data-options` attribute needed):
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue">
```
```js
var options = {
    separator: ',', // default: ','
    duplicate: false, // default: false
    enter: true, // default: false
    transform: input => input.toUpperCase(), // default: input => input
    placeholder: 'Add a group...' // default: ''
};
tagin = new Tagin(document.querySelector(".tagin"), options);

tagin.addTag(true, "yellow"); // Add tag "yellow"
tagin.getTags(); // Return tags as array ["red", "green", "blue", "yellow"]
```

#### 2. Using Placeholder
Using `data-placeholder` attribute:
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue" data-placeholder="Add a color... (then press comma)">
```
Or using module option:
```js
tagin = new Tagin(document.querySelector(".tagin"), {placeholder: "Add a color... (then press comma)"});
```

#### 3. Using Custom Separator
Example tags with 'space' separator.
Using `data-separator` attribute:
```html
<input type="text" name="tags" class="form-control tagin" data-separator=" " value="red green blue">
```
Or using module option:
```js
tagin = new Tagin(document.querySelector(".tagin"), {separator: " "});
```

#### 4. Allow Duplicates
Add `data-duplicate="true"` to remove duplicates validation.
```html
<input type="text" name="tags" class="form-control tagin" data-duplicate="true" value="html,html,css,css,js,js">
```
Or using module option:
```js
tagin = new Tagin(document.querySelector(".tagin"), {duplicate: true});
```

#### 5. Transform Tags
Sometimes we need to transform tags.
Example tags with `toUpperCase()`.
Using  `data-transform` attribute:
```html
<input type="text" name="tags" class="form-control tagin" data-transform="input => input.toUpperCase()" value="HTML,CSS">
```
Or using module option:
```js
tagin = new Tagin(document.querySelector(".tagin"), {transform: input => input.toUpperCase()});
```

#### 6. Force add on enter
Add `data-enter="true"` to force adding tag when enter key is pressed.
```html
<input type="text" name="tags" class="form-control tagin" data-enter="true" value="red,green,blue" data-placeholder="Add a color... (then press comma or enter)">
```
Or using module option:
```js
tagin = new Tagin(document.querySelector(".tagin"), {enter: true});
```
