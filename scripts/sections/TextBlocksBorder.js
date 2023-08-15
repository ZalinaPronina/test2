import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])
export default component((node) => {
  const container = node.querySelector("[data-text-block='container']")
  const count = container.getAttribute("data-slider-count")
  const options = {
    slideClass: "TextBlocks_Slide",
    wrapperClass: "TextBlocks__Wrapper",
    pagination: {
      el: ".TextBlocks__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      1000: {
        slidesPerView: Number(count),
        spaceBetween: 30,
      },
      700: {
        slidesPerView: Number(count) - 1,
        spaceBetween: 30,
      },
    },
  }
  const slider = new Swiper(container, options)
})
