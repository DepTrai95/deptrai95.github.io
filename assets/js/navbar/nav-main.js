const NavMain = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.navMain = document.querySelector('.nav-main')
    this.navLayer = document.querySelectorAll('.nav-layer');
    this.navigationBackButton = document.querySelectorAll('.nav-layer-close');
    this.desktopBreakpoint = window.matchMedia('(min-width: 1280px)');

    this.layer = 1; //for _addClassToNavElements()
    this.layerName = 1 //for _generateBackButtonLabels()
  },

  /**
   * Binds all events.
   * @function _bindEvents
   * @private
   */
  _bindEvents: function () {
    NavMain.navLayer.forEach((navLayer) => {
      navLayer.querySelectorAll(':scope > ul > li').forEach((listItem) => {
        if (listItem.querySelector('.nav-layer')) { //if current list-item has a ul as child
          listItem.querySelector('.nav-layer-toggle').addEventListener('click', (event) => {
            event.stopPropagation();

            NavMain._openNavigationItem(listItem);
          });
        }
      });
    });

    NavMain.navigationBackButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();

        NavMain._openPreviousLayer(button);
      });
    });

    //Desktop Navigation
    document.querySelectorAll('.nav-layer__1--item').forEach((navItem) => {
      if (NavMain.desktopBreakpoint.matches && navItem.querySelector('.nav-layer-toggle')) {
        navItem.querySelector('.nav-layer-toggle').addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          NavMain.navMain.querySelectorAll('.nav-layer__1--item').forEach((navLayer) => {
            NavMain._closeNavigationItem(navLayer);
          });

          NavMain._openNavigationDesktop(navItem);

          if (navItem.querySelector('.nav-layer__2--item')) {
            NavMain._openNavigationItem(navItem.querySelector('.nav-layer__2--item'));
          }
        });
      }
    });

    document.querySelectorAll('.nav-layer__2--item').forEach((navListItem) => {
      const toggle = navListItem.querySelector('.nav-layer-toggle');

      if (!toggle) {
        return;
      }

      toggle.addEventListener('click', (event) => {
        event.stopPropagation();

        toggle.closest('.nav-layer').querySelectorAll('.nav-layer__2--item').forEach((item) => {
          NavMain._closeNavigationItem(item);
        });

        NavMain._openNavigationItem(navListItem);
      });
    });

    window.addEventListener('resize:smart', () => {
      document.documentElement.classList.remove('backdrop--visible');

      document.querySelectorAll('.nav-layer__1--active').forEach((item) => {
        item.classList.remove('nav-layer__1--active')
      });

      NavMain._closeNavigationLayers();
    });

    document.body.addEventListener('click', () => {
      document.documentElement.classList.remove('backdrop--visible');

      document.querySelectorAll('.nav-layer__1--item').forEach((item) => {
        NavMain._closeNavigationItem(item);
      });
    });
  },

  /**
   * adds initial classes 'nav-layer__number--item' to all list items
   * @function _addClassToNavElements
   * @private
   */
  _addClassToNavElements: function() {
    const currentLayer = document.querySelectorAll('.nav-layer__' + NavMain.layer + '> ul');

    if (currentLayer.length >= 1) {
      currentLayer.forEach(layer => {
        layer.querySelectorAll(':scope > li').forEach((listItem) => {
          listItem.classList.add('nav-layer__' + NavMain.layer + '--item');
        });
      });
    }

    currentLayer.forEach((item) => {
      item.querySelectorAll('.nav-layer__' + (NavMain.layer + 1)).forEach(() => {
        NavMain.layer++;
        NavMain._addClassToNavElements();
      });
    });
  },

  /**
   * opens the previous Layer
   * @function _openPreviousLayer
   * @private
   * @param currentButton
   */
  _openPreviousLayer: function(currentButton) {
    currentButton.closest('.nav-layer').classList.remove('layer--opened', 'current-layer');
    currentButton.closest('.nav-layer').setAttribute('aria-hidden', 'true');
    currentButton.closest('.nav-layer').previousElementSibling.setAttribute('aria-expanded', 'false');
  },

  /**
   * updates the name of the "back"-button on layer 3 and higher
   * @function _generateBackButtonLabels
   * @private
   */
  _generateBackButtonLabels: function() {
    document.querySelectorAll('.nav-layer__' + NavMain.layerName + '--item').forEach((listItem) => {
      if (listItem.querySelector('.nav-layer')) {
        listItem.querySelector('.nav-layer-header .nav-layer-toggle__text').textContent = listItem.querySelector('a').textContent;

        if (NavMain.layerName >= 2) {
          listItem.querySelector('.nav-layer-close .nav-layer-toggle__text').textContent = listItem.closest('.nav-layer').querySelector('.nav-layer-header .nav-layer-toggle__text').textContent;
        }
      }
    });

    NavMain.layerName++;

    if (document.querySelectorAll('.nav-layer__' + NavMain.layerName + '--item').length > 0) {
      NavMain._generateBackButtonLabels();
    }
  },

  /**
   * resets all aria-attributes and closes nav-layers
   * @function _closeNavigationDesktop
   * @private
   * @param {HTMLElement} navListItem
   */
  _openNavigationItem: function(navListItem) {
    const layer = navListItem.querySelector('.nav-layer');
    const toggle = navListItem.querySelector('.nav-layer-toggle');

    if (!layer || !toggle) {
      return
    }

    toggle.setAttribute('aria-expanded', 'true');
    layer.setAttribute('aria-hidden', 'false');
    navListItem.classList.add('layer--opened');

    if (NavMain.desktopBreakpoint.matches && navListItem.classList.contains('nav-layer__2--item')) {
      NavMain._calculateNavHeight(navListItem);
    }
  },

  _calculateNavHeight: function(navListItem) {
    const navLayer2 = navListItem.closest('.nav-layer__2');
    const navLayer3 = navListItem.querySelector('.nav-layer__3');

    if (!navLayer3) {
      return;
    }

    navLayer2.style.minHeight = '0px';

    if (navLayer3.querySelector('ul').getBoundingClientRect().height > navLayer2.getBoundingClientRect().height) {
      navLayer2.style.minHeight = `${navLayer3.getBoundingClientRect().height}px`;
    }
  },

  /**
   * resets all aria-attributes and closes nav-layers
   * @function _closeNavigationDesktop
   * @private
   * @param {HTMLElement} navListItem
   */
  _closeNavigationItem: function(navListItem) {
    const layer = navListItem.querySelector('.nav-layer');
    const toggle = navListItem.querySelector('.nav-layer-toggle');

    if (!layer || !toggle) {
      return
    }

    toggle.setAttribute('aria-expanded', 'false');
    layer.setAttribute('aria-hidden', 'true');
    navListItem.classList.remove('layer--opened');
  },

  /**
   * opens the target-layer/menu
   * @function _openNavigationDesktop
   * @private
   * @param {HTMLElement} navListItem
   */
  _openNavigationDesktop: function(navListItem) {
    if (!NavMain.desktopBreakpoint.matches || !navListItem) {
      return
    }

    const toggle = navListItem.querySelector('.nav-layer-toggle');
    const layer = navListItem.querySelector('.nav-layer');

    if (!toggle || !layer) {
      return;
    }

    document.documentElement.classList.add('backdrop--visible');

    NavMain._openNavigationItem(navListItem);

    const currentLayer2Item = navListItem.querySelector('.nav-layer__2--item');

    if (!currentLayer2Item) {
      return;
    }

    const layer3 = currentLayer2Item.querySelectorAll('.nav-layer__3--item');
    const layer4 = currentLayer2Item.querySelectorAll('.nav-layer__4--item');

    layer3.forEach((layer3Item) => {
      NavMain._openNavigationItem(layer3Item);
    });

    layer4.forEach((layer4Item) => {
      NavMain._openNavigationItem(layer4Item);
    });
  },

  /**
   * sets the aria-attributes
   * @function _setAriaAttributes
   * @private
   */
  _setAriaAttributes: function() {
    document.querySelectorAll('.nav-layer').forEach((layer, counter) => {
      const uniqueId = layer.parentElement.className.replace('--item', '') +  '-' + new Date().getTime() + '-' + counter;
      const navToggle = layer.previousElementSibling;

      if (navToggle) {
        navToggle.classList.add('nav-layer-toggle');
        navToggle.setAttribute('id', uniqueId + '-toggle');
        navToggle.setAttribute('aria-controls', uniqueId + '-layer');
        navToggle.setAttribute('aria-haspopup', 'true');
        navToggle.setAttribute('aria-expanded', 'false');

        layer.setAttribute('id', uniqueId + '-layer');
        layer.setAttribute('aria-labelledby', uniqueId + '-toggle');
        layer.setAttribute('aria-hidden', 'true');
      }
    });
  },

  /**
   * Closes all opened navigation layers.
   * @function _closeNavigationLayers
   * @private
   */
  _closeNavigationLayers: function() {
    document.querySelectorAll('.nav-layer-toggle').forEach((layerToggle) => {
      const listItem = layerToggle.closest('li');
      const openedLayer = listItem.querySelector('.layer--opened');

      if (openedLayer) {
        openedLayer.setAttribute('aria-hidden', 'true');
        openedLayer.classList.remove('layer--opened', 'current-layer');
      }
    });
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    NavMain._cacheElements();
    NavMain._addClassToNavElements();
    NavMain._generateBackButtonLabels();
    NavMain._setAriaAttributes();
    NavMain._bindEvents();
  }
};

export const NavMainPublic = {
  init: NavMain.init
}
