import { component } from "picoapp"

export default component((node) => {
  const handleChangeActiveTab = (handle) => {
    const changeClass = (selector) => {
      node.querySelectorAll(selector).forEach((element) => {
        if (element.dataset.handle === handle) {
          element.classList.add("isActive")
        } else {
          element.classList.remove("isActive")
        }
      })
    }

    changeClass("[data-faq=trigger]")
    changeClass("[data-faq=content]")
  }

  const onClick = (event) => {
    const trigger = event.target.closest("[data-faq=trigger]")

    if (trigger) {
      handleChangeActiveTab(trigger.dataset.handle)
    }
  }

  node.addEventListener("click", onClick)

  return () => node.removeEventListener("click", onClick)
})
