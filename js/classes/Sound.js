class Sound {
  constructor(src, volume = 1) {
    this.sound = new Audio(src)
    this.sound.volume = volume
  }

  play() {
    this.sound.play()
  }

  pause() {
    this.sound.pause()
  }

  reset() {
    this.sound.currentTime = 0
  }
}

export default Sound
