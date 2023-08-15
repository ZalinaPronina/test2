import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

import { addItemById, fetchCart, removeItem } from "theme/theme1/scripts/lib/cart"
import { formatMoney } from "theme/theme1/scripts/lib/currency"
import getProductJson from "theme/theme1/scripts/lib/getProductJson"
import options from "theme/theme1/scripts/lib/options"

Swiper.use([Pagination])

export default component((node, ctx) => {
  const { productHandle } = node.dataset
  const carouselContainer = node.querySelector("[data-product-item='carousel']")
  const form = node.querySelector('form[action^="/cart/add"]')
  const priceContainer = node.querySelector("[data-price]")

  if (carouselContainer) {
    const carousel = new Swiper(carouselContainer, {
      wrapperClass: "ProductItem__CarouselWrapper",
      slideClass: "ProductItem__CarouselItem",
      pagination: {
        el: ".ProductItem__CarouselPagination",
        type: "bullets",
        clickable: true,
      },
    })
  }

  if (!form) {
    return
  }

  const state = {}
  const submit = form.querySelector('button[type="submit"]')
  const { addToCart, adding, added, remove, removing, soldOut } =
    window.theme.product
  const opts = options(node)

  getProductJson(productHandle)

  const checkVariantInCart = (id) =>
    fetchCart().then(({ items }) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].variant_id === parseInt(id, 10)) {
          return true
        }
      }

      return false
    })

  const optionsNotSelected = () => {
    const mainSelector = node.querySelector("[data-option-main]")
    const isEmpty = mainSelector.value === ""

    if (isEmpty) {
      return true
    }

    return false
  }

  const changeAvailable = (variant) => {
    submit.disabled = true

    const handleChangeAvailable = (v) => {
      if (state[v.id] && state[v.id].inCart) {
        submit.disabled = false
        submit.innerHTML = `<span>${remove}</span>`

        return
      }

      if (v.available) {
        submit.disabled = false
        submit.innerHTML = `<span>${addToCart}</span>`
      } else {
        submit.disabled = true
        submit.innerHTML = `<span>${soldOut}</span>`
      }
    }

    if (state[variant.id]) {
      handleChangeAvailable(variant)
    } else {
      checkVariantInCart(variant.id).then((res) => {
        state[variant.id] = {
          ...variant,
          inCart: res,
        }

        handleChangeAvailable(variant)
      })
    }
  }

  const handlePriceUpdate = ({ price, compare_at_price: compareAtPrice }) => {
    const showCompareAtPrice = Boolean(compareAtPrice) && compareAtPrice > price
    const { productDiscount } = node.dataset
    const enableCustomDiscount = !!productDiscount

    const priceListHtml = `
      ${
        showCompareAtPrice
          ? `<span class="Price Price--compare-at text-20 text-brand-red uppercase line-through">was ${formatMoney(
              compareAtPrice,
              window.theme.moneyFormat,
              true
            )}</span>`
          : ""
      }
      <span class="${
        showCompareAtPrice ? "Price Price--highlight text-50" : "Price text-50"
      }">${formatMoney(price, window.theme.moneyFormat, true)}</span>
    `

    const customPriceHtml = `
      <span class="Price Price--compare-at text-20 text-brand-red uppercase line-through">
        was ${formatMoney(price, window.theme.moneyFormat, true)}
      </span>

      <span class="Price Price--highlight text-50">
        ${formatMoney(
          Math.round(
            (price - price * (parseInt(productDiscount, 10) / 100)) / 100
          ) * 100,
          window.theme.moneyFormat,
          true
        )}
      </span>
    `

    priceContainer.innerHTML = enableCustomDiscount
      ? customPriceHtml
      : priceListHtml
  }

  opts.onUpdate((data) => {
    getProductJson(productHandle).then((json) => {
      const variant = json.variants.filter(
        (v) => v.id === parseInt(data.id, 10)
      )[0]

      changeAvailable(variant)

      handlePriceUpdate(variant)
      ctx.emit("variant:update", { currentVariant: { id: variant.id } })
    })
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault()

    const disableAddToCart = optionsNotSelected()

    if (disableAddToCart) {
      return
    }

    submit.disabled = true

    const formData = new FormData(form)
    const id = formData.get("id")
    const quantity = formData.get("quantity")

    if (state[id] && state[id].inCart) {
      submit.innerHTML = `<span>${removing}</span>`

      removeItem(id).then(() => {
        state[id].inCart = false
        changeAvailable(state[id])
      })

      return
    }

    submit.innerHTML = `<span>${adding}</span>`

    addItemById(id, quantity)
      .then(() => {
        submit.innerHTML = `<span>${added}</span>`

        state[id].inCart = true

        setTimeout(() => {
          submit.innerHTML = `<span>${remove}</span>`
        }, 1000)
      })
      .catch((e) => {
        console.error(e)
        submit.innerHTML = `<span>${addToCart}</span>`
      })
      .finally(() => {
        submit.disabled = false
      })
  })
})
