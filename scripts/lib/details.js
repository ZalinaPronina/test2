export function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== "ESCAPE") return

  const openDetailsElement = event.target.closest("details[open]")
  if (!openDetailsElement) return

  const summaryElement = openDetailsElement.querySelector("summary")
  openDetailsElement.removeAttribute("open")
  summaryElement.setAttribute("aria-expanded", false)
  summaryElement.focus()
}

export function Details() {
  document.querySelectorAll("details[id^='Details-']").forEach((details) => {
    const summary = details.querySelector("summary")

    summary.setAttribute("role", "button")
    summary.setAttribute("aria-expanded", "false")

    if (summary.nextElementSibling.getAttribute("id")) {
      summary.setAttribute("aria-controls", summary.nextElementSibling.id)
    }

    summary.addEventListener("click", (event) => {
      event.currentTarget.setAttribute(
        "aria-expanded",
        !event.currentTarget.closest("details").hasAttribute("open")
      )
    })

    summary.parentElement.addEventListener("keyup", onKeyUpEscape)
  })
}
