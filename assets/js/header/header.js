const Header = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.body = document.querySelector('body');
    this.header = document.querySelector("header");
    this.prevScrollPos = window.pageYOffset;
    this.desktopBreakpoint = window.matchMedia('(min-width: 1280px)');

    this.mobileMenuToggle = Header.header.querySelector('.menu-toggle');
    this.mobileMenu = Header.header.querySelector('.nav-main__wrapper');
    this.navLinks = Header.header.querySelectorAll('.nav-layer a');

    this.languageContainers = Header.header.querySelectorAll('.language-container');
    this.languageNavigationToggle = Header.header.querySelector('.nav-language-area .nav-meta__button');
    this.languageListToggleItems = Header.header.querySelectorAll('.nav-language__select');

    this.mobileLanguageList = Header.header.querySelector('.nav-language__layer-mobile');
  },

  /**
   * Binds all events.
   * @function _bindEvents
   * @private
   */
  _bindEvents: function () {
    Header.body.addEventListener('click', () => {
      Header.languageNavigationToggle.setAttribute('aria-expanded', 'false');
      Header.languageContainers.forEach(item => Header._closeLanguageList(item));
    })

    Header.mobileMenuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      Header._toggleMobileMenu();
    });

    Header.languageNavigationToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      Header._showLanguageSelection();
    });

    document.querySelector('.backdrop').addEventListener('click', () => {
      Header._toggleMobileMenu();
    });

    Header.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!Header.desktopBreakpoint.matches) {
          Header._toggleMobileMenu();
        };
      });
    });

    Header.languageListToggleItems.forEach(toggleItem => {
      toggleItem.addEventListener('click', (event) => {
        event.stopPropagation();

        const languageListContainer = toggleItem.closest('.language-container');
        Header._toggleLanguageList(languageListContainer);
      });
    });

    window.addEventListener('scroll:smart', function() {
      if (!document.querySelector('.header--opened')) {
        let currentScrollPos = window.pageYOffset;
        Header._handleHeaderVisibility(currentScrollPos);
      }
    });

    window.addEventListener('resize:smart', function() {
      Header._setNavigationVisibility();
    });
  },

  /**
   * Hide the header when scrolling down
   * @function _handleHeaderVisibility
   * @private
   * @param {Number} currentScrollPos
   */
  _handleHeaderVisibility: function(currentScrollPos) {
    if (currentScrollPos === 0) {
      Header.header.classList.remove('header--hide');
      return;
    }

    if (!document.querySelector('.layer--opened')) {
      if (Header.prevScrollPos > currentScrollPos) {
        Header.header.classList.remove('header--hide');
      } else {
        Header.header.classList.add('header--hide');
      }
      Header.prevScrollPos = currentScrollPos;
    }
  },

  /**
   * Invert header color on top of the page
   * @function _invertHeaderColor
   * @private
   */
  _invertHeaderColor: function() {
    var firstInvertedSection = document.querySelector('.content-area--inverted');

    if (firstInvertedSection && firstInvertedSection.offsetTop === 0) {
      Header.header.classList.add('header--inverted');
    }
  },

  /**
   * Show/hide the languages list
   * @function _toggleLanguageList
   * @private
   * @param {HTMLElement} languageListContainer
   */
  _toggleLanguageList: function(languageListContainer) {
    const languageListToggle = languageListContainer.querySelector('.nav-language__select');
    const languageList = languageListContainer.querySelector('.nav-language__layer');

    if (languageListToggle.getAttribute('aria-expanded') === 'false') {
      languageListToggle.setAttribute('aria-expanded', 'true');
      languageList.setAttribute('aria-hidden', 'false');
    } else {
      Header._closeLanguageList(languageListContainer);
    }
  },

  /**
   * Hide the languages list of the provided language container element
   * @function _toggleLanguageList
   * @private
   * @param {HTMLElement} languageListContainer
   */
  _closeLanguageList: function(languageListContainer) {
    const languageListToggle = languageListContainer.querySelector('.nav-language__select');
    const languageList = languageListContainer.querySelector('.nav-language__layer');

    languageListToggle.setAttribute('aria-expanded', 'false');
    languageList.setAttribute('aria-hidden', 'true');
  },

  /**
   * Show the language select element
   * @function _showLanguageSelection
   * @private
   */
  _showLanguageSelection: function() {
    Header.languageNavigationToggle.setAttribute('aria-expanded', 'true');
  },

  /**
   * handle opening and closing the menu in mobile-version
   * @function _toggleMobileMenu
   * @private
   */
  _toggleMobileMenu: function() {
    if (Header.header.classList.contains('header--opened')) {
      Header.header.classList.remove('header--opened');
      Header.mobileMenuToggle.setAttribute('aria-expanded','false');
      Header.mobileMenu.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('backdrop--visible');
    } else {
      Header.header.classList.add('header--opened');
      Header.mobileMenuToggle.setAttribute('aria-expanded','true');
      Header.mobileMenu.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('backdrop--visible');
    }
  },

  /**
   * Hide or show the mobile navigation from assistive technology depending on the current viewport
   * @function _setNavigationVisibility
   * @private
   */
  _setNavigationVisibility: function() {
    if (Header.desktopBreakpoint.matches) {
      Header.header.classList.remove('header--opened');
      Header.mobileMenu.setAttribute('aria-hidden', 'false');
    } else {
      Header.mobileMenu.setAttribute('aria-hidden', 'true');
    }
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    Header._cacheElements();
    Header._invertHeaderColor();
    Header._setNavigationVisibility();
    Header._bindEvents();
  }
};

export const HeaderPublic = {
  init: Header.init
}
