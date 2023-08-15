import { component } from "picoapp"

import { addItemById } from "theme/theme1/scripts/lib/cart"

export default component((node) => {
  const form = node.querySelector('form[action^="/cart/add"]')

  if (!form) {
    return
  }
  const select = node.querySelector("select[data-option-main]")
  const membership = node.querySelectorAll(
    "[data-checkout-process=membership] input[data-selling-plan-id]"
  )
  const giftMembership = node.querySelectorAll(
    "[data-checkout-process=gift] input"
  )
  const submitBundle = node.querySelector("button[data-submit-bundle]")
  const submitBundleGift = node.querySelector("button[data-submit-gift-bundle]")
  const submit = form.querySelector('button[type="submit"]')
  const { addToCart, adding } = window.theme.product
  let sellingId

  const setItemStorage = (inputs) => {
    inputs.forEach((input) => {
      if (input.checked) {
        sellingId = {
          sellingId: input.dataset.sellingPlanId,
          Id: input.value,
        }
      }
    })
    const sellingIdString = JSON.stringify(sellingId)
    localStorage.setItem("productVariant", select.selectedOptions[0].value)
    localStorage.setItem("sellingId", sellingIdString)
  }
  submitBundle.addEventListener("click", () => {
    setItemStorage(membership)
  })
  submitBundleGift.addEventListener("click", () => {
    setItemStorage(giftMembership)
  })
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    submit.disabled = true
    submit.innerHTML = `<span>${adding}</span>`

    const formData = new FormData(form)
    const id = formData.get("id")
    const quantity = formData.get("quantity")

    addItemById(id, quantity)
      .then((data) => {
        console.log(data)
      })
      .finally(() => {
        submit.disabled = false
        submit.innerHTML = `<span>${addToCart}</span>`
      })
  })
})
