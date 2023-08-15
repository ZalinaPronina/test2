import { component } from "picoapp"

import { addItems, clearCart } from "theme/theme1/scripts/lib/cart"
import { formatMoney } from "theme/theme1/scripts/lib/currency"

export default component((node, ctx) => {
  const params = new URLSearchParams(window.location.search)
  let handle
  const membership = node.querySelector("[data-checkout-process=membership]")
  const disableAgree = !node.querySelector("[data-checkout-process=agree]")
  const bundleId = Date.now()
  if (window.location.pathname === "/pages/checkout-process-team") {
    handle = "new-gps-team-bundle"
  }
  if (!handle) {
    return
  }

  const state = {
    variantId: null,
  }

  const handleSubmit = () => {
    const submit = node.querySelector("[data-checkout-process=submit]")
    const quantity = node.querySelector("[data-checkout-process=quantity]")
    let isButtonClicked = false
    submit.addEventListener("click", () => {
      if (!isButtonClicked) {
        isButtonClicked = true
        const items = []
        items.push({
          id: state.variantId,
          quantity: 1,
          properties: {
            "Tracker Quantity": parseInt(quantity.value, 10),
            _Bundle: bundleId,
          },
        })

        addItems({ items }).then(
          () => (window.location.href = `${window.Shopify.routes.root}checkout`)
        )
      }
    })
  }

  const onQuantityChange = (event) => {
    const setNewCount = event?.detail?.count
    const minCount = event?.detail?.min || 1
    const maxCount = event?.detail?.max || 1

    if (setNewCount) {
      const quantityPrices = node.querySelectorAll(
        "[data-checkout-process=quantity-price]"
      )
      const quantityValues = node.querySelectorAll(
        "[data-checkout-process=quantity-value]"
      )
      const caseValues = node.querySelectorAll(
        "[data-checkout-process=case-value]"
      )

      quantityPrices.forEach((element) => {
        const { originalPrice } = element.dataset
        const price = parseInt(originalPrice, 10) * event.detail.count

        element.innerHTML = formatMoney(price, window.theme.moneyFormat, true)
      })

      quantityValues.forEach((element) => {
        element.innerHTML = event.detail.count
      })

      caseValues.forEach((element) => {
        const { originalQuantity } = element.dataset
        const newQuantity =
          event.detail.count >= maxCount
            ? maxCount / minCount
            : originalQuantity

        element.innerHTML = newQuantity
      })
    }
  }

  const membershipHydrate = () => {
    const setMembership = (element) => {
      const { value } = element

      state.variantId = value
    }

    const container = membership
    const selectedMembership = container.querySelector("input:checked")
    const quantity = node.querySelector("[data-checkout-process=quantity]")
    const submit = node.querySelector("[data-checkout-process=submit]")
    const agreeCheckbox = node.querySelector("[data-checkout-process=agree]")

    if (selectedMembership) {
      setMembership(selectedMembership)
    }

    membership.addEventListener("change", (event) => {
      if (event.target.name === "membership") {
        setMembership(event.target)
      }
    })

    quantity.addEventListener("change", onQuantityChange)

    if (disableAgree) {
      if (agreeCheckbox) {
        agreeCheckbox.closest("label").remove()
        submit.disabled = false
      }
    }

    node.addEventListener("change", (event) => {
      if (event.target.name === "agree") {
        submit.disabled = !event.target.checked
      }
    })

    ctx.emit("app:update")

    handleSubmit()
  }

  const render = (htmlString) => {
    const html = document.createElement("div")
    html.innerHTML = htmlString

    const membershipContainer = html.querySelector(
      "[data-checkout-process=membership]"
    )
    membership.innerHTML = membershipContainer.innerHTML

    return Promise.resolve(true)
  }

  const hydrate = () => {
    membershipHydrate()
  }

  clearCart()

  fetch(`/products/${handle}?section_id=checkout-process-team`)
    .then((response) => response.text())
    .then(render)
    .then(hydrate)
})
