import { Lethargy } from "lethargy";
import { Pages } from "./pages";
import Instafeed from "instafeed.js"
var $ = require("jquery");


var pages = new Pages(document.querySelectorAll('.page'));
var lethargy = new Lethargy(7, 100, 0.05);

var feed = new Instafeed({
    get: 'user',
    userId: '4632033563',
    accessToken: '4632033563.1677ed0.fae5b1cb8c154bacbdb5d240950707eb',
    sortBy:'none',
    limit: '9',
    after: function () {
        var images = $("#instafeed").find('a');
        $.each(images, function(index, image) {
            var delay = (index * 75) + 'ms';
            $(image).css('-webkit-animation-delay', delay);
            $(image).css('-moz-animation-delay', delay);
            $(image).css('-ms-animation-delay', delay);
            $(image).css('-o-animation-delay', delay);
            $(image).css('animation-delay', delay);
            $(image).addClass('animated flipInX');
        });
    },
    template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes"><div class="content"><i class="fa fa-heart" aria-hidden="true"></i> {{likes}}<br>{{caption}}</div></div></a>'
});
feed.run();

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