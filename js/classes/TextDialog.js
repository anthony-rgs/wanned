class TextDialog {
  constructor(messages = [], hide = true) {
    this._messages = messages
    this._messageIndex = 0

    this.parent = document.querySelector('body')
    this.child = document.querySelector('#light')

    this.messageContainer = document.createElement('div')
    this.choicesElement = document.createElement('ul')

    this.choicesElement.classList.add('choices-element')
    this.messageContainer.classList.add('text-dialog')

    if (hide) {
      this.hide()
    }

    this.init()
  }

  get messages() {
    return this._messages
  }

  set messages(value) {
    this._messages = value
    this.updateMessageContainer()
  }

  get messageIndex() {
    return this._messageIndex
  }

  set messageIndex(value) {
    this._messageIndex = value
    this.updateMessageContainer()
  }

  get currentMessage() {
    return this.messages[this.messageIndex]
  }

  updateMessageContainer() {
    this.choicesElement.innerHTML = ''

    if (this.currentMessage) {
      this.messageContainer.innerHTML = `<div class="text-content"><p>${this.currentMessage.text}</p></div>`

      if (
        this.currentMessage.choices &&
        this.currentMessage.choices.length > 0
      ) {
        this.currentMessage.choices.forEach((choice) => {
          const li = document.createElement('li')
          li.innerText = choice.text
          li.addEventListener('click', choice.callback)
          this.choicesElement.appendChild(li)
        })

        this.messageContainer.appendChild(this.choicesElement)
      }
    } else {
      this.hide()
    }
  }

  hide() {
    this.messageContainer.classList.add('hide')
  }

  show() {
    this.messageContainer.classList.remove('hide')
  }

  next() {
    this.messages.shift()
    this.updateMessageContainer()
  }

  init() {
    this.updateMessageContainer()

    this.parent.insertBefore(this.messageContainer, this.child)
  }
}

export default TextDialog
