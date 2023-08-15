import { component } from "picoapp"
import Swiper, { EffectCreative, Navigation, Pagination } from "swiper/core"

Swiper.use([EffectCreative, Navigation, Pagination])

export default component((node) => {
  const container = node.querySelector("[data-slider='container']")
  const options = {
    slideClass: "MediaSlider__Item",
    wrapperClass: "MediaSlider__Wrapper",
    navigation: {
      nextEl: ".MediaSlider__Button--next",
      prevEl: ".MediaSlider__Button--previous",
    },
    pagination: {
      el: ".MediaSlider__Pagination",
      type: "bullets",
      clickable: true,
    },
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-120%", 0, -300],
      },
      next: {
        translate: ["120%", 0, -300],
      },
    },
    breakpoints: {
      768: {
        creativeEffect: {
          prev: {
            translate: ["-120%", 0, -350],
          },
          next: {
            translate: ["120%", 0, -350],
          },
        },
      },
    },
    loop: true,
    slidesPerView: 1,
  }

  const slider = new Swiper(container, options)
})
