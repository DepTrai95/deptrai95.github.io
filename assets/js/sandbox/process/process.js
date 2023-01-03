const Process = {

  /**
   * Collects necessary elements.
   * @function _cacheElements
   * @private
   */
  _cacheElements: function () {
    this.observerInstance = null;
    this.processElement = document.querySelector('.process');
  },

  /**
   * Animate slider-steps when entering the viewport on desktop devices.
   * @function _visualizeProcessSteps
   * @private
   */
  _visualizeProcessSteps: function () {
    const showSteps = (entries) => {
      entries.forEach(processStepsArea => {
        if (processStepsArea.isIntersecting) {
          const processItem = processStepsArea.target;
          const timePerStep = parseInt(getComputedStyle(processItem).getPropertyValue('--process-step-bar-time')) * 2;

          Process.observerInstance.unobserve(processStepsArea.target);
          processItem.querySelectorAll('.process__step').forEach((step, index) => {
            setTimeout(function() {
              step.classList.add('process__step--visible');
            }, timePerStep * index);
          });
        }
      });
    };

    Process.observerInstance = new IntersectionObserver(showSteps);
    Process.observerInstance.observe(Process.processElement);
  },

  /**
   * Initializes the component.
   * @function init
   * @public
   */
  init: function() {
    if (document.querySelector('.process')) {
      Process._cacheElements();
      Process._visualizeProcessSteps();
    }
  }
};

export const ProcessPublic = {
  init: Process.init
}
