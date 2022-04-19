class Menu {
  constructor() {
    this.menu = null
    this.title = null
    this.launch = null
    this.settings = null
    this.credits = null
    this.quit = null
    this.bgPositionStart = null
    this.bgPositionEnd = null
    this._onStartClicked = null
    this.Load = document.querySelector('#load')
  }

  create() {
    this.menu = document.querySelector('.menu')
    this.title = document.querySelector('.title')
    this.launch = document.querySelector('.launch')
    this.settings = document.querySelector('.settings')
    this.credits = document.querySelector('.credits')
    this.quit = document.querySelector('.quit')
    this.bgPositionStart = ''
    this.bgPositionEnd = ''

    this.launch.addEventListener('click', this.hideMenu.bind(this))
    this.show()
  }

  onStartClicked(cb) {
    this._onStartClicked = cb
  }

  hideMenu() {
    this._onStartClicked()
    this.menu.classList.remove('show')
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
    }, parseFloat(getComputedStyle(this.menu).animationDuration.replace('s', '') * 1000))
  }
}

export default Menu
