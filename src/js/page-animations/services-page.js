import { TweenMax, TimelineMax } from "gsap";
import { DomListeners } from "../dom-listeners.js";
import { App } from "../app.js";

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

const backgrounds = {
    'websites': 'img/services-website.jpg',
    'applications': 'img/services-applications.jpg',
    'mobile-applications': 'img/services-mapps.jpg',
    'e-commerce': 'img/services-ecomm.jpg',
    'digital-marketing': 'img/services-dm.jpg',
    'seo': 'img/services-seo.jpg'
};

export class servicesPageAnimation {
    constructor() {
        return false;
    }
    static init() {
        var getAQuote = document.getElementById('get_a_quote');
        var closeQuoteForm = document.getElementById('close_quote_form');
        var services = document.querySelectorAll('.service_block');

        getAQuote.addEventListener('click', servicesPageAnimation.openQuotesForm, false);
        closeQuoteForm.addEventListener('click', servicesPageAnimation.closeQuotesForm, false);

        for (var i = 0; i < services.length; i++) {
            services[i].children[0].addEventListener('mouseover', servicesPageAnimation.changeBackground, false);
            services[i].children[0].addEventListener('mouseleave', servicesPageAnimation.restoreBackground, false);
            services[i].children[0].addEventListener('click', servicesPageAnimation.showServiceDetails, false);
            services[i].children[3].addEventListener('click', servicesPageAnimation.hideServiceDetails, false);
        }
    }

    static openQuotesForm(e) {
        var quoteForm = document.getElementById('quote_form');
        TweenMax.to(quoteForm, 0.5, { zIndex: '500', visibility: 'visible', opacity: '1' });
        document.querySelector('.container').style.zIndex = 1500;
        detachListeners(true);
    }

    static closeQuotesForm(e) {
        var quoteForm = document.getElementById('quote_form');
        TweenMax.to(quoteForm, 0.5, { zIndex: '-1', opacity: '0' });
        document.querySelector('.container').style.zIndex = 1;
        attachListeners(true);
    }
    static showServiceDetails(e) {
        var services = document.querySelectorAll('.service_block');
        var service = e.target.parentElement;
        var serviceBgWrapper = document.getElementById('services_bg_wrapper');

        detachListeners(true);

        window.location.hash = '#!' + service.id;

        for (var i = 0; i < services.length; i++) {
            services[i].children[0].removeEventListener('click', servicesPageAnimation.showServiceDetails, false);
            if (services[i] !== service) {
                TweenMax.to(services[i], 0.5, { delay: 0.1, opacity: '0', zIndex: '-2', ease: Power2.EaseOut });
            } else {
                serviceBgWrapper.style.backgroundImage = document.querySelectorAll('.bg_image')[i].style.backgroundImage;
            }
        }

        service.dataset.left = window.getComputedStyle(service.children[0], null).getPropertyValue('left');
        service.dataset.top = window.getComputedStyle(service.children[0], null).getPropertyValue('top');

        var showServiceDetailsTimeline = new TimelineMax({ paused: true });
        showServiceDetailsTimeline.add(
            TweenMax.to(document.getElementById('green_overlay'), 0.5, { opacity: 1, delay: 0.55 })
        );
        showServiceDetailsTimeline.add(
            TweenMax.to(service.children[0], 0.85, { top: '15%', left: '13%' }, 2)
        );
        showServiceDetailsTimeline.add(
            TweenMax.fromTo(service.children[1], 0.5, { top: '53%' }, { visibility: 'visible', zIndex: 5, opacity: 1, top: '50%' })
        );
        showServiceDetailsTimeline.add(
            TweenMax.fromTo(service.children[2], 0.5, { top: '18%' }, { visibility: 'visible', zIndex: 5, opacity: 1, top: '15%' })
        );
        showServiceDetailsTimeline.add(
            TweenMax.fromTo(service.children[3], 0.5, { top: '20%' }, { visibility: 'visible', zIndex: 5, opacity: 1, top: '16.65%' })
        );

        showServiceDetailsTimeline.play();


    }

    static hideServiceDetails(e) {
        var services = document.querySelectorAll('.service_block');
        var service = e.target.parentElement;
        var serviceBgWrapper = document.getElementById('services_bg_wrapper');


        var hideServiceDetailsTimeline = new TimelineMax({ paused: true });
        hideServiceDetailsTimeline.add(
            TweenMax.to(document.getElementById('green_overlay'), 0.5, { opacity: 0 })
        );
        hideServiceDetailsTimeline.add(
            TweenMax.to([service.children[1], service.children[2], service.children[3]], 0.5, { opacity: 0 }));

        hideServiceDetailsTimeline.add(
            TweenMax.to([service.children[1], service.children[2], service.children[3]], 0.1, { visibility: 'hidden', zIndex: -2 }));

        hideServiceDetailsTimeline.add(
            TweenMax.to(service.children[0], 1, {
                top: service.dataset.top,
                left: service.dataset.left,
                onComplete: () => {
                    for (var i = 0; i < services.length; i++) {
                        services[i].children[0].addEventListener('click', servicesPageAnimation.showServiceDetails, false);
                        if (services[i] !== service) {
                            TweenMax.to(services[i], 0.4, { delay: 0.1, opacity: '1', zIndex: '3', ease: Power2.EaseOut });
                        } else {
                            TweenMax.fromTo(document.querySelectorAll('.bg_image')[i], 0.5, { opacity: 1 }, { opacity: 0 });
                        }
                    }
                    serviceBgWrapper.style.backgroundImage = document.querySelectorAll('.bg_image')[0].style.backgroundImage;
                    window.location.hash = '#!services';
                }
            }));

        hideServiceDetailsTimeline.play();
        attachListeners(true);
    }

    static changeBackground(e) {
        var servicesbg = document.querySelectorAll('.bg_image');
        var services = document.querySelectorAll('.service_block');
        var service = e.target.parentElement;
        var index;

        for (var i = 0; i < services.length; i++) {
            if (services[i] == service) {
                index = i;
            }
            TweenMax.to(servicesbg[i], 0.5, { opacity: 0 });
        }
        TweenMax.to(servicesbg[index], 0.5, { opacity: 1 }, 0.5);

    }
    static restoreBackground(e) {
        var servicesbg = document.querySelectorAll('.bg_image');
        for (var i = 0; i < servicesbg.length; i++) {
            TweenMax.to(servicesbg[i], 0.5, { opacity: '0' });
        }
    }
}