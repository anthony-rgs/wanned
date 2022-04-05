class Story {
  constructor(texts) {
    this.texts = texts
    this.currentText = 0
    this.paragraph = document.querySelector('#story p')
    this.progressBar = document.querySelector('#progress-bar')
    this.cb = null
    this.transition()
  }

  fillProgress(duration, cb) {
    this.progressBar.style.animation = `progress ${duration}ms linear running`
    this.progressBar.addEventListener('animationend', cb)
  }

  onEnd(cb) {
    this.cb = cb
  }

  transition() {
    this.fillProgress(this.texts[this.currentText].duration, () => {
      if (this.currentText < this.texts.length - 1) {
        this.currentText += 1
      } else {
        this.cb()
      }
      this.paragraph.classList.add('hidden')
      this.progressBar.style.width = 0
      this.progressBar.style.animation = 'none'
      setTimeout(() => {
        this.paragraph.innerText = this.texts[this.currentText].text
        this.paragraph.classList.remove('hidden')
        this.transition()
      }, 500)
    })
  }
}

export default Story
