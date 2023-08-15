import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node, ctx) => {
  const main = document.querySelector("#MainContent")

  function handleSetContent(string, href) {
    const html = new DOMParser().parseFromString(string, "text/html")
    const tempMain = html.querySelector("#MainContent")

    main.innerHTML = tempMain.innerHTML
    window.history.replaceState(null, null, href)

    ctx.emit("app:update")
  }

  function handleClick(event) {
    event.preventDefault()

    const link = event.target.closest("a")
    const { href } = link
    const htmlString = ctx.getState().navigation[href]

    if (htmlString) {
      handleSetContent(htmlString, href)
      return
    }

    link.classList.add("cursor-wait")

    fetch(href)
      .then((response) => response.text())
      .then((text) => {
        const { navigation } = ctx.getState()
        navigation[href] = text

        ctx.hydrate({ navigation })

        handleSetContent(text, href)
      })
      .finally(() => {
        link?.classList.remove("cursor-wait")
      })
  }

  node.addEventListener("click", handleClick)

  return () => node.removeEventListener("click", handleClick)
})
