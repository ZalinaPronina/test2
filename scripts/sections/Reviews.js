import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-reviews='container']")
  const options = {
    slideClass: "Reviews__Slide",
    wrapperClass: "Reviews__Wrapper",
    autoHeight: true,
    pagination: {
      el: ".Reviews__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
  }

  const slider = new Swiper(container, options)
})
