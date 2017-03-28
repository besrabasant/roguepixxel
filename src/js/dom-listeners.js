import Hammer from "hammerjs";

var pageContainer = document.querySelectorAll('.pages');
var hammerMgr = new Hammer(pageContainer[0]);

hammerMgr.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL, threshold: 100 });

export class DomListeners {
    constructor() {
        DomListeners.scrolltruedetach = false;
        DomListeners.keydowntruedetach = false;

        return false;
    }

    static attachSwipeListeners(callback) {
        hammerMgr.on('swipe', callback);
    }
    static detachSwipeListeners(callback) {
        hammerMgr.off('swipe', callback);
    }

    static attachScrollListeners(callback, trueattach = false) {
        if (trueattach) {
            DomListeners.scrolltruedetach = false;
        }
        if (DomListeners.scrolltruedetach) {
            return false;
        }
        window.addEventListener('wheel', callback, false);
        window.addEventListener('DOMMouseScroll', callback, false);
        window.addEventListener('mousewheel', callback, false);
        window.addEventListener('MozMousePixelScroll', callback, false);
    }

    static detachScrollListeners(callback, truedetach = false) {
        DomListeners.scrolltruedetach = truedetach;
        window.removeEventListener('wheel', callback, false);
        window.removeEventListener('DOMMouseScroll', callback, false);
        window.removeEventListener('mousewheel', callback, false);
        window.removeEventListener('MozMousePixelScroll', callback, false);
    }

    static attachKeyPressListeners(callback, trueattach = false) {
        if (trueattach) {
            DomListeners.keydowntruedetach = false;
        }
        if (DomListeners.keydowntruedetach) {
            return false;
        }
        window.addEventListener('keydown', callback, false);
    }

    static detachKeyPressListeners(callback, truedetach = false) {
        DomListeners.keydowntruedetach = truedetach;
        window.removeEventListener('keydown', callback, false);
    }
}