const Animation = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.header = document.querySelector('header');
    this.navMain = document.querySelectorAll('.nav-main li');
    this.navMeta = document.querySelectorAll('.nav-meta li');
    this.socialMediaIcons = document.querySelectorAll('.footer .social-media-list li');
    this.footerEmail = document.querySelector('.footer-email a');
    //stage-items
    this.stageHeaderH1 = document.querySelector('.stage-wrapper h1');
    this.stageHeaderH2 = document.querySelector('.stage-wrapper h2');
    this.stageHeaderH3 = document.querySelector('.stage-wrapper h3');
    this.stageContent = document.querySelector('.stage-content-part');
    this.stageBackground = document.querySelector('.stage-background-part');
    this.stageImage = document.querySelector('.stage-image-part');
    this.stageButton = document.querySelector('.btn--primary');
    //tablet breakpoint
    this.tabletBreakpoint = window.matchMedia('(min-width: 900px)');
  },

  

  _initAnimation: function() {
    Animation._initStage();

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio) {
          entry.target.classList.add('visible');
          fadeInObserver.unobserve(entry.target);
        }
      });
    });

      const introduction1 = document.querySelector('.text-image h2');
      const introduction2 = document.querySelector('.text-image p');
      const introduction3 = document.querySelector('.text-image .image-container--first');
      const introduction4 = document.querySelector('.text-image .image-container--second');


      if (introduction1 && introduction2) {
        fadeInObserver.observe(introduction1);
        fadeInObserver.observe(introduction2);
        fadeInObserver.observe(introduction3);
        fadeInObserver.observe(introduction4);
      }
  },

  /**
   * Initializes the the animation on the starting page
   * @function init
   * @public
   */
  _initInitialScreen: function() {
    if(Animation.tabletBreakpoint.matches) {

        Animation.navMain.forEach((navLink, index) => {
            setTimeout(() => {
              navLink.classList.add('visible');
            }, 200 * index);
        });

        setTimeout(() => { //wait for nav-main Icons to be animated
            Animation.navMeta.forEach((navMetaIcon, index) => {
                setTimeout(() => {
                  navMetaIcon.classList.add('visible');
                }, 200 * index);
            });
        }, 800);

        Animation.socialMediaIcons.forEach((icon, index) => {
            setTimeout(() => {
              icon.classList.add('visible');
            }, 200 * index);
        });

        setTimeout(() => {
            Animation.footerEmail.classList.add('visible');
        }, 1000);
    };
  },

  /**
   * Initializes the the animation of the stage
   * @function _initStage
   * @public
   */
  _initStage: async function() {
    await Animation._initInitialScreen();
    //After animating nav-items, email and social-media-icons
    setTimeout(() => {
        Animation.stageHeaderH1.classList.add('visible');
    }, 1000);

    setTimeout(() => {
        Animation.stageHeaderH2.classList.add('visible');
    }, 1200);

    setTimeout(() => {
        Animation.stageHeaderH3.classList.add('visible');
    }, 1400);

    setTimeout(() => {
        Animation.stageContent.classList.add('visible');
    }, 2500);

    setTimeout(() => {
        Animation.stageButton.classList.add('visible');
    }, 2500);

    setTimeout(() => {
        Animation.stageBackground.classList.add('visible');
    }, 2500);

    setTimeout(() => {
        Animation.stageImage.classList.add('visible');
    }, 2800);
    
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    Animation._cacheElements();
    Animation._initAnimation();
  }
};

export const AnimationPublic = {
  init: Animation.init
}
