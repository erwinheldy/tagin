function tagin(el, option = {}) {
  const classElement = 'tagin'
  const classWrapper = 'tagin-wrapper'
  const classTags = 'tagin-tags'
  const classTag = 'tagin-tag'
  const classRemove = 'tagin-tag-remove'
  const classInput = 'tagin-input'
  const classInputHidden = 'tagin-input-hidden'
  const defaultSeparator = ','
  const defaultDuplicate = 'false'
  const defaultTransform = input => input
  const separator = el.dataset.separator || option.separator || defaultSeparator
  const duplicate = el.dataset.duplicate || option.duplicate || defaultDuplicate
  const transform = eval(el.dataset.transform) || option.transform || defaultTransform

  const templateTag = value => `<span class="${classTag}">${value}<span class="${classRemove}"></span></span>`

  const getValue = () => el.value
  const getValues = () => el.value.split(separator)
  const wrapper = () => el.nextElementSibling
  const tagsWrapper = () => wrapper().getElementsByClassName(classTags)[0]
  const input = () => wrapper().getElementsByClassName(classInput)[0]
  const getTags = () => [...wrapper().getElementsByClassName(classTag)].map(tag => tag.textContent).join(separator)

  const updateValue = () => { el.value = getTags(); el.dispatchEvent(new Event('change')) }

  // Create
  ; (function () {
    const className = classWrapper + ' ' + el.className.replace(classElement, '').trim()
    const onclick = `this.getElementsByClassName('${classInput}')[0].focus()`
    const tags = getValue().trim() === '' ? '' : getValues().map(templateTag).join('')
    const template = `
    <div class="${className}" onclick="${onclick}">
      <span class="${classTags}">${tags}</span>
      <input type="text" class="${classInput}" onfocus="this.parentNode.classList.add('focus')" onblur="this.parentNode.classList.remove('focus')">
    </div>`
    el.insertAdjacentHTML('afterend', template) // insert template after element
  })()

  // Remove by click
  document.addEventListener('click', e => {
    if (e.target.closest('.' + classRemove)) {
      e.target.closest('.' + classRemove).parentNode.remove()
      updateValue()
    }
  })

  // Remove with backspace
  input().addEventListener('keydown', e => {
    if (input().value === '' && e.keyCode === 8 && wrapper().getElementsByClassName(classTag).length) {
      wrapper().querySelector('.' + classTag + ':last-child').remove()
      updateValue()
    }
  })

  // Adding tag
  input().addEventListener('input', () => {
    autowidth()
    const value = input().value.replace(new RegExp(escapeRegex(separator), 'g'), '').trim()
    if (value === '') { input().value = '' }
    if (input().value.includes(separator)) {
      if (getTags().split(separator).includes(value) && duplicate === 'false') {
        alertExist(value)
      } else {
        tagsWrapper().insertAdjacentHTML('beforeEnd', templateTag(transform(value)))
        updateValue()
      }
      input().value = ''
      input().removeAttribute('style')
    }
  })

  function autowidth() {
    const fakeEl = document.createElement('div')
    fakeEl.classList.add(classInput, classInputHidden)
    fakeEl.innerHTML = input().value.replace(/ /g, '&nbsp;')
    document.body.appendChild(fakeEl)
    input().style.setProperty('width', Math.ceil(window.getComputedStyle(fakeEl).width.replace('px', '')) + 1 + 'px')
    fakeEl.remove()
  }
  function alertExist(value) {
    for (const el of wrapper().getElementsByClassName(classTag)) {
      if (el.textContent === value) {
        el.style.transform = 'scale(1.09)'
        setTimeout(() => { el.removeAttribute('style') }, 150)
      }
    }
  }
  function updateTag() {
    if (getValues().join(separator) !== getTags()) {
      tagsWrapper().innerHTML = getValue().trim() === '' ? '' : getValues().map(templateTag).join('')
    }
  }
  function escapeRegex(value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
  }
  el.addEventListener('change', () => updateTag())
}
