import getSection from "theme/theme1/scripts/api/sections"
import debounce from "theme/theme1/scripts/lib/debounce"

export default function Facets(node, ctx, section) {
  const { sectionId } = section.dataset
  const insertableContent = section.querySelector("[data-insertable-content]")
  const clearFilters = node.querySelectorAll("[data-clear]")

  const insertContent = (str) => {
    const temp = document.createElement("div")
    temp.innerHTML = str

    insertableContent.innerHTML = temp.querySelector(
      "[data-insertable-content]"
    ).innerHTML

    ctx.emit("app:update")
    ctx.emit("images:update")
  }

  const renderSection = (href, id) => {
    getSection(href, id)
      .then((body) => {
        window.history.pushState({}, "", href)
        insertContent(body)
      })
      .catch((err) => console.error(err))
  }

  const createSearchParams = (form) => {
    const formData = new FormData(form)
    return new URLSearchParams(formData)
  }

  const onFilterChanged = debounce(() => {
    const selectedInputs = node.querySelectorAll(
      "input:checked, input[type='number']"
    )

    const searchParams = new URLSearchParams()
    const formSearchParams = createSearchParams(node.querySelector("form"))
    const url = new URL(window.location.href)

    selectedInputs.forEach((input) => {
      const inputName = input.name.replace("--mobile", "")

      if (input.value !== "") {
        searchParams.append(inputName, input.value)
      }

      formSearchParams.delete(inputName)
    })

    Array.from(formSearchParams.entries()).forEach((param) => {
      const [name, value] = param
      searchParams.append(name, value)
    })

    url.search = searchParams.toString()

    renderSection(url.href, sectionId)
  }, 1000)

  clearFilters.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault()
      const href = event.target.href
        ? event.target.href
        : `${window.location.origin}${window.location.pathname}`

      renderSection(href, sectionId)
    })
  })

  return { onFilterChanged, renderSection }
}
