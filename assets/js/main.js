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
import { debounce } from './utilities/debounce.js';
import { throttle } from './utilities/throttle.js';
import { triggerEvent } from './utilities/trigger-event.js';

import {HeaderPublic as Header} from './header/header.js';
import {AccordionPublic as Accordion} from './accordion/accordion.js';
import {DarkModePublic as DarkMode} from './darkmode/darkmode.js';
import {LinkPublic as Link} from './link/link.js';


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
  Link.init();
}

init();
