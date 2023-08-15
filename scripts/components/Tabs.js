import { component } from "picoapp"

export default component((node, ctx) => {
  const triggers = node.querySelectorAll("[data-tabs='trigger']")
  const tabs = node.querySelectorAll("[data-tabs='content']")

  const handleClick = ({ target }) => {
    const index = parseInt(target.dataset.index, 10)

    tabs.forEach((tab, idx) => {
      idx += 1
      if (index === idx) {
        tab.classList.remove("hidden")
      } else {
        tab.classList.add("hidden")
      }
    })

    triggers.forEach((trigger) => {
      if (trigger === target) {
        trigger.classList.add("isActive")
      } else {
        trigger.classList.remove("isActive")
      }
    })
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", handleClick)
  })
})
