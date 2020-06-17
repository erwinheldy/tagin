function tagin(el, option = {}) {
  const classElement = 'tagin'
  const classWrapper = 'tagin-wrapper'
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
  const getValues = () => getValue().split(separator)

  // Create
  ; (function () {
    const className = classWrapper + ' ' + el.className.replace(classElement, '').trim()
    const tags = getValue().trim() === '' ? '' : getValues().map(templateTag).join('')
    const template = `<div class="${className}">${tags}<input type="text" class="${classInput}"></div>`
    el.insertAdjacentHTML('afterend', template) // insert template after element
  })()

  const wrapper = el.nextElementSibling
  const input = wrapper.getElementsByClassName(classInput)[0]
  const getTags = () => [...wrapper.getElementsByClassName(classTag)].map(tag => tag.textContent)
  const getTag = () => getTags().join(separator)

  const updateValue = () => { el.value = getTag(); el.dispatchEvent(new Event('change')) }

  // Focus to input
  wrapper.addEventListener('click', () => input.focus())

  // Toggle focus class
  input.addEventListener('focus', () => wrapper.classList.add('focus'))
  input.addEventListener('blur', () => wrapper.classList.remove('focus'))

  // Remove by click
  document.addEventListener('click', e => {
    if (e.target.closest('.' + classRemove)) {
      e.target.closest('.' + classRemove).parentNode.remove()
      updateValue()
    }
  })

  // Remove with backspace
  input.addEventListener('keydown', e => {
    if (input.value === '' && e.keyCode === 8 && wrapper.getElementsByClassName(classTag).length) {
      wrapper.querySelector('.' + classTag + ':last-of-type').remove()
      updateValue()
    }
  })

  // Adding tag
  input.addEventListener('input', () => {
    autowidth()
    const value = transform(input.value.replace(new RegExp(escapeRegex(separator), 'g'), '').trim())
    if (value === '') { input.value = '' }
    if (input.value.includes(separator)) {
      if (getTags().includes(value) && duplicate === 'false') {
        alertExist(value)
      } else {
        input.insertAdjacentHTML('beforebegin', templateTag(value))
        updateValue()
      }
      input.value = ''
      input.removeAttribute('style')
    }
  })

  function autowidth() {
    const fakeEl = document.createElement('div')
    fakeEl.classList.add(classInput, classInputHidden)
    fakeEl.innerHTML = input.value.replace(/ /g, '&nbsp;')
    document.body.appendChild(fakeEl)
    input.style.setProperty('width', Math.ceil(window.getComputedStyle(fakeEl).width.replace('px', '')) + 1 + 'px')
    fakeEl.remove()
  }
  function alertExist(value) {
    for (const el of wrapper.getElementsByClassName(classTag)) {
      if (el.textContent === value) {
        el.style.transform = 'scale(1.09)'
        setTimeout(() => { el.removeAttribute('style') }, 150)
      }
    }
  }
  function updateTag() {
    if (getValue() !== getTag()) {
      [...wrapper.getElementsByClassName(classTag)].map(tag => tag.remove())
      getValue().trim() !== '' && input.insertAdjacentHTML('beforebegin', getValues().map(templateTag).join(''))
    }
  }
  function escapeRegex(value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
  }
  el.addEventListener('change', () => updateTag())
}
