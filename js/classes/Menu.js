

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
    this.Load = document.querySelector('#load')
  }
  create(){
    // this.createMenu = document.createElement('div')
    // this.createTitleContainer  = document.createElement('div')
    // this.createLaunch = document.createElement('div')
    // this.createSettings = document.createElement('div')
    // this.createCredits = document.createElement('div')
    // this.createQuit = document.createElement('div')


    // this.createLaunchButton = document.createElement('button')
    // this.createSettingsButton = document.createElement('button')
    // this.createCreditsButton = document.createElement('button')
    // this.createQuitButton = document.createElement('button')
    // this.createTitle = document.createElement("h1")

    // this.createTitle.innerText = "WANNED"
    // this.createLaunchButton.innerText = "CONTINUER"
    // this.createSettingsButton.innerText = "REGLAGES"
    // this.createCreditsButton.innerText = "CREDITS"
    // this.createQuitButton.innerText = "QUIT"


    // this.createMenu.classList.add('menu','show')
    // this.createTitle.classList.add('title')
    // this.createLaunch.classList.add('launch')
    // this.createSettings.classList.add('settings')
    // this.createCredits.classList.add('credits')
    // this.createQuit.classList.add('quit')


    // this.createLaunch.appendChild(this.createLaunchButton)
    // this.createSettings.appendChild(this.createSettingsButton)
    // this.createCredits.appendChild(this.createCreditsButton)
    // this.createQuit.appendChild(this.createQuitButton)


    // this.createMenu.appendChild(this.createTitleContainer)
    // this.createTitleContainer.appendChild(this.createTitle)
    // this.createMenu.appendChild(this.createLaunch)
    // this.createMenu.appendChild(this.createSettings)
    // this.createMenu.appendChild(this.createCredits)
    // this.createMenu.appendChild(this.createQuit)
    // document.body.insertBefore(this.createMenu, this.Load)
    

     this.menu = document.querySelector('.menu')
     this.title = document.querySelector('.title')
     this.launch = document.querySelector('.launch')
     this.settings = document.querySelector('.settings')
     this.credits = document.querySelector('.credits')
     this.quit = document.querySelector('.quit')
     this.bgPositionStart = ""
     this.bgPositionEnd = ""


    this.launch.addEventListener('click', this.hideMenu.bind(this))
    this.show()

  }

  hideMenu(){
      this.menu.classList.remove('show')
  }

  show() {
    this.menu.classList.remove('hidden')
    this.menu.style.backgroundPosition = '100'
    
    setInterval(() => {
        this.bgPositionStart = this.bgPositionEnd === "" ?   `${Math.floor(Math.random() * window.innerWidth)}px ${Math.floor(
            Math.random() * window.innerHeight
          )}px`
          : this.bgPositionEnd
      this.bgPositionEnd = `${Math.floor(Math.random() * window.innerWidth)}px ${Math.floor(
        Math.random() * window.innerHeight
      )}px`
      this.menu.style.setProperty(
        '--menu-bg-position-start',
        this.bgPositionStart)
      this.menu.style.setProperty(
        '--menu-bg-position-end',
        this.bgPositionEnd
      )
    }, parseFloat(getComputedStyle(this.menu).animationDuration.replace('s', '') * 1000))
  }
}

export default Menu