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
<link rel="stylesheet" href="https://unpkg.com/tagin@2.0.2/dist/tagin.min.css">
<script src="https://unpkg.com/tagin@2.0.2/dist/tagin.min.js"></script>
```

## Usage/Examples

Place `css` between `<head></head>` tags:
```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/tagin@2.0.2/dist/tagin.min.css">
</head>
```

Place `js` before `</body>` tag:
```html
<body>
    ...
    <script src="https://unpkg.com/tagin@2.0.2/dist/tagin.min.js"></script>
</body>
```
* You can also use tagin as javascript module:
```html
<script src="yourscript.js" type="module"></script>
```
In `yourscript.js` file, import Tagin (Change location according to your path):
```js
import Tagin from './path/to/tagin.module.js'
```
Or you can use it directly in the html script as a module:
```html
<script type="module">
	import Tagin from './path/to/tagin.module.js'
</script>
```

#### 1. Basic Usage (No `data-options` attribute needed):
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue">
```
```js
const options = {
    separator: ',', // default: ','
    duplicate: false, // default: false
    enter: true, // default: false
    transform: 'input => input.toUpperCase()', // default: input => input
    placeholder: 'Add a group...' // default: ''
}
const tagin = new Tagin(document.querySelector('.tagin'), options)

tagin.addTag('yellow') // Add tag 'yellow'
tagin.addTag(['cyan', 'black']) // Add tags 'cyan' and 'black'
tagin.getTag() // Return tags as string red,green,blue,yellow,cyan,black
tagin.getTags() // Return tags as array ['red', 'green', 'blue', 'yellow', 'cyan', 'black']
```

#### 2. Using Placeholder
Using `data-tagin-placeholder` attribute:
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue" data-tagin-placeholder="Add a color... (then press comma)">
```
Or using option:
```js
const tagin = new Tagin(document.querySelector('.tagin'), {
  placeholder: 'Add a color... (then press comma)'
})
```

#### 3. Using Custom Separator
Example tags with 'space' separator.
Using `data-tagin-separator` attribute:
```html
<input type="text" name="tags" class="form-control tagin" data-tagin-separator=" " value="red green blue">
```
Or using option:
```js
const tagin = new Tagin(document.querySelector('.tagin'), {
	separator: ' '
})
```

#### 4. Allow Duplicates
Add `data-tagin-duplicate` to remove duplicates validation.
```html
<input type="text" name="tags" class="form-control tagin" data-tagin-duplicate value="html,html,css,css,js,js">
```
Or using option:
```js
const tagin = new Tagin(document.querySelector('.tagin'), {
	duplicate: true
})
```

#### 5. Transform Tags
Sometimes we need to transform tags.
Example tags with `toUpperCase()`.
Using  `data-tagin-transform` attribute:
```html
<input type="text" name="tags" class="form-control tagin" data-tagin-transform="input => input.toUpperCase()" value="HTML,CSS">
```
Or using option:
```js
const tagin = new Tagin(document.querySelector('.tagin'), {
	transform: 'input => input.toUpperCase()'
})
```

#### 6. Force add on enter
Add `data-tagin-enter` to force adding tag when enter key is pressed.
```html
<input type="text" name="tags" class="form-control tagin" data-tagin-enter value="red,green,blue" data-placeholder="Add a color... (then press comma or enter)">
```
Or using option:
```js
const tagin = new Tagin(document.querySelector('.tagin'), {
	enter: true
})
```
