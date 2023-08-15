import { component } from "picoapp"

export default component((node) => {
  const { sectionId } = node.dataset
  const triggers = node.querySelectorAll("[data-tab='trigger']")
  const contentBlocks = node.querySelectorAll("[data-tab='content']")

  const setActiveClass = (elements, handle) => {
    elements.forEach((element) => {
      const elementHandle = element.dataset.handle

      if (elementHandle === handle) {
        element.classList.add("isActive")
      } else {
        element.classList.remove("isActive")
      }
    })
  }

  const handleSetActiveBlock = ({ target: trigger }) => {
    setActiveClass(triggers, trigger.dataset.handle)
    setActiveClass(contentBlocks, trigger.dataset.handle)
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", handleSetActiveBlock)
  })

  document.addEventListener("shopify:block:select", ({ detail }) => {
    if (detail.sectionId === sectionId) {
      handleSetActiveBlock({ target: { dataset: { handle: detail.blockId } } })
    }
  })

  return () => {
    triggers.forEach((trigger) => {
      trigger.remove("click", handleSetActiveBlock)
    })
  }
})
