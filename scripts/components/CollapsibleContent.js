import { component } from "picoapp"

export default component((node, ctx) => {
  const trigger = node.querySelector("[data-trigger]")
  const content = node.querySelector("[data-content]")
  const contentInner = node.querySelector("[data-content-inner]")
  const animationTime = parseInt(node.getAttribute("data-animation-time"), 10)

  if (!trigger) {
    return false
  }

  let isOpen = !!trigger.classList.contains("open")

  content.classList.add("init")
  setTimeout(() => {
    content.style.setProperty(
      "--content-height",
      `${contentInner.clientHeight}px`
    )
  }, 100)

  const resizeHandle = () => {
    content.style.setProperty(
      "--content-height",
      `${contentInner.clientHeight}px`
    )
  }

  const openHandle = () => {
    ctx.emit("CollapsibleContent:closeAll")

    resizeHandle()

    trigger.classList.add("open")
    content.classList.add("open")

    isOpen = true
    setTimeout(() => {
      const yOffset =
        document.querySelector("#shopify-section-header").clientHeight + 100
      const y = node.getBoundingClientRect().top + window.pageYOffset - yOffset

      window.scrollTo({ top: y, behavior: "smooth" })
    }, animationTime)
  }

  const closeHandle = () => {
    trigger.classList.remove("open")
    content.classList.remove("open")

    isOpen = false
  }

  trigger.addEventListener("click", () => {
    if (isOpen) {
      closeHandle()
    } else {
      openHandle()
    }
  })

  window.addEventListener("resize", resizeHandle)
  ctx.on("CollapsibleContent:resize", resizeHandle)
  ctx.on("CollapsibleContent:closeAll", closeHandle)

  return true
})
