const TeaserSlider = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.sliderInstance = null;
    this.teaserSliderContainer = document.querySelector('.teaser-slider-container');
    this.phoneBreakpoint = window.matchMedia('(max-width: 599px)');
  },

  /**
   * Binds all events.
   * @function _bindEvents
   * @private
   */
  _bindEvents: function () {
    window.addEventListener('resize:smart', (event) => {
      TeaserSlider._sliderInitHandling();
    });
  },

  /**
   * Destroys the slider when viewport < 600px.
   * @function _swiperHandling
   * @private
   */
  _sliderInitHandling: function() {
    if (TeaserSlider.phoneBreakpoint.matches) {
      if (TeaserSlider.sliderInstance) {
        TeaserSlider.sliderInstance.destroy(false, true);
      }
    } else  {
      TeaserSlider._initSlider();
    }
  },

  /**
   * Loads the slider library and initializes it as soon as it is loaded.
   * @function _initSlider
   * @private
   */
  _initSlider: async function() {
    // init swiper library
    await import('/assets/js/libs/swiper/swiper-bundle.min.js').then(() => {
      TeaserSlider.sliderInstance = new Swiper('.teaser-slider-container', {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 30,
        speed: 700,
        autoplay: false,
        navigation: {
          nextEl: ".teaser-slider-container .swiper-button-next",
          prevEl: ".teaser-slider-container .swiper-button-prev",
        },
        // Responsive breakpoints
        breakpoints: {
          600: {
            slidesPerView: 1.5
          },
          900: {
            slidesPerView: 2.5
          },
        }
      });
    });
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    TeaserSlider._cacheElements();

    if (TeaserSlider.teaserSliderContainer) {
      TeaserSlider._sliderInitHandling();
      TeaserSlider._bindEvents();
    }
  }
};

export const TeaserSliderPublic = {
  init: TeaserSlider.init
}
