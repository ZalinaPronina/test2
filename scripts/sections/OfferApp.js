import { component } from "picoapp"
import Swiper, { Pagination } from "swiper/core"

Swiper.use([Pagination])

export default component((node) => {
  const container = node.querySelector("[data-offer-app='container']")

  if (!container) {
    return
  }

  const slideCount =
    container.getAttribute("data-slide-count") &&
    parseInt(container.getAttribute("data-slide-count"), 10)
  const slidesPerView = slideCount > 1 ? slideCount : 3

  const options = {
    slideClass: "OfferApp__SliderSlide",
    wrapperClass: "OfferApp__SliderWrapper",
    pagination: {
      el: ".OfferApp__SliderPagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView,
        spaceBetween: 40,
      },
      1280: {
        slidesPerView,
        spaceBetween: 110,
      },
    },
  }

  const slider = new Swiper(container, options)
})
