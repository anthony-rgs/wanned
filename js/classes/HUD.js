class HUD {
  constructor(headImgSrc, lives, previousSibling) {
    this._lives = lives
    this._baseLives = this.lives

    this._hudContainer = document.createElement('div')
    this._hudContainer.classList.add('hud')

    this.livesContainer = document.createElement('div')
    this.livesContainer.classList.add('hud__lives-container')

    this.head = document.createElement('img')
    this.head.src = headImgSrc
    this.head.classList.add('hud__head')
    this.livesContainer.appendChild(this.head)

    this.livesDisplay = document.createElement('div')
    this.livesDisplay.classList.add('hud__lives-display')
    this.livesContainer.appendChild(this.livesDisplay)

    this._hudContainer.appendChild(this.livesContainer)

    previousSibling.parentNode.insertBefore(this._hudContainer, previousSibling.nextSibling)

    this.updateLives()
  }

  get lives() {
    return this._lives
  }

  set lives(lives) {
    this._lives = lives
    this.updateLives()
  }

  get baseLives() {
    return this._baseLives
  }

  set baseLives(baseLives) {
    this._baseLives = baseLives
    this.updateLives()
  }

  updateLives() {
    this.livesDisplay.innerHTML = `
      ${'<div class="lives-display-heart lives-display-heart--full"></div>'.repeat(Math.floor(this.lives))}
      ${'<div class="lives-display-heart lives-display-heart--mid"></div>'.repeat(Math.ceil(this.lives % 1))}
      ${'<div class="lives-display-heart lives-display-heart--empty"></div>'.repeat(this.baseLives - Math.ceil(this.lives))}
    `
  }
}

export default HUD
