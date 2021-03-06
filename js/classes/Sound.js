class Sound {
  constructor(src, volume = 1, loop = false) {
    this.sound = new Audio(src)
    document.body.appendChild(this.sound)
    this.sound.volume = volume
    this.sound.loop = loop
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

  static changeVolume(volume) {
    const audios = document.querySelectorAll('audio')

    audios.forEach((audio) => {
      if (volume === 0) {
        audio.muted = true
      } else if (volume === 'unmute') {
        audio.muted = false
      } else {
        audio.volume = volume
      }
    })
  }
}

export default Sound
