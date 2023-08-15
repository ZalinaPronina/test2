import { component } from "picoapp"

export default component((node) => {
  const countrySelector = node.querySelector("[data-country]")
  const provinceSelector = node.querySelector("[data-province]")
  const provinceSelectorParent = provinceSelector.closest(
    "[data-select-parent]"
  )

  const countryDefault = countrySelector.getAttribute("data-default")
    ? countrySelector.getAttribute("data-default")
    : countrySelector.options[0].value
  const provinceDefault = provinceSelector.getAttribute("data-default")

  function selectOption(value, select) {
    return Array.prototype.slice.call(select.options).filter((option, i) => {
      if (option.value === value) {
        select.selectedIndex = i
        return true
      }
      return false
    })[0]
  }

  function showProvinces(options) {
    const previousValue = provinceSelector.options[0]
      ? provinceSelector.options[0].value
      : false
    const isNewValue = !!(!previousValue || options[0][0] !== previousValue)

    if (isNewValue) {
      provinceSelector.innerHTML = ""

      for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option")
        const [value, name] = options[i]

        option.value = value
        option.innerHTML = name

        provinceSelector.appendChild(option)
      }
    }

    if (provinceDefault.length > 0)
      selectOption(provinceDefault, provinceSelector)

    provinceSelectorParent.style.display = ""
  }

  function hideProvinces() {
    provinceSelector.value = ""
    provinceSelectorParent.style.display = "none"
  }

  function selectDefaults() {
    if (countryDefault.length < 1) return

    const selectedCountry = selectOption(countryDefault, countrySelector)
    const options = selectedCountry
      ? JSON.parse(selectedCountry.getAttribute("data-provinces"))
      : []

    showProvinces(options)
  }

  countrySelector.addEventListener("change", () => {
    const selectedCountry =
      countrySelector.options[countrySelector.selectedIndex]
    const options =
      JSON.parse(selectedCountry.getAttribute("data-provinces")) || []

    if (options.length > 0) {
      showProvinces(options)
    } else {
      hideProvinces()
    }
  })

  selectDefaults()
})
