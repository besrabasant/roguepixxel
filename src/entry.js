require('normalize.css');
require('./fonts/stylesheet.css');
require('./scss/app.scss');

import { DomListeners } from "./js/dom-listeners.js";
import { App } from "./js/app.js";
require('./js/google-maps');


// import Pace from 'pace-progress';

// Pace.start({
//     initialRate: 0.03,
//     minTime: 100,
//     maxProgressPerFrame: 1,
//     document: true,
//     ajax: false
// });
// window.onload = function() {
//     Pace.on('done', function() {
//         var loaderbg = document.getElementById('loader-bg');
//         loaderbg.classList.add('loaded');
//         App.init(DomListeners);
//     });
// };

App.init(DomListeners);