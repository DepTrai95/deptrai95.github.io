const DarkMode = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function() {
    this.storageKey = 'theme-preference';
    this.toggleSwitch = document.querySelector('#theme-toggle');
    this.value = null;
  },

  /**
   * Binds all events.
   * @function _bindEvents
   * @private
   */
  _bindEvents: function () {
    DarkMode._getColorPreference();

    window.onload = () => {
      // set on load so screen readers can get the latest value on the button
      DarkMode._reflectPreference();
      // now this script can find and listen for clicks on the control
      DarkMode.toggleSwitch.addEventListener('click', function(){
        DarkMode._themeToggler();
      });
    };
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
      DarkMode.value = isDark ? 'dark' : 'light';
      DarkMode._setPreference();
    });
  },

  /**
   * Gets the color preference from localstorage
   * @function _getColorPreference
   * @private
   */
  _getColorPreference: function() {
    if (localStorage.getItem(DarkMode.storageKey))
      return localStorage.getItem(DarkMode.storageKey);
    else 
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  /**
   * set the user's preference in local storage
   * @function _setPreference
   * @private
   */
  _setPreference: function() {
    localStorage.setItem(DarkMode.storageKey, DarkMode.value);
    DarkMode._reflectPreference();
  },

  /**
   * modify the document with the preferences
   * @function _reflectPreference
   * @private
   */
  _reflectPreference: function() {
    DarkMode.value = localStorage.getItem(DarkMode.storageKey);
    document.firstElementChild.setAttribute('data-theme', DarkMode.value); 
    DarkMode.toggleSwitch?.setAttribute('aria-label', DarkMode.value);
  },

  /**
   * modify the document with the preferences
   * @function _themeToggler
   * @private
   */
  _themeToggler: function() {
    DarkMode.value = DarkMode.value === 'light' ? 'dark' : 'light';
    DarkMode._setPreference();
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    DarkMode._cacheElements();
    DarkMode._bindEvents();
    //initial setting
  }
};

export const DarkModePublic = {
  init: DarkMode.init
}
