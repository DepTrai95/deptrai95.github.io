const Link = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.header = document.querySelector('header');
    this.navMain = Link.header.querySelector('.nav-main').querySelectorAll('a');
  },

  /**
   * Binds all events.
   * @function _bindEvents
   * @private
   */
  _bindEvents: function () {
    Link.navMain.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(() => {
          history.pushState(null, null, ' ');
        }, 10);
      })
    });
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    Link._cacheElements();
    Link._bindEvents();
  }
};

export const LinkPublic = {
  init: Link.init
}
