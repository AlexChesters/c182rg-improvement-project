const debugMode = false

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