const Stage = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function() {
    this.stageSlider = document.querySelector('.stage-slider');
    this.stageSlideItems = Stage.stageSlider.querySelectorAll('.stage-item');
    this.stagePagination = Stage.stageSlider.querySelector('.swiper-pagination');
    this.pauseButton = Stage.stageSlider.querySelector('.btn-pause');
    this.playButton = Stage.stageSlider.querySelector('.btn-play');

    this.slider = null;
    this.sliderDelay = parseInt(getComputedStyle(document.body).getPropertyValue('--slide-delay'));
  },

  /**
   * Binds all events.
   * @function _bindEvents
   * @private
   */
  _bindEvents: function () {
    Stage._initStartStopObserver();

    Stage.pauseButton.addEventListener('click', function(){
      Stage._stopAutoplay();
    })

    Stage.playButton.addEventListener('click', function(){
      Stage._startAutoplay();
    })
  },

  /**
   * Loads the slider library and initializes it as soon as it is loaded.
   * @function _initSlider
   * @private
   */
  _initSlider: async function() {
    await import('/assets/js/libs/swiper/swiper-bundle.min.js').then(() => {
      Stage.slider = new Swiper('.stage-slider', {
        direction: 'horizontal',
        loop: true,
        autoHeight: false,
        spaceBetween: 30,
        speed: 700,
        autoplay: {
          delay: Stage.sliderDelay,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      });
    });
  },

  /**
   * Adds the slide's headline to their respective pagination bullet
   * @function _addPaginationHeadlines
   * @private
   */
  _addPaginationHeadlines: function() {
    const paginationBullets = Stage.stageSlider.querySelectorAll('.swiper-pagination-bullet');

    for (let i = 0; i < paginationBullets.length; i++) {
      const bulletDescription = document.createElement('span');
      bulletDescription.classList.add('slide-description');
      bulletDescription.innerHTML = Stage.stageSlideItems[i].querySelector('.stage-headline').innerText;
      paginationBullets[i].appendChild(bulletDescription);
    }
  },

  /**
   * Pauses the slider when leaving the viewport.
   * @function _initStartStopObserver
   * @private
   */
  _initStartStopObserver: function() {
    const thresholds = [0.1, 0.3, 0.5, 0.7, 0.9];

    const handleSliderIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.5) {
          Stage._startAutoplay();
        } else {
          Stage._stopAutoplay();
        }
      });
    };

    const observer = new IntersectionObserver(handleSliderIntersection, {
      threshold: thresholds
    });
    observer.observe(document.querySelector('.stage-container--gradient'));
  },

  /**
   * Pauses the slider.
   * @function _stopAutoplay
   * @private
   */
  _stopAutoplay: function () {
    Stage.slider.autoplay.stop();
    Stage.pauseButton.classList.add('hidden');
    Stage.playButton.classList.remove('hidden');
    Stage.stagePagination.classList.add('swiper-pagination-paused');
  },

  /**
   * Starts the slider.
   * @function _startAutoplay
   * @private
   */
  _startAutoplay: function () {
    Stage.slider.autoplay.start();
    Stage.pauseButton.classList.remove('hidden');
    Stage.playButton.classList.add('hidden');
    Stage.stagePagination.classList.remove('swiper-pagination-paused');

    let activeSlider = document.querySelector('.swiper-pagination-bullet-active');

    if (activeSlider) {
      activeSlider.classList.remove('swiper-pagination-bullet-active');

      setTimeout(function() {
        activeSlider.classList.add('swiper-pagination-bullet-active');
      }, 100);
    }
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    if (document.querySelector('.stage-slider')) {
      Stage._cacheElements();
      Stage._initSlider().then(() => {
        Stage._addPaginationHeadlines();
        Stage._bindEvents();
      })
    }
  }
};

export const StagePublic = {
  init: Stage.init
}
