import { component } from "picoapp"

export default component((node, ctx) => {
  const cartCounts = node.querySelectorAll("[data-cart-count]")

  ctx.on("cart:updated", (state) => {
    cartCounts.forEach((count) => {
      count.innerHTML = state.cart.item_count

      if (state.cart.item_count === 0) {
        count.style.display = "none"
      } else {
        count.style.display = ""
      }
    })
  })

  // Hide header on scroll page
  let lastScrollTop = 0
  window.onscroll = () => {
    const { scrollTop } = document.documentElement

    if (scrollTop > 150) {
      node.classList.add("announcement-remove")
    } else if (scrollTop < 100) {
      node.classList.remove("announcement-remove")
    }

    if (scrollTop > lastScrollTop && scrollTop > 150) {
      node.classList.add("header-remove")
    } else if (!document.body.classList.contains("overflow-hidden")) {
      node.classList.remove("header-remove")
    }

    lastScrollTop = scrollTop
  }
})
