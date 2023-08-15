import { component } from "picoapp"

export default component((node) => {
  const tabsTriggers = node.querySelectorAll("[data-tab-trigger]")
  const tabs = node.querySelectorAll("[data-tab-handle]")

  const changeActiveTab = (event) => {
    const { tabTrigger } = event.target.dataset

    tabsTriggers.forEach((trigger) => {
      if (tabTrigger === trigger.dataset.tabTrigger) {
        trigger.classList.add("isActive")
      } else {
        trigger.classList.remove("isActive")
      }
    })

    tabs.forEach((tab) => {
      const { tabHandle } = tab.dataset

      if (tabTrigger === tabHandle) {
        tab.classList.remove("hidden")
      } else {
        tab.classList.add("hidden")
      }
    })
  }

  tabsTriggers.forEach((trigger) => {
    trigger.addEventListener("click", changeActiveTab)
  })
})
