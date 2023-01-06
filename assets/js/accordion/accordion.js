import Handorgel from '/assets/js/libs/handorgel/handorgel.min.js';

const Accordion = {

  accordionOptions: {
    // whether multiple folds can be opened at once
    multiSelectable: true,
    // whether the folds are collapsible
    collapsible: true,

    // whether ARIA attributes are enabled
    ariaEnabled: true,
    // whether W3C keyboard shortcuts are enabled
    keyboardInteraction: true,
    // whether to loop header focus (sets focus back to first/last header when end/start reached)
    carouselFocus: false,

    // attribute for the header or content to open folds at initialization
    initialOpenAttribute: 'data-open',
    // whether to use transition at initial open
    initialOpenTransition: false,
    // delay used to show initial transition
    initialOpenTransitionDelay: 200,

    // header/content class if fold is open
    headerOpenClass: 'handorgel__header--open',
    contentOpenClass: 'handorgel__content--open',

    // header/content class if fold has been opened (transition finished)
    headerOpenedClass: 'handorgel__header--opened',
    contentOpenedClass: 'handorgel__content--opened',

    // header/content class if fold has been focused
    headerFocusClass: 'handorgel__header--focus',
    contentFocusClass: 'handorgel__content--focus',

    // header/content class if fold is disabled
    headerDisabledClass: 'handorgel__header--disabled',
    contentDisabledClass: 'handorgel__content--disabled',
  },

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.accordion = document.querySelectorAll('.handorgel');
  },

  /**
   * Initiates the library
   * @function _initLib
   * @private
   */
  _initLib: function () {
    Accordion.accordion.forEach((accordionGroup) => {
      new Handorgel(accordionGroup, Accordion.accordionOptions);
    });
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    if (document.querySelector('.handorgel')) {
      Accordion._cacheElements();
      Accordion._initLib();
    }
  }
};

export const AccordionPublic = {
  init: Accordion.init
}
