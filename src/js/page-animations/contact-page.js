import { TweenMax } from "gsap";
import { Lethargy } from "lethargy";
import { DomListeners } from "../dom-listeners.js";
import { App } from "../app.js";

var lethargy = new Lethargy(7, 100, 0.05);

var el = document.getElementById('contact_area');

export class contactPageAnimation {
    constructor() {
        return false;
    }

    static initEventListeners() {
        window.addEventListener('wheel', contactPageAnimation.contactFormScroll, false);
        window.addEventListener('DOMMouseScroll', contactPageAnimation.contactFormScroll, false);
        window.addEventListener('mousewheel', contactPageAnimation.contactFormScroll, false);
        window.addEventListener('MozMousePixelScroll', contactPageAnimation.contactFormScroll, false);
        window.addEventListener('keydown', contactPageAnimation.keydownScroll, false);
    }

    static destroyEventListeners() {
        window.removeEventListener('wheel', contactPageAnimation.contactFormScroll, false);
        window.removeEventListener('DOMMouseScroll', contactPageAnimation.contactFormScroll, false);
        window.removeEventListener('mousewheel', contactPageAnimation.contactFormScroll, false);
        window.removeEventListener('MozMousePixelScroll', contactPageAnimation.contactFormScroll, false);
        window.removeEventListener('keydown', contactPageAnimation.keydownScroll, false);
    }

    static keydownScroll(e) {
        if (e.keyCode == '38') {
            if (el.style.top == '0%') {
                TweenMax.fromTo(el, 1, { top: '0%', }, { top: '60%', ease: Bounce.easeOut });
            }
            if (el.style.top == '60%') {
                contactPageAnimation.destroyEventListeners();
                DomListeners.attachScrollListeners(App.scrollPage, true);
                DomListeners.attachKeyPressListeners(App.onKeyPress, true);
            }
        }
        if (e.keyCode == '40' || e.keyCode == '32') {
            if (el.style.top == '60%') {
                TweenMax.to(el, 1, { top: '0%', ease: Bounce.easeOut });
            } else {

            }
        }
    }

    static contactFormScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        var lethargyValue = lethargy.check(e);
        if (lethargyValue !== false) {
            if (lethargyValue > 0) {
                if (el.style.top == '0%') {
                    TweenMax.fromTo(el, 1, { top: '0%', }, { top: '60%', ease: Bounce.easeOut });
                }
                if (el.style.top == '60%') {
                    contactPageAnimation.destroyEventListeners();
                    DomListeners.attachScrollListeners(App.scrollPage, true);
                    DomListeners.attachKeyPressListeners(App.onKeyPress, true);
                }
            }
            if (lethargyValue < 0) {
                if (el.style.top == '60%') {
                    TweenMax.to(el, 1, { top: '0%', ease: Bounce.easeOut });
                } else {

                }
            }
        }
    }



}