import { TweenLite } from "gsap";

export class navMenu {
    constructor(element) {
        this.menu = element;
        this.menuItems = this.menu.children;
        this.initActiveMarker();
    }

    initActiveMarker() {
        this.activeMarker = document.createElement('li');
        this.activeMarker.id = 'active-marker';
        this.menu.appendChild(this.activeMarker);
    }

    initClickHandlers(callback, scope) {
        var nav = this;
        [].forEach.call(nav.menuItems, function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                var index = nav.getMenuIndex(this, nav.menuItems);
                callback(scope, index);
            });
        });
    }

    getMenuIndex(element, elementList) {
        for (var i = 0; i < elementList.length; i++) {
            if (elementList[i] == element) {
                return i;
            }
        }
    }

    setActive(index) {
        this.currentMenuIndex = index;

        this.resetMenuState();
        this.menuItems[this.currentMenuIndex].classList.add('active');
        var leftValue = this.menuItems[this.currentMenuIndex].offsetLeft;
        this.activeMarker.style.left = leftValue + 'px';
    }
    animateActive(index) {
        this.currentMenuIndex = index;

        this.resetMenuState();
        this.menuItems[this.currentMenuIndex].classList.add('active');
        var leftValue = this.menuItems[this.currentMenuIndex].offsetLeft;
        TweenLite.to(this.activeMarker, 0.5, { left: leftValue + 'px', ease: Power1.easeOut });
    }

    resetMenuState() {
        [].forEach.call(this.menuItems, function(element) {
            element.classList.remove('active');
        });
    }


}