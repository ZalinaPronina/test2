import { component } from "picoapp"

export default component((node) => {
  const selectors = {
    trigger: "[data-has-childlink]",
    dropdown: "[data-link-dropdown]",
  }

  const triggers = node.querySelectorAll(selectors.trigger)

  const handleOpen = (event) => {
    const parent = event.target.closest(selectors.trigger)
    const dropdown = event.target.querySelector(selectors.dropdown)

    if (dropdown) {
      parent.classList.add("isOpen")
    }
  }

  const handleClose = (event) => {
    const parent = event.target.closest(selectors.trigger)
    const dropdown = event.target.querySelector(selectors.dropdown)

    if (dropdown) {
      parent.classList.remove("isOpen")
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", handleOpen)
    trigger.addEventListener("mouseleave", handleClose)
  })
})
