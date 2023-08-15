import { component } from "picoapp"

export default component((node, ctx) => {
  const overlay = node.querySelector("[data-modal-overlay]")
  const closeTriggers = node.querySelectorAll("[data-modal-close]")

  const { modalId } = node.dataset
  const openTriggers = document.querySelectorAll(
    `[data-modal-trigger=${modalId}]`
  )

  if (!modalId) return

  const open = () => {
    node.classList.add("is-active")

    ctx.emit("modal:toggle", (state) => ({
      modalOpen: !state.modalOpen,
    }))

    setTimeout(() => {
      node.classList.add("is-visible")
    }, 50)
  }

  const close = () => {
    node.classList.remove("is-visible")

    ctx.emit(`modal:${modalId}:closed`)

    setTimeout(() => {
      node.classList.remove("is-active")
    }, 400)
  }

  overlay?.addEventListener("click", close)

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", close)
  })

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", open)
  })

  ctx.on(`modal:${modalId}:open`, open)
  ctx.on(`modal:${modalId}:close`, close)
})
