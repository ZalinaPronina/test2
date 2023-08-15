import { component } from "picoapp"

import { formatMoney } from "theme/theme1/scripts/lib/currency"
import getProductJson from "theme/theme1/scripts/lib/getProductJson"
import options from "theme/theme1/scripts/lib/options"

export default component((node, ctx) => {
  const opts = options(node)
  const priceContainer = document.querySelector("[data-price]")
  // cache
  getProductJson()

  const handlePriceUpdate = ({ price, compare_at_price: compareAtPrice }) => {
    const showCompareAtPrice = Boolean(compareAtPrice) && compareAtPrice > price

    const priceListHtml = `
      ${
        showCompareAtPrice
          ? `<span class="Price Price--compare-at text-16 text-brand-red uppercase line-through">was ${formatMoney(
              compareAtPrice,
              window.theme.moneyFormat,
              true
            )}</span>`
          : ""
      }
      <span class="${
        showCompareAtPrice ? "Price Price--highlight text-24" : "Price text-24"
      }">${formatMoney(price, window.theme.moneyFormat, true)}</span>
    `

    priceContainer.innerHTML = priceListHtml
  }

  opts.onUpdate((state) => {
    getProductJson().then((json) => {
      const variant = json.variants.filter(
        (v) => v.id === parseInt(state.id, 10)
      )[0]

      if (priceContainer) {
        handlePriceUpdate(variant)
      }

      ctx.emit("variant:change", (previuosState) => ({
        ...previuosState,
        variant,
      }))
    })
  })
})
