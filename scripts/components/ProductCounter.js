import { component } from "picoapp"

import { updateItem } from "theme/theme1/scripts/lib/cart"

export default component((node) => {
  const decrease = node.querySelector("[data-counter-remove]")
  const increase = node.querySelector("[data-counter-add]")
  const quantity = node.querySelector("[data-counter-quantity]")

  const min = parseInt(quantity.attributes.min.value, 10)
  const max = parseInt(quantity.attributes.max.value, 10)
  const id = parseInt(quantity.id, 10)

  let count = parseInt(quantity.value, 10)

  const update = () => {
    if (min && decrease) {
      if (count === min) {
        decrease.disabled = true
      } else {
        decrease.disabled = false
      }
    }

    if (max && increase) {
      if (count === max) {
        increase.disabled = true
      } else {
        increase.disabled = false
      }
    }
  }

  const set = (i) => {
    count = Math.max(min, Math.min(i, max || 10000))
    quantity.value = count

    quantity.dispatchEvent(
      new CustomEvent("change", { detail: { count, min, max } })
    )

    update()

    if (id) {
      updateItem(id, count)
    }
  }

  decrease?.addEventListener("click", (e) => {
    e.preventDefault()
    set(--count)
  })

  increase?.addEventListener("click", (e) => {
    e.preventDefault()
    set(++count)
  })

  quantity.addEventListener("change", (e) => {
    const setNewCount = !e?.detail

    if (setNewCount) {
      set(parseInt(e.target.value, 10))
    }
  })
})
