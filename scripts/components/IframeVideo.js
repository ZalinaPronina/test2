import { component } from "picoapp"

export default component((node) => {
  const button = node.querySelector("button")
  if (!button) {
    return
  }
  let isVideoClick = false
  button.addEventListener("click", (event) => {
    const currentVideo =
      event.currentTarget.parentElement.querySelector("video")
    if (!isVideoClick && currentVideo.paused === true) {
      currentVideo.play()
      event.currentTarget.classList.add("hidden")
      event.currentTarget.parentElement
        .querySelector("img")
        .classList.add("hidden")
    }
    isVideoClick = true
  })
})
