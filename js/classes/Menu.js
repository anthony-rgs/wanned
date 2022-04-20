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
    this.menuOptions = document.querySelector('.menu-container')
    this.title = document.querySelector('.title')
    this.launch = document.querySelector('.launch')
    this.credits = document.querySelector('.credits')
    this.quit = document.querySelector('.quit')
    this.bgPositionStart = ''
    this.bgPositionEnd = ''
    this.confirm = document.querySelector('.confirm-container')
    this.yesButton = document.querySelector('.yes-yes')
    this.noButton = document.querySelector('.no-no')
    
    this.launch.addEventListener('click', this.hideMenu.bind(this))
    this.show()
  }
  quitGame(){
    this.menu = document.querySelector('.menu')
    this.menuOptions = document.querySelector('.menu-container')
    this.title = document.querySelector('.title')
    this.launch = document.querySelector('.launch')
    this.credits = document.querySelector('.credits')
    this.quit = document.querySelector('.quit')
    this.confirm = document.querySelector('.confirm-container')
    this.yesButton = document.querySelector('.yes-yes')
    this.noButton = document.querySelector('.no-no')


    this.confirm.classList.add('show')
    this.menuOptions.classList.add('hide')
  }
  quitButtonClicked(){
    this.quit.addEventListener('click',this.quitGame)
  }

leaveGame(){
  window.close()
}

  yesButtonClicked(){
    this.yesButton.addEventListener('click',this.leaveGame)
  }

cancelQuit(){
  this.menu = document.querySelector('.menu')
  this.menuOptions = document.querySelector('.menu-container')
  this.title = document.querySelector('.title')
  this.launch = document.querySelector('.launch')
  this.credits = document.querySelector('.credits')
  this.quit = document.querySelector('.quit')
  this.confirm = document.querySelector('.confirm-container')
  this.yesButton = document.querySelector('.yes-yes')
  this.noButton = document.querySelector('.no-no')

  this.confirm.classList.remove('show')
  this.menuOptions.classList.remove('hide')
}

noButtonClicked(){
  this.noButton.addEventListener('click',this.cancelQuit)
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
