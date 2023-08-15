import { component } from "picoapp"

import getSection from "theme/theme1/scripts/api/sections"
import { fetchCart, removeItem, updateCart } from "theme/theme1/scripts/lib/cart"

export default component((node, ctx) => {
  const { sectionId } = node.dataset
  const insertableContents = node.querySelectorAll("[data-insertable-content]")

  const handleRemoveOnClick = (id) => {
    fetchCart().then((cart) => {
      const item = cart.items.find((i) => i.id === id)

      if (item.properties?._Bundle) {
        const items = cart.items.filter(
          (i) => i.properties._Bundle === item.properties._Bundle
        )

        return updateCart({
          updates: items.reduce((acc, curr) => {
            acc[curr.id] = 0
            return acc
          }, {}),
        })
      }

      return removeItem(id)
    })
  }

  const handleItemRemove = () => {
    const removeButtons = node.querySelectorAll("[data-remove]")

    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        const id = parseInt(button.dataset.id, 10)

        handleRemoveOnClick(id)
      })
    })
  }

  const insertContent = (str) => {
    const temp = document.createElement("div")
    temp.innerHTML = str

    const contents = temp.querySelectorAll("[data-insertable-content]")
    const isEmpty = contents.length === 0
    if (isEmpty) {
      window.location.href = "/collections/accessories"
      node.innerHTML = temp.innerHTML

      return
    }

    insertableContents.forEach((content, index) => {
      if (contents[index]) {
        content.innerHTML = contents[index].innerHTML
      }
    })

    ctx.emit("images:update")
    ctx.emit("app:update")

    handleItemRemove()
  }

  handleItemRemove()

  const render = () => {
    getSection(window.location.href, sectionId)
      .then((body) => {
        insertContent(body)
      })
      .catch((err) => console.error(err))
  }

  ctx.on("cart:updated", render)

  ctx.on(`section:${sectionId}:loading`, () => {
    node.classList.add("loading")
  })

  ctx.on(`section:${sectionId}:loaded`, () => {
    node.classList.remove("loading")
  })
})
