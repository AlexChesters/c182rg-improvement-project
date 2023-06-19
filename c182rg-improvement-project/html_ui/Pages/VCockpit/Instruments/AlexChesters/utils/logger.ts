const debugMode = true

export default {
  log: (...msg: any) => {
    if (!debugMode) return

    console.log(...msg)
  }
}