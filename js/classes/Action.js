class Action {
  constructor(callback, triggerOnce = false) {
    this.callback = callback
    this.triggerOnce = triggerOnce
    this.triggered = false
  }

  trigger() {
    if (this.triggerOnce && this.triggered) {
      return
    }
    this.triggered = true
    this.callback()
  }
}

export default Action
