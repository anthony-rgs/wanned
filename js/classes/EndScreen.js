import wait from '../utils/wait.js'

class EndScreen {
  constructor(title, game) {
    this.isRetry = false
    this.isQuit = false
    this.titleEndScreen = title
    this.parent = document.querySelector('body')
    this.child = document.querySelector('#wanned')
    this.color = this.titleEndScreen === 'Game Over' ? 'red' : 'green'
    this._onStartClicked = null
    this.game = game

    this.init()
  }

  async init() {
    await wait(1000)

    this.gameOverScreen = document.createElement('div')
    this.buttonContainer = document.createElement('div')
    this.retryButton = document.createElement('button')
    this.quitButton = document.createElement('button')
    this.title = document.createElement('h2')

    this.gameOverScreen.classList.add('game-over')
    this.buttonContainer.classList.add('button-container')
    this.retryButton.classList.add('retry')
    this.quitButton.classList.add('quit')
    this.title.classList.add('title')

    this.title.textContent = this.titleEndScreen
    this.title.classList.add(`title-${this.color}`)
    this.retryButton.textContent = 'Recommencer'
    this.quitButton.textContent = 'Quitter'

    this.gameOverScreen.appendChild(this.title)
    this.buttonContainer.appendChild(this.retryButton)
    this.buttonContainer.appendChild(this.quitButton)
    this.gameOverScreen.appendChild(this.buttonContainer)

    this.retryButton.addEventListener('click', () => {
      this.isRetry = true
      this.gameOverScreen.remove()
      this.game.retry()
      
      
    })



    this.quitButton.addEventListener('click', () => {
      this.isQuit = true
      // this.gameOverScreen.remove()
      location.reload()
    })

    this.parent.insertBefore(this.gameOverScreen, this.child)
  }

}

export default EndScreen
