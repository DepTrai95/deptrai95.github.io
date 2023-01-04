/**
 * Main entry point into all JavaScript.
 * @module main
 * @requires debounce
 * @requires throttle
 * @requires trigger-event
 * @author frontend@webit.de
 */

'use strict';

// Self-written modules
import { debounce } from './_utilities/debounce.js';
import { throttle } from './_utilities/throttle.js';
import { triggerEvent } from './_utilities/trigger-event.js';

import {HeaderPublic as Header} from './header/header.js';
import {AccordionPublic as Accordion} from './accordion/accordion.js';
import {DarkModePublic as DarkMode} from './darkmode/darkmode.js';

// import {NavMainPublic as NavMain} from './navbar/nav-main.js';
// import {StagePublic as Stage} from './stage/stage.js';
// import {ProcessPublic as Process} from './process/process.js';
// import {TeaserSliderPublic as TeaserSlider} from './teaser/teaser-slider.js';
// import {CounterPublic as Counter} from './counter/counter.js';

/**
 * Binds all events to DOM objects.
 * @function _bindEvents
 * @private
 */
function _bindEvents() {
  window.addEventListener('resize',
    debounce(() => triggerEvent(window, 'resize:smart'), 250));
  window.addEventListener('scroll',
    throttle(() => triggerEvent(window, 'scroll:smart'), 250));
}

/**
 * Initiates the module.
 * @function init
 * @public
 */
export function init() {
  _bindEvents();

  Header.init();
  Accordion.init();
  DarkMode.init();
  // NavMain.init();
  // Stage.init();
  // Process.init();
  // TeaserSlider.init();
  // Counter.init();
}

init();
