import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-slider='container']")

  if (!container) {
    return false
  }

  const options = {
    slideClass: "MetricsGrid__Item",
    wrapperClass: "MetricsGrid__Wrapper",
    pagination: {
      el: ".MetricsGrid__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 100,
    autoHeight: true,
  }

  let init
  let slider

  const swiperMode = () => {
    if (window.matchMedia("(max-width: 939px)").matches) {
      if (!init) {
        init = true
        slider = new Swiper(container, options)
      }
    } else if (init) {
      slider.destroy()
      init = false
    }
  }

  swiperMode()

  window.addEventListener("resize", swiperMode)

  return () => window.removeEventListener("resize", swiperMode)
})
