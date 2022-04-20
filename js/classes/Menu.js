class Menu {
  constructor() {
    this.menu = document.querySelector('.menu')

    this.title = this.menu.querySelector('.menu h1')
    this.menuButtons = this.menu.querySelector('.menu .menu-buttons')

    this.launch = this.menuButtons.querySelector('.menu-button.launch')
    this.credits = this.menuButtons.querySelector('.menu-button.credits')
    this.quit = this.menuButtons.querySelector('.menu-button.quit')
    this.returnMenu = document.querySelector('.back-button')

    this.creditsContainer = document.querySelector('.credits-container')

    this.confirm = document.querySelector('.confirm-container')
    this.confirmButtons = this.confirm.querySelector('.confirm-buttons')
    this.yesButton = this.confirmButtons.querySelector(
      '.confirm-container .yes'
    )
    this.noButton = this.confirmButtons.querySelector('.confirm-container .no')

    this.credits.addEventListener('click', this.creditMenu.bind(this))
    this.returnMenu.addEventListener('click', this.cancelQuit.bind(this))

    this.load = document.querySelector('#load')

    this.bgPositionStart = null
    this.bgPositionEnd = null
    this._onStartClicked = null
  }

  create() {
    this.bgPositionStart = ''
    this.bgPositionEnd = ''

    this.launch.addEventListener('click', this.hideMenu.bind(this))
    this.show()
  }

  creditMenu() {
    this.creditsContainer.classList.remove('hide')
    this.menuButtons.classList.add('hide')
  }

  quitGame() {
    this.confirm.classList.remove('hide')
    this.menuButtons.classList.add('hide')
  }

  quitButtonClicked() {
    this.quit.addEventListener('click', this.quitGame.bind(this))
  }

  leaveGame() {
    window.close()
  }

  yesButtonClicked() {
    this.yesButton.addEventListener('click', this.leaveGame.bind(this))
  }

  cancelQuit() {
    this.confirm.classList.add('hide')
    this.creditsContainer.classList.add('hide')
    this.menuButtons.classList.remove('hide')
  }

  noButtonClicked() {
    this.noButton.addEventListener('click', this.cancelQuit.bind(this))
  }

  onStartClicked(cb) {
    this._onStartClicked = cb
  }

  hideMenu() {
    this._onStartClicked()
    this.menu.classList.add('hide')
  }

  show() {
    this.menu.classList.remove('hidden')
    this.menu.style.backgroundPosition = '100'

    setInterval(() => {
      this.bgPositionStart =
        this.bgPositionEnd === ''
          ? `${Math.floor(Math.random() * window.innerWidth)}px ${Math.floor(
              Math.random() * window.innerHeight
            )}px`
          : this.bgPositionEnd
      this.bgPositionEnd = `${Math.floor(
        Math.random() * window.innerWidth
      )}px ${Math.floor(Math.random() * window.innerHeight)}px`
      this.menu.style.setProperty(
        '--menu-bg-position-start',
        this.bgPositionStart
      )
      this.menu.style.setProperty('--menu-bg-position-end', this.bgPositionEnd)
    }, parseFloat(getComputedStyle(this.menu).animationDuration.replace('s', '')) * 1000)
  }
}

export default Menu
