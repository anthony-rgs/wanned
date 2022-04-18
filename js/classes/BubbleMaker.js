class BubbleMaker {
  constructor(game) {
    this.isWin = false
    this.counter = 0

    this.parent = document.querySelector('body')
    this.child = document.querySelector('#light')

    this.counterDisplay = document.createElement('span')
    this.score = document.createElement('div')
    this.bubbleContainer = document.createElement('div')

    this.counterDisplay.textContent = this.counter
    this.bubble = null

    this.score.classList.add('score')
    this.counterDisplay.classList.add('counterDisplay')

    setInterval(() => {
      const bubbles = document.querySelectorAll('.bubble')
      bubbles.forEach((bubble) => {
        const bubblePosition = bubble.getBoundingClientRect()
        const bubbleContainerPosition =
          this.bubbleContainer.getBoundingClientRect()

        if (
          bubblePosition.y + bubblePosition.height <
            bubbleContainerPosition.y ||
          bubblePosition.x + bubblePosition.width < bubbleContainerPosition.x ||
          bubblePosition.x >
            bubbleContainerPosition.x + bubbleContainerPosition.width
        ) {
          this.bubbleContainer.removeChild(bubble)
        }
      })
    })

    this.onEndCb = null

    this.init()
  }

  bubbleContainerMaker() {
    this.bubbleContainer.classList.add('bubbleContainer')

    this.bubbleContainer.appendChild(this.score)
    this.score.innerHTML = `<h3>Score :</h3>`
    this.score.appendChild(this.counterDisplay)

    setInterval(() => this.bubbleCreate(), 1000)
  }

  bubbleCreate() {
    this.size = Math.random() * 100 + 50 + 'px'
    this.plusMinus = Math.random() > 0.5 ? 1 : -1

    this.bubble = document.createElement('div')
    this.bubble.classList.add('bubble')
    this.bubble.style.height = this.size
    this.bubble.style.width = this.size
    this.bubble.style.top = Math.random() * 100 + 100 + '%'
    this.bubble.style.left = Math.random() * 100 + '%'

    this.bubble.style.setProperty(
      '--left',
      Math.random() * 100 * this.plusMinus + '%'
    )

    this.bubble.addEventListener('click', (e) => {
      this.counter += 1
      this.counterDisplay.textContent = this.counter
      e.target.remove()
      console.log(this.counter)
      if (this.counter >= 2) {
        this.isWin = true
        this.removeContainer()
      }
    })

    this.bubbleContainer.appendChild(this.bubble)
  }

  removeContainer() {
    this.bubbleContainer.style.animation = 'fade-bubbles-out 300ms'
    this.bubbleContainer.addEventListener('animationend', () => {
      this.bubbleContainer.remove()
      this.onEndCb()
    })
  }

  onEnd(cb) {
    this.onEndCb = cb
  }

  init() {
    this.bubbleContainerMaker()

    this.parent.insertBefore(this.bubbleContainer, this.child)
  }
}

export default BubbleMaker
