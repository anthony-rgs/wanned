class Key {
  constructor(key, parent) {
    this.key = key
    this.parent = parent
    this.init()
  }

  dispatchEvent() {
    console.log(this.key)

    document.querySelector('#key-info').dispatchEvent(
      new CustomEvent('set', {
        detail: {
          action: this.key.action,
        },
      }),
    )
  }

  init() {
    const key = document.createElement('div')
    key.classList.add('key')

    key.addEventListener('mouseenter', () => this.dispatchEvent())

    if (this.parent) {
      this.parent.appendChild(key)
    }

    if (this.key.key.includes('Arrow')) {
      const controlsContainer = document.querySelector('#controls-container')

      if (this.parent) {
        controlsContainer.appendChild(this.parent)
      } else {
        controlsContainer.appendChild(key)
      }

      const arrow = document.createElement('div')
      arrow.classList.add('arrow')
      key.appendChild(arrow)

      switch (this.key.key) {
        case 'ArrowLeft':
          key.classList.add('control-left')
          break
        case 'ArrowRight':
          key.classList.add('control-right')
          break
        case 'ArrowUp':
          key.classList.add('control-up')
          break
        case 'ArrowDown':
          key.classList.add('control-down')
          break
        default:
          break
      }

      return
    } else {
      const otherKeysContainer = document.querySelector('#other-keys-container')

      if (this.parent) {
        otherKeysContainer.appendChild(this.parent)
      } else {
        otherKeysContainer.appendChild(key)
      }

      const letter = document.createElement('span')
      letter.classList.add('letter')
      letter.innerText = this.key.key.toUpperCase()
      key.appendChild(letter)

      return
    }
  }
}

export default Key
