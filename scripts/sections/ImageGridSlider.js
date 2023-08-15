import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-image-block='container']")
  const options = {
    slideClass: "ImageBlocks__Slide",
    wrapperClass: "ImageBlocks__Wrapper",
    pagination: {
      el: ".ImageBlocks__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 0,
  }
  // const slider = new Swiper(container, options)

  let init
  let slider
  const swiperMode = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
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
