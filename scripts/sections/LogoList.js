import { component } from "picoapp"
import Swiper, { Navigation, Pagination } from "swiper/core"

Swiper.use([Navigation, Pagination])

export default component((node) => {
  const container = node.querySelector("[data-slider='container']")
  if (!container) {
    return
  }

  const slidesCount = container.querySelectorAll(".LogoList__Item").length

  if (slidesCount < 4) {
    return
  }

  const options = {
    slideClass: "LogoList__Item",
    wrapperClass: "LogoList__Wrapper",
    pagination: {
      el: ".LogoList__Pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".LogoList__Navigation--next",
      prevEl: ".LogoList__Navigation--previous",
    },
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      480: {
        spaceBetween: 40,
        slidesPerView: 3,
      },

      768: {
        spaceBetween: 60,
        slidesPerView: 4,
      },

      940: {
        spaceBetween: 40,
        slidesPerView: 6,
      },

      1440: {
        spaceBetween: 60,
        slidesPerView: 6,
      },
    },
  }

  const slider = new Swiper(container, options)
})
