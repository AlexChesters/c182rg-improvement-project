const debugMode = true

export default {
  log: (...msg: any) => {
    console.log(...msg)
  },
  debug: (...msg: any) => {
    if (debugMode) {
      console.log(...msg)
    }
  }
}