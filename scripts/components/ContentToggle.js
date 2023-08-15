import { component } from "picoapp"

export default component((node) => {
  const id = node.getAttribute("aria-controls")
  const content = document.querySelector(`#${id}`)

  node.addEventListener("click", () => {
    if (node.getAttribute("aria-expanded") === "false") {
      node.setAttribute("aria-expanded", "true")
    } else {
      node.setAttribute("aria-expanded", "false")
    }
  })
})
