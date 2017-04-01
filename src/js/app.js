import { Lethargy } from "lethargy";
import { Pages } from "./pages";

var pages = new Pages(document.querySelectorAll('.page'));
var lethargy = new Lethargy(7, 100, 0.05);

window.addEventListener("hashchange", (e) => {
    pages.changePage();
}, false);

export class App {
    constructor() {
        return false;
    }

    static init(domlisteners) {
        domlisteners.attachScrollListeners(this.scrollPage);
        domlisteners.attachSwipeListeners(this.swipePage);
        domlisteners.attachKeyPressListeners(this.onKeyPress);
    }

    static onKeyPress(e) {
        if (e.keyCode == '38') {
            pages.previous();
        }
        if (e.keyCode == '40' || e.keyCode == '32') {
            pages.next();
        }
    }

    static swipePage(e) {
        if (e.deltaY > 0) {
            pages.previous();
        }
        if (e.deltaY < 0) {
            pages.next();
        }
    }

    static scrollPage(e) {
        e.preventDefault();
        e.stopPropagation();
        var lethargyValue = lethargy.check(e);
        if (lethargyValue !== false) {
            if (lethargyValue > 0) {
                pages.previous();
            }
            if (lethargyValue < 0) {
                pages.next();
            }
        }
    }
}