# Tagin
Simple tag input for Bootstrap. Support bootstrap v4 and v5.

Demo: [https://tagin.netlify.app/](https://tagin.netlify.app/)

#### Features
* Custom separator
* Enable / disable duplicates
* Custom transform
* Fast
* Small
* No depedencies

## Installations

### CSS CDN RawGithack
**Development Version**
  - Unminified version: 
    ```
    https://raw.githack.com/darkterminal/tagin/master/dist/css/tagin.css
    ```
  - Minified version: 
    ```
    https://raw.githack.com/darkterminal/tagin/master/dist/css/tagin.min.css
    ```
**Production Version**
  - Unminified version: 
    ```
    https://rawcdn.githack.com/darkterminal/tagin/6fa2863c13aa1841f33cf6dcbbf266c92fbf5412/dist/css/tagin.css
    ```
  - Minified version (Recomended): 
    ```
    https://rawcdn.githack.com/darkterminal/tagin/6fa2863c13aa1841f33cf6dcbbf266c92fbf5412/dist/css/tagin.min.css
    ```
  
### JS CDN RawGithack
**Development Version**
  - Unminified version: 
    ```
    https://raw.githack.com/darkterminal/tagin/master/dist/js/tagin.js
    ```
  - Minified version: 
    ```
    https://raw.githack.com/darkterminal/tagin/master/dist/js/tagin.min.js
    ```
**Production Version**
  - Unminified version: 
    ```
    https://rawcdn.githack.com/darkterminal/tagin/6fa2863c13aa1841f33cf6dcbbf266c92fbf5412/dist/js/tagin.js
    ```
  - Minified version (Recomended): 
    ```
    https://rawcdn.githack.com/darkterminal/tagin/6fa2863c13aa1841f33cf6dcbbf266c92fbf5412/dist/js/tagin.min.js
    ```

### Usage

Place `css` between `<head></head>` tag
```html
<link rel="stylesheet" href="https://rawcdn.githack.com/darkterminal/tagin/6fa2863c13aa1841f33cf6dcbbf266c92fbf5412/dist/css/tagin.min.css">
```

Place `js` before `</body>` tag
```html
<script src="https://rawcdn.githack.com/darkterminal/tagin/6fa2863c13aa1841f33cf6dcbbf266c92fbf5412/dist/js/tagin.min.js"></script>
```

### Options

#### 1. Basic Usage (No `data-Options` attribute needed)
```html
<input type="text" name="tags" class="form-control tagin" value="dark mode,favicon,media queries,svg,svg icons">

<script>
  tagin( document.querySelector('.tagin') );
</script>
```

#### 2. Using Placeholder
Set placeholder using `data-placeholder` attribute.
```html
<input type="text" name="tags" class="form-control tagin" value="red,green,blue" data-placeholder="Add a color... (then press comma)">

<script>
  tagin( document.querySelector('.tagin') );
</script>
```

#### 3. Using Custom Separator
Set separator using `data-separator` attribute. Example tags using 'space' separator.
```html
<input type="text" name="tags" class="form-control tagin" data-separator=" " value="autocomplete forms inputmode inputs ux">

<script>
  tagin( document.querySelector('.tagin') );
</script>
```

#### 4. Allow Diplicates
Add `data-duplicate="true"` to remove duplicates validation.
```html
<input type="text" name="tags" class="form-control tagin" data-duplicate="true" value="html,html,css,css,js,js">

<script>
  tagin( document.querySelector('.tagin') );
</script>
```

#### 5. Using Transform Rules
Sometimes we need to transform tags.
Example transform using `toUpperCase`.
```html
<input type="text" name="tags" class="form-control tagin" data-transform="input => input.toUpperCase()" value="HTML,CSS">

<script>
  tagin( document.querySelector('.tagin') );
</script>
```
