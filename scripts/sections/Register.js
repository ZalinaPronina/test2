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

  const handleSetActiveBlock = (handle) => {
    setActiveClass(triggers, handle)
    setActiveClass(contentBlocks, handle)
  }

  const handleOnClick = ({ target }) => {
    handleSetActiveBlock(target.dataset.handle)
  }

  const getActiveBlockId = (index) =>
    triggers[parseInt(index, 10) - 1].dataset.handle

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", handleOnClick, true)
  })

  document.addEventListener("shopify:block:select", ({ detail }) => {
    if (detail.sectionId === sectionId) {
      handleSetActiveBlock(detail.blockId)
    }
  })

  const search = new URLSearchParams(window.location.search)

  if (search.has("active-tab")) {
    handleSetActiveBlock(getActiveBlockId(search.get("active-tab")))
  }

  return () => {
    triggers.forEach((trigger) => {
      trigger.remove("click", handleOnClick)
    })
  }
})
