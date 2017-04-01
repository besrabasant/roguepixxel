import { TweenMax, TimelineMax } from "gsap";
import { DomListeners } from "./dom-listeners.js";
import { App } from "./app.js";


function detachListeners() {
    DomListeners.detachScrollListeners(App.scrollPage);
    DomListeners.detachSwipeListeners(App.swipePage);
    DomListeners.detachKeyPressListeners(App.onKeyPress);
}

function attachListeners() {
    DomListeners.attachScrollListeners(App.scrollPage);
    DomListeners.attachSwipeListeners(App.swipePage);
    DomListeners.attachKeyPressListeners(App.onKeyPress);
}

var scrollBottomTimeline = new TimelineMax({ paused: true });
var scrollTopTimeline = new TimelineMax({ paused: true });
var scrollHorizontalTimeline = new TimelineMax({ paused: true });

export class Revealer {
    constructor(options = {}) {
        this.revealerLayers = null;
        this.animationDuration = options.animationDuration || 0.3;
        this.animationPreset = Power1;
        this.numOfLayers = options.numOfLayers || 3;
        this.layerColors = options.layerColors || ['#dedede', '#FFFFFF', '#52b43c'];
        this.init();
    }

    init() {
        this.addLayers();
        this.revealerLayers = document.querySelectorAll('.revealer-layer');
        this.initTimeLine();
    }

    addCallback(timeline, scope, callback) {
        switch (timeline) {
            case 'scroll-bottom':
                scrollBottomTimeline.add(function() {
                    callback(scope);
                }, this.animationDuration * 2);
                break;
            case 'scroll-top':
                scrollTopTimeline.add(function() {
                    callback(scope);
                }, this.animationDuration * 2);
                break;
            default:
                break;
        }
    }

    addCompleteCallback(timeline, scope, callback) {
        switch (timeline) {
            case 'scroll-bottom':
                scrollBottomTimeline.add(function() {
                    callback(scope);
                }, this.animationDuration * 2.8);
                break;
            case 'scroll-top':
                scrollTopTimeline.add(function() {
                    callback(scope);
                }, this.animationDuration * 2.8);
                break;
            default:
                break;
        }
    }

    addLayers() {
        var revealerWrapper = document.createElement('div');
        revealerWrapper.classList.add('revealer-wrapper');

        for (var i = 0; i < this.numOfLayers; i++) {
            var revealerLayer = document.createElement('div');
            revealerLayer.classList.add('revealer-layer');
            revealerLayer.setAttribute('style', 'background-color:' + this.layerColors[i] + '; z-index:100' + (i + 1) + ';');
            revealerWrapper.appendChild(revealerLayer);
        }
        document.body.appendChild(revealerWrapper);
    }

    initTimeLine() {
        var layers = this.revealerLayers;

        this.initScrollBottomTimeLine(layers);
        this.initScrollTopTimeLine(layers);
        this.initscrollHorizontalTimeline(layers);
    }

    initScrollBottomTimeLine(layers) {

        scrollBottomTimeline
            .fromTo(
                layers[0],
                this.animationDuration, { left: '0', top: "100vh" }, {
                    left: '0',
                    top: "0vh",
                    ease: this.animationPreset.easeIn,
                    onStart: function() {
                        detachListeners();
                    }
                })
            .fromTo(
                layers[1],
                this.animationDuration, { left: '0', top: "100vh" }, {
                    left: '0',
                    top: "0vh",
                    ease: this.animationPreset.easeIn,
                }, this.animationDuration * 0.9
            )
            .fromTo(
                layers[2],
                (this.animationDuration * 2), { left: '0', top: "100vh" }, {
                    left: '0',
                    top: "-100vh",
                    ease: this.animationPreset.easeInOut,
                    onComplete: function() {
                        layers[2].style.bottom = "";
                    }
                }, (this.animationDuration * 2) * 0.8
            )
            .to(
                layers[1],
                this.animationDuration, {
                    top: "-100vh",
                    ease: this.animationPreset.easeOut,
                    onComplete: function() {
                        layers[1].style.bottom = "";
                    }
                }, (this.animationDuration * 3)
            )
            .to(
                layers[0],
                this.animationDuration, {
                    top: "-100vh",
                    ease: this.animationPreset.easeOut,
                    onComplete: function() {
                        layers[0].style.bottom = "";
                        attachListeners();
                    }
                }, (this.animationDuration * 4) * 0.9
            );

    }

    initScrollTopTimeLine(layers) {

        scrollTopTimeline
            .fromTo(
                layers[0],
                this.animationDuration, { left: '0', top: "-100vh" }, {
                    left: '0',
                    top: "0vh",
                    ease: this.animationPreset.easeIn,
                    onStart: function() {
                        detachListeners();
                    }
                })
            .fromTo(
                layers[1],
                this.animationDuration, { left: '0', top: "-100vh" }, {
                    left: '0',
                    top: "0vh",
                    ease: this.animationPreset.easeIn,
                }, this.animationDuration * 0.9
            )
            .fromTo(
                layers[2],
                (this.animationDuration * 2), { left: '0', top: "-100vh" }, {
                    left: '0',
                    top: "100vh",
                    ease: this.animationPreset.easeInOut,
                    onComplete: function() {
                        layers[2].style.bottom = "";
                    }
                }, (this.animationDuration * 2) * 0.8
            )
            .to(
                layers[1],
                this.animationDuration, {
                    top: "100vh",
                    ease: this.animationPreset.easeOut,
                    onComplete: function() {
                        layers[1].style.bottom = "";
                    }
                }, (this.animationDuration * 3)
            )
            .to(
                layers[0],
                this.animationDuration, {
                    top: "100vh",
                    ease: this.animationPreset.easeOut,
                    onComplete: function() {
                        layers[0].style.bottom = "";
                        attachListeners();
                    }
                }, (this.animationDuration * 4) * 0.9
            );

    }

    initscrollHorizontalTimeline(layers) {
        var duration = this.animationDuration + 0.05;

        scrollHorizontalTimeline
            .fromTo(
                layers[0],
                duration, { top: '0', left: "-100vw" }, {
                    top: '0',
                    left: "0vw",
                    ease: this.animationPreset.easeIn,
                    onStart: function() {
                        detachListeners();
                    }
                })
            .fromTo(
                layers[1],
                duration, { top: "0", left: '-100vw' }, {
                    top: "0",
                    left: "0vw",
                    ease: this.animationPreset.easeIn,
                }, duration * 0.9)
            .fromTo(
                layers[2],
                (duration * 2), { top: "0", left: '-100vw' }, {
                    top: "0",
                    left: "100vw",
                    ease: this.animationPreset.easeInOut,
                    onComplete: function() {
                        layers[2].style.bottom = "";
                    }
                }, (duration) * 0.8
            )
            .to(
                layers[1],
                duration, {
                    left: "100vw",
                    ease: this.animationPreset.easeOut,
                    onComplete: function() {
                        layers[1].style.bottom = "";
                    }
                }, (duration * 3)
            )
            .to(
                layers[0],
                duration, {
                    left: "100vw",
                    ease: this.animationPreset.easeOut,
                    onComplete: function() {
                        layers[0].style.bottom = "";
                        attachListeners();
                    }
                }, (duration * 4) * 0.9
            );
    }

    animateRevealBottom() {
        scrollBottomTimeline.restart();
    }

    animateRevealTop() {
        scrollTopTimeline.restart();
    }

    animateRevealLeft() {
        scrollHorizontalTimeline.restart();
    }

    animateRevealRight() {
        scrollHorizontalTimeline.reverse(0);
    }

}