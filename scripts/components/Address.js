import { component } from "picoapp"

export default component((node) => {
  const { addressId } = node.dataset
  const removeTrigger = node.querySelector("[data-remove]")

  const handleRemoveAddress = () => {
    if (!window.confirm(window.theme.addresses.removeConfirmation)) return

    const form = document.createElement("form")
    const input = document.createElement("input")
    const returnInput = document.createElement("input")

    form.setAttribute("method", "post")
    form.setAttribute("action", `${window.theme.routes.addresses}/${addressId}`)

    input.setAttribute("type", "hidden")
    input.setAttribute("name", "_method")
    input.setAttribute("value", "delete")

    returnInput.setAttribute("type", "hidden")
    returnInput.setAttribute("name", "return_to")
    returnInput.setAttribute("value", window.theme.routes.account)

    form.appendChild(input)
    form.appendChild(returnInput)

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  removeTrigger.addEventListener("click", handleRemoveAddress)
})
