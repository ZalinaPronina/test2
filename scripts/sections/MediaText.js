import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-slider='container']")
  const options = {
    slideClass: "MediaText__Slide",
    wrapperClass: "MediaText__SliderWrapper",
    pagination: {
      el: ".MediaText__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
  }

  const slider = new Swiper(container, options)
})
