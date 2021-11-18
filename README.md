# Tagin

Simple tag input for Bootstrap. Support bootstrap v4 and v5.

Demo: [https://tagin.netlify.app/](https://tagin.netlify.app/)

## Features

- Custom separator
- Enable / disable duplicates
- Custom transform
- Support bootstrap validation style
- Fast
- Small
- No depedencies


## Installation

Install tagin with npm
```bash
npm install tagin
```

Install from cdn
```html
<link rel="stylesheet" href="https://unpkg.com/tagin/dist/css/tagin.min.css">
<script src="https://unpkg.com/tagin/dist/js/tagin.min.js"></script>
```

## Usage/Examples

Place `css` between `<head></head>` tag
```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/tagin/dist/css/tagin.min.css">
</head>
```

Place `js` before `</body>` tag
```html
<body>
    ...
    <script src="https://unpkg.com/tagin/dist/js/tagin.min.js"></script>
</body>
```

#### 1. Basic Usage (No `data-options` attribute needed)
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue">

<script>
  tagin(document.querySelector('.tagin'))
</script>
```

#### 2. Using Placeholder
Set placeholder using `data-placeholder` attribute.
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue" data-placeholder="Add a color... (then press comma)">

<script>
  tagin(document.querySelector('.tagin'))
</script>
```

#### 3. Using Custom Separator
Set separator using `data-separator` attribute. Example tags using 'space' separator.
```html
<input type="text" name="tags" class="form-control tagin" data-separator=" " value="red green blue">

<script>
  tagin(document.querySelector('.tagin'))
</script>
```

#### 4. Allow Duplicates
Add `data-duplicate="true"` to remove duplicates validation.
```html
<input type="text" name="tags" class="form-control tagin" data-duplicate="true" value="html,html,css,css,js,js">

<script>
  tagin(document.querySelector('.tagin'))
</script>
```

#### 5. Transform Tags
Sometimes we need to transform tags.
Example transform using `toUpperCase`.
```html
<input type="text" name="tags" class="form-control tagin" data-transform="input => input.toUpperCase()" value="HTML,CSS">

<script>
  tagin(document.querySelector('.tagin'))
</script>
```

#### 6. Force add on enter
Add `data-enter="true"` to force add tag when enter key is pressed.
```html
<input type="text" name="tags" class="form-control tagin" data-enter="true" value="red,green,blue" data-placeholder="Add a color... (then press comma or enter)">

<script>
  tagin(document.querySelector('.tagin'))
</script>
```
