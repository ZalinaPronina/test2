import app from "theme/theme1/scripts/app"

export function fetchCart() {
  const queue = [
    fetch(
      `${window.Shopify.routes.root}cart.js?no-cache=${new Date().getTime()}`
    ),
    fetch(
      `${
        window.Shopify.routes.root
      }cart?view=data&no-cache=${new Date().getTime()}`
    ),
  ]

  return Promise.all(queue)
    .then((results) => Promise.all(results.map((res) => res.json())))
    .then(([cart, extra]) => {
      const items = cart.items.map((item) => {
        const match = extra.items.find(
          (extraItem) => extraItem.key === item.key
        )

        if (!match) {
          return item
        }

        return {
          ...item,
          ...match,
        }
      })
      cart.item_count = extra.item_count
      return {
        ...cart,
        items,
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

export function addItemById(id, quantity) {
  return fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, quantity }),
  })
    .then((res) => res.json())
    .then((item) => {
      if (item.message) {
        throw new Error(item.message)
      }

      fetchCart().then((cart) => {
        app.emit("cart:updated", { cart })
        return { item, cart }
      })
    })
}

export function addItems(data) {
  return fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((items) => {
      if (items.message) {
        throw new Error(items.message)
      }

      fetchCart().then((cart) => {
        app.emit("cart:updated", { cart })
        return { items, cart }
      })
    })
}

export function updateCart(data = { updates: {}, note: "", attributes: {} }) {
  return fetch(`${window.Shopify.routes.root}cart/update.js`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((cart) => {
      app.emit("cart:updated", { cart })
    })
}

function changeItem(line, quantity, properties) {
  const data = {
    line,
    quantity,
  }

  if (properties) {
    data.properties = properties
  }

  return fetch(`${window.Shopify.routes.root}cart/change.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      fetchCart().then((cart) => {
        app.emit("cart:updated", { cart })
        return cart
      })
    })
}

export function addVariant(variant, quantity) {
  const numAvailable =
    variant.inventory_policy === "deny" &&
    variant.inventory_management === "shopify"
      ? variant.inventory_quantity
      : null

  return fetchCart().then(({ items }) => {
    const existing = items.filter((item) => item.id === variant.id)[0] || {}
    const numRequested = (existing.quantity || 0) + quantity

    if (numAvailable !== null && numRequested > numAvailable) {
      throw new Error(
        `There are only ${numAvailable} of that product available, requested ${numRequested}.`
      )
    } else {
      return addItemById(variant.id, quantity)
    }
  })
}

export function updateItem(id, quantity, properties) {
  return fetchCart().then(({ items }) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].variant_id === parseInt(id, 10)) {
        return changeItem(i + 1, quantity, properties)
      }
    }

    return null
  })
}

export function removeItem(id) {
  return updateItem(id, 0)
}

export function clearCart() {
  return fetch(`${window.Shopify.routes.root}cart/clear.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((d) => app.emit("cart:updated", { cart: d }))
}
