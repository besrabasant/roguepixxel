import { TweenMax } from "gsap";
import { homeScene } from "./homeScene";
import { worksPageAnimation } from "./page-animations/works-page";
import { servicesPageAnimation } from "./page-animations/services-page";
import { contactPageAnimation } from "./page-animations/contact-page";
import { DomListeners } from "./dom-listeners.js";
import { App } from "./app.js";


function detachListeners(opt = false) {
    DomListeners.detachScrollListeners(App.scrollPage, opt);
    DomListeners.detachSwipeListeners(App.swipePage);
    DomListeners.detachKeyPressListeners(App.onKeyPress, opt);
}

function attachListeners(opt = false) {
    DomListeners.attachScrollListeners(App.scrollPage, opt);
    DomListeners.attachSwipeListeners(App.swipePage);
    DomListeners.attachKeyPressListeners(App.onKeyPress, opt);
}

export var homescene = new homeScene();
servicesPageAnimation.init();
worksPageAnimation.init();



export class pagesAnimation {
    constructor() {

        return false;
    }

    static animatePageComponentstoTop(pages, direction = 'top') {
        var page = pages.pages[pages.currentPageIndex];
        this.animatePageComponents(page, direction);
    }
    static animatePageComponentstoBottom(pages, direction = 'bottom') {
        var page = pages.pages[pages.currentPageIndex];
        this.animatePageComponents(page, direction);
    }

    static animatePageComponents(page, direction) {
        switch (page.id) {
            case 'home':
                this.animateHomepage(page, direction);
                break;
            case 'about-us':
                this.animateAboutUspage(page, direction);
                break;
            case 'works':
                this.animateWorkspage(page, direction);
                break;
            case 'services':
                this.animateServicespage(page, direction);
                break;
            case 'pricing':
                this.animatePricingpage(page, direction);
                break;
            case 'contact':
                this.animateContactpage(page, direction);
                break;
            default:
                break;
        }
    }


    static animateHomepage(page, direction) {
        if (direction == 'top') {
            if (!homescene.isOn) homescene.start();
            if (works.isOn) works.stop();
        }
    }

    static animateAboutUspage(page, direction) {
        let pageComponents = page.children[0].children;

        if (direction == 'top') {
            if (works.isOn) works.stop();
            for (var i = 0; i < pageComponents.length; i++) {
                TweenMax.fromTo(pageComponents[i], 0.75, { top: '-20%' }, { delay: (0.1 * i), top: '0%', ease: Power2.easeOut });
            }
        }

        if (direction == 'bottom') {
            if (homescene.isOn) homescene.stop();

            for (var i = 0; i < pageComponents.length; i++) {
                TweenMax.fromTo(pageComponents[i], 0.75, { top: '20%' }, { delay: (0.1 * i), top: '0%', ease: Power2.easeOut });
            }
        }

    }

    static animateWorkspage(page, direction) {
        const worksDetail = page.children[0].children[0].children.filter_buttons;
        const details = document.querySelectorAll('.filter');

        if (direction == 'top') {

            TweenMax.fromTo(worksDetail, 0.8, { bottom: '40%' }, { bottom: '3%', ease: Power3.easeOut });
            TweenMax.staggerFromTo(details, 0.8, { bottom: '40%', opacity: '0' }, { bottom: '3%', opacity: '1', ease: Power3.easeOut }, 0.2);
        }
        if (direction == 'bottom') {
            if (homescene.isOn) homescene.stop();


            TweenMax.fromTo(worksDetail, 0.85, { bottom: '-40%' }, { bottom: '3%', ease: Power3.easeOut });
            TweenMax.staggerFromTo(details, 0.85, { bottom: '-40%', opacity: '0' }, { bottom: '3%', opacity: '1', ease: Power3.easeOut }, 0.2);
            // works.planes.forEach((plane, index) => {
            //     TweenMax.fromTo(plane.position, 0.75, { y: '-120' }, { y: '0', ease: Power2.easeOut });
            // });
        }
    }

    static animateServicespage(page, direction) {
        const getAQuote = page.children[0].children.get_a_quote;
        const services = document.querySelectorAll('.service_block');

        if (direction == 'top') {
            for (var i = 0; i < services.length; i++) {
                TweenMax.fromTo(services[i], 0.7, { top: '-20%', opacity: '0' }, { delay: (0.1 * i), top: '0%', opacity: '1', ease: Power2.easeOut });
            }
            TweenMax.fromTo(getAQuote, 1.8, { top: '-30%', rotation: '0' }, { delay: 1, top: '80%', rotation: '20', transformOrigin: "right", ease: Bounce.easeOut });
        }
        if (direction == 'bottom') {
            if (homescene.isOn) homescene.stop();
            if (works.isOn) works.stop();

            for (var i = 0; i < services.length; i++) {
                TweenMax.fromTo(services[i], 0.7, { top: '15%', opacity: '0' }, { delay: (0.1 * i), top: '0%', opacity: '1', ease: Power2.easeOut });
            }
            TweenMax.fromTo(getAQuote, 1.5, { top: '110%', rotation: '0' }, { delay: 1, top: '80%', rotation: '20', ease: Bounce.easeOut });
        }
    }

    static animatePricingpage(page, direction) {
        const prices = document.getElementById('prices').children;

        if (direction == 'top') {
            for (var i = 0; i < prices.length; i++) {
                TweenMax.fromTo(prices[i], 0.7, { top: '-30%', opacity: '0' }, { top: '0%', opacity: '1', delay: (0.1 * i + 0.3), ease: Power3.easeOut });
            }
        }
        if (direction == 'bottom') {
            if (homescene.isOn) homescene.stop();
            if (works.isOn) works.stop();

            for (var i = 0; i < prices.length; i++) {
                TweenMax.fromTo(prices[i], 0.7, { top: '30%', opacity: '0' }, { top: '0%', opacity: '1', delay: (0.1 * i + 0.3), ease: Power3.easeOut });
            }
        }
    }

    static animateContactpage(page, direction) {
        const maps = page.children[0].children.maps;
        const contactArea = page.children[0].children.contact_area;

        if (direction == 'bottom') {
            if (homescene.isOn) homescene.stop();
            if (works.isOn) works.stop();

            TweenMax.fromTo(maps, 0.8, { top: '30%' }, { top: '0%', ease: Power3.easeOut });
            TweenMax.fromTo(contactArea, 0.75, { top: '85%' }, { top: '60%', ease: Power3.easeOut });

            detachListeners(true);
            contactPageAnimation.initEventListeners();

        }
    }
}