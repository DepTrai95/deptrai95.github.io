const Counter = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.slider = null;
    this.counterNumber = document.querySelectorAll('.counter-number');
  },

  /**
   * add a comma/dot-separator when number has 4 digits+
   * @function _addNumberDelimiter
   * @private
   * @param numberElement
   */
  _addDelimiter: function(numberElement) {
    if (!isNaN(numberElement.innerHTML))
    numberElement.innerHTML = (+numberElement.innerHTML).toLocaleString(document.documentElement.lang);
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    Counter._cacheElements();

    Counter.counterNumber.forEach((numberElement) => {
      Counter._addDelimiter(numberElement);
    });
  }
};

export const CounterPublic = {
  init: Counter.init
}
