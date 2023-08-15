export default function throttle(func, timeFrame) {
  let lastTime = 0
  return function f() {
    const now = Date.now()
    if (now - lastTime >= timeFrame) {
      func()
      lastTime = now
    }
  }
}
