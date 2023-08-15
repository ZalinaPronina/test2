import { component } from "picoapp"

export default component((node, ctx) => {
  const button = node.querySelector("button")

  if (!button) {
    return
  }

  function generateURL(id) {
    const query = "?rel=0&showinfo=0&autoplay=1"

    return `https://www.youtube.com/embed/${id}${query}`
  }

  function createIframe(id) {
    const iframe = document.createElement("iframe")

    iframe.setAttribute("allowfullscreen", "")
    iframe.setAttribute("allow", "autoplay")
    iframe.setAttribute("src", generateURL(id))

    return iframe
  }

  const { videoId } = node.dataset
  const modalId = button.dataset.modalTrigger
  const modal = document.querySelector(`[data-modal-id="${modalId}"]`)
  const container = modal.querySelector("[data-modal-content]")

  button.addEventListener("click", () => {
    const video = container.querySelector("iframe")

    if (video) {
      video.remove()
    }

    const iframe = createIframe(videoId)

    container.appendChild(iframe)
  })

  ctx.on(`modal:${modalId}:closed`, () => {
    const video = container.querySelector("iframe")

    if (video) {
      video.remove()
    }
  })
})
