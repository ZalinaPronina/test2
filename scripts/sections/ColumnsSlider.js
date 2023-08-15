import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-slider='container']")
  const options = {
    slideClass: "ColumnsSlider__Item",
    wrapperClass: "ColumnsSlider__Wrapper",
    pagination: {
      el: ".ColumnsSlider__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 45,
      },
    },
  }

  const slider = new Swiper(container, options)
})
