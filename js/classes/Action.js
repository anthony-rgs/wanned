class Action {
  constructor(callback, autoTrigger = true) {
    this.callback = callback
    this.autoTrigger = autoTrigger
    this.triggered = false
  }

  trigger() {
    if (this.triggered) {
      return
    }

    if (this.autoTrigger) {
      this.callback()
      this.triggered = true
    } else {
      this.callback(() => {
        this.triggered = true
      })
    }
  }
}

export default Action
