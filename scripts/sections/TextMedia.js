import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-text-media='container']")
  const options = {
    slideClass: "TextMedia__Slide",
    wrapperClass: "TextMedia__Wrapper",
    autoHeight: true,
    pagination: {
      el: ".TextMedia__Pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
  }

  const slider = new Swiper(container, options)
})
