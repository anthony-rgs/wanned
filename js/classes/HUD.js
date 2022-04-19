class HUD {
  constructor(headImgSrc, lives, speedMeasure, previousSibling) {
    this._lives = lives
    this._baseLives = this.lives

    this._speedMeasure = speedMeasure
    this._baseSpeedMeasure = this.speedMeasure

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

    this.speedMeasureContainer = document.createElement('div')
    this.speedMeasureContainer.classList.add('hud__speed-measure-container')

    this.speedMeasureText = document.createElement('p')
    this.speedMeasureText.classList.add('hud__speed-measure-text')
    this.speedMeasureText.innerText = 'Vitesse'
    this.speedMeasureContainer.appendChild(this.speedMeasureText)

    this.speedMeasureDisplay = document.createElement('div')
    this.speedMeasureDisplay.classList.add('hud__speed-measure-display')
    this.speedMeasureContainer.appendChild(this.speedMeasureDisplay)

    this._hudContainer.appendChild(this.livesContainer)
    this._hudContainer.appendChild(this.speedMeasureContainer)

    previousSibling.parentNode.insertBefore(this._hudContainer, previousSibling.nextSibling)

    this.updateLives()
    this.updateSpeedMeasure()
  }

  get lives() {
    return this._lives
  }

  set lives(lives) {
    this._lives = lives
    this.updateLives()
  }

  get speedMeasure() {
    return this._speedMeasure
  }

  set speedMeasure(speedMeasure) {
    this._speedMeasure = speedMeasure
    this.updateSpeedMeasure()
  }

  get speedMeasurePercentage() {
    return this.speedMeasure / this._baseSpeedMeasure
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

  updateSpeedMeasure() {
    // this.speedMeasureDisplay.style.width = `${this.speedMeasurePercentage * 100}%`
    this.speedMeasureDisplay.style.flex = `${this.speedMeasurePercentage}`
  }
}

export default HUD
