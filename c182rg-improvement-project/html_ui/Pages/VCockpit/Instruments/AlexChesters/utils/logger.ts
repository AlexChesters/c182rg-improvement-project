const debugMode = false

export default {
  log: (...msg: any) => {
    if (!debugMode) return

    console.log(...msg)
  }
}