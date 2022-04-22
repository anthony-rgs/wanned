export default () => {
  return !("ontouchstart" in document.documentElement)
}
