import { component } from "picoapp"
import Swiper, { Navigation, Thumbs } from "swiper/core"

Swiper.use([Navigation, Thumbs])

export default component(() => {
  const galleryThumbs = new Swiper("[data-gallery='thumbs']", {
    wrapperClass: "GalleryThumbs__Wrapper",
    slideClass: "GalleryThumbs__Slide",
    threshold: 10,
    spaceBetween: 20,
    preventInteractionOnTransition: false,
    slideToClickedSlide: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slidesPerView: 3,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: ".GalleryThumbs__Button--next",
      prevEl: ".GalleryThumbs__Button--previous",
    },
  })

  const galleryMain = new Swiper("[data-gallery='main']", {
    wrapperClass: "GalleryMain__Wrapper",
    slideClass: "GalleryMain__Slide",
    preventInteractionOnTransition: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        spaceBetween: 20,
      },
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  })
})
