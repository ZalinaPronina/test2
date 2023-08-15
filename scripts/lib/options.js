import radio from "theme/theme1/scripts/lib/radio"

export default function productSelection(node, opts) {
  opts = {
    select: "[data-option-select]",
    radio: "[data-option-radio]",
    main: "[data-option-main]",
    ...opts,
  }
  const listeners = []

  const state = {
    id: null,
    options: [],
  }

  const selects = node.querySelectorAll(opts.select)
  const radios = node.querySelectorAll(opts.radio)
  const main = node.querySelector(opts.main)
  if (!main || (main.length && !main.length))
    throw new Error("data-option-main is missing")
  if (radios.length > 3)
    throw new Error("you have more than three radio groups")
  if (selects.length > 3)
    throw new Error("you have more than three select inputs")

  const variants = [].slice.call(main.children).reduce((options, child) => {
    options[child.innerHTML] = child.value
    return options
  }, {})

  function updateSelection() {
    state.id = variants[state.options.join(" / ")]
    main.value = state.id
    listeners.forEach((fn) => fn(state))
  }

  selects.forEach((select) => {
    if (select.nodeName !== "SELECT")
      throw new Error(
        "data-option-select should be defined on the individual option selectors"
      )

    const index = parseInt(select.getAttribute("data-index"), 10)

    // set initial value
    state.options[index] = select.value

    select.addEventListener("change", (e) => {
      state.options[index] = e.target.value
      updateSelection()
    })
  })

  radios.forEach((optionRadio) => {
    if (optionRadio.nodeName === "INPUT")
      throw new Error(
        "data-option-radio should be defined on a parent of the radio group, not the inputs themselves"
      )

    const index = parseInt(optionRadio.getAttribute("data-index"), 10)
    const inputs = [].slice.call(optionRadio.getElementsByTagName("input"))
    const selectedValue = optionRadio.querySelector("[data-selected-value]")

    // set initial value
    inputs.forEach((input) => {
      if (input.checked) state.options[index] = input.value
    })

    radio(inputs, (value) => {
      state.options[index] = value

      if (selectedValue) {
        const span = selectedValue.querySelector("span")
        selectedValue.style.setProperty("--selected-value", value.toLowerCase())
        span && (span.innerText = value)
      }

      updateSelection()
    })
  })

  updateSelection()

  return {
    get state() {
      return state
    },
    onUpdate(fn) {
      listeners.indexOf(fn) < 0 && listeners.push(fn)
      return () => listeners.splice(listeners.indexOf(fn), 1)
    },
  }
}
