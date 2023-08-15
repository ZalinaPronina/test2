import { component } from "picoapp"

import { addItems, clearCart } from "theme/theme1/scripts/lib/cart"
import getProductJson from "theme/theme1/scripts/lib/getProductJson"
import options from "theme/theme1/scripts/lib/options"

export default component((node) => {
  let handle
  let gift = "false"
  const nav = node.querySelector("[data-checkout-process=navigation]")
  const membership = node.querySelector("[data-checkout-process=membership]")
  const giftMembership = node.querySelector("[data-checkout-process=gift]")
  const bundle = node.querySelector("[data-checkout-process=bundle]")
  const bundleId = Date.now()
  if (
    window.location.pathname === "/pages/checkout-process" ||
    window.location.pathname === "/products/new-gps-player-bundle"
  ) {
    handle = "new-gps-player-bundle"
  } else if (
    window.location.pathname === "/pages/checkout-process-player-as-gift"
  ) {
    handle = "new-gps-player-bundle"
    gift = "true"
  }
  if (!handle) {
    return
  }
  const state = {
    activeStepIndex: "1",
    validation: {},
    subscription: {
      variantId: null,
      sellingPlanId: null,
    },
    bundle: {},
  }

  const updateHistoryState = () => {
    if (window.Shopify.designMode) {
      return
    }

    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)
    // searchParams.set("step", state.activeStepIndex)

    url.search = searchParams.toString()

    // window.history.pushState({ step: state.activeStepIndex }, null, url)
  }

  updateHistoryState()

  const changeStep = () => {
    const triggers = nav.querySelectorAll("[data-checkout-process=trigger]")
    const sections = document.querySelectorAll("[data-checkout-process=step]")

    triggers.forEach((trigger) => {
      if (trigger.dataset.index === state.activeStepIndex) {
        trigger.dataset.ui = "active"
      } else {
        trigger.dataset.ui = ""
      }
    })

    sections.forEach((section) => {
      if (section.dataset.index === state.activeStepIndex) {
        section.classList.remove("hidden")
      } else {
        section.classList.add("hidden")
      }
    })
  }

  const updateStep = () => {
    const triggers = nav.querySelectorAll("[data-checkout-process=trigger]")

    triggers.forEach((trigger) => {
      const { index } = trigger.dataset
      const nextTrigger = triggers[index]

      if (state.validation[index]) {
        if (nextTrigger) {
          nextTrigger.disabled = false
        }
      } else if (nextTrigger) {
        nextTrigger.disabled = true
      }
    })

    const submit1 = document.querySelector("[data-checkout-process-next='1']")
    submit1.disabled = state.validation[1] === false

    const submit2 = document.querySelector("[data-checkout-process-next='2']")
    submit2.disabled = Object.values(state.bundle).length === 0
  }

  const nextStep = () => {
    const step = Number(state.activeStepIndex) + 1

    state.activeStepIndex = String(step)
    updateHistoryState()
    changeStep()

    nav.querySelector("#scroll-to-here")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const checkValidation = () => {
    const checkStep = (index) => {
      if (index === 1) {
        const container = gift === "true" ? giftMembership : membership
        const radios = Array.from(
          container.querySelectorAll("input[type=radio]")
        )
        const checkbox = node.querySelector("input[type=checkbox]")

        const radio = radios.find((r) => r.checked === true)

        if (radio && !checkbox) {
          return true
        }

        if (radio && checkbox && checkbox.checked === true) {
          return true
        }
      }

      if (index === 2) {
        if (Object.values(state.bundle).length) {
          return true
        }
      }

      if (index === 3) {
        return true
      }

      return false
    }

    for (let index = 1; index <= 3; index++) {
      if (index > 1) {
        state.validation[index] = checkStep(index - 1) && checkStep(index)
      } else {
        state.validation[index] = checkStep(index)
      }
    }

    updateStep()
  }

  const bundleHydrate = () => {
    const opts = options(bundle)

    getProductJson(handle)

    opts.onUpdate((payload) => {
      getProductJson(handle).then((json) => {
        const variant = json.variants.filter(
          (v) => v.id === parseInt(payload.id, 10)
        )[0]

        if (variant.available) {
          state.bundle[json.id] = variant.id

          checkValidation()

          return
        }

        delete state.bundle[json.id]

        checkValidation()
      })
    })
  }

  const membershipHydrate = () => {
    const setMembership = (element) => {
      const { value } = element
      const { sellingPlanId } = element.dataset

      state.subscription.variantId = value
      state.subscription.sellingPlanId = sellingPlanId
    }

    const container = gift === "true" ? giftMembership : membership
    const selectedMembership = container.querySelector("input:checked")
    if (selectedMembership) {
      setMembership(selectedMembership)
    }

    membership.addEventListener("change", (event) => {
      setMembership(event.target)

      checkValidation()
    })

    node.addEventListener("change", (event) => {
      if (event.target.name === "agree") {
        checkValidation()
      }
    })
  }

  const render = (htmlString) => {
    const html = document.createElement("div")
    html.innerHTML = htmlString

    if (gift === "true") {
      const giftContainer = html.querySelector("[data-checkout-process=gift]")
      giftMembership.innerHTML = giftContainer.innerHTML
      const giftMessage = giftMembership.querySelector(
        "[data-checkout-process=gift-message]"
      )

      if (giftMessage) {
        giftMessage.classList.remove("hidden")
      }

      membership.remove()
    } else {
      const membershipContainer = html.querySelector(
        "[data-checkout-process=membership]"
      )
      membership.innerHTML = membershipContainer.innerHTML

      giftMembership.remove()
    }

    const bundleContainer = html.querySelector("[data-checkout-process=bundle]")
    if (bundle !== null) {
      bundle.innerHTML = bundleContainer.innerHTML
    }

    return Promise.resolve(true)
  }

  const hydrate = () => {
    bundleHydrate()
    membershipHydrate()
    checkValidation()
  }
  if (nav !== undefined) {
    nav.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-checkout-process=trigger]")
      if (trigger) {
        state.activeStepIndex = trigger.dataset.index

        updateHistoryState()
        changeStep()
      }
    })
  }

  node.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-checkout-process-next]")

    if (trigger) {
      nextStep()
    }
  })
  let isButtonClicked = false
  document.addEventListener("click", (event) => {
    const submit = event.target.closest("[data-checkout-process=submit]")
    if (submit && !isButtonClicked) {
      isButtonClicked = true
      const items = []
      const bundleProducts = Object.values(state.bundle)
      const id = localStorage.getItem("productVariantt")
      const sellingId = JSON.parse(localStorage.getItem("sellingId"))
      items.push(
        {
          id: Number(sellingId.Id),
          quantity: 1,
          selling_plan: Number(sellingId.sellingId) || null,
          properties: {
            _Bundle: bundleId,
          },
        },
        {
          id: Number(id),
          quantity: 1,
        }
      )

      if (bundleProducts.length) {
        bundleProducts.forEach((p) => {
          items.push({
            id: p,
            quantity: 1,
            properties: {
              _Bundle: bundleId,
            },
          })
        })
      }

      addItems({ items }).then(
        () => (window.location.href = `${window.Shopify.routes.root}checkout`)
      )
    }
  })

  window.addEventListener("popstate", (event) => {
    if (event?.state?.step) {
      state.activeStepIndex = event.state.step
    }

    changeStep()
  })

  if (window.Shopify.designMode) {
    document.addEventListener("shopify:section:select", (event) => {
      const section = document.querySelector(
        `[data-section-id="${event.detail.sectionId}"]`
      )

      if (section) {
        state.activeStepIndex = section.dataset.index || "1"
      }

      changeStep()
    })
  }

  clearCart()

  fetch(`/products/${handle}?section_id=checkout-process-player`)
    .then((response) => response.text())
    .then(render)
    .then(hydrate)
})
