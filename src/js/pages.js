import { Revealer } from "./revealer";
import { navMenu } from "./navMenu";
import { homescene, pagesAnimation } from './pagesAnimation';
import works from "./worksScene";

var navmenu = new navMenu(document.querySelector('.navmenu'));
export var revealer = new Revealer();

export class Pages {
    constructor(allPages) {
        this.pages = allPages;
        this.currentPageIndex = this.getCurrentPage();
        this.previousPageIndex = null;
        window.location.hash = '#!' + this.pages[this.currentPageIndex].id;
        revealer.addCallback('scroll-bottom', this, this.scrollAnimationCallback);
        revealer.addCallback('scroll-top', this, this.scrollAnimationCallback);
        revealer.addCompleteCallback('scroll-top', this, this.scrollTopAnimationCompleteCallback);
        revealer.addCompleteCallback('scroll-bottom', this, this.scrollBottomAnimationCompleteCallback);
        navmenu.setActive(this.currentPageIndex);
        navmenu.initClickHandlers(this.goToPage, this);

    }

    next() {
        var index = this.currentPageIndex + 1;
        if (index > this.pages.length - 1) {
            index = 0;
        }
        this.goToPage(this, index);
    }

    previous() {
        if (this.currentPageIndex == 0) {
            return false;
        }
        var index = this.currentPageIndex - 1;
        if (index < 0) {
            index = this.pages.length - 1;
        }
        this.goToPage(this, index);
    }

    goToPage(pages = this, index = null) {
        if (index !== null) {
            if (index > pages.currentPageIndex) {
                revealer.animateRevealBottom();
            }
            if (index < pages.currentPageIndex) {
                revealer.animateRevealTop();
            }
            pages.previousPageIndex = pages.currentPageIndex;
            pages.currentPageIndex = index;
        }
    }

    changePage() {
        for (var index = 0; index < this.pages.length; index++) {
            if ('#!' + this.pages[index].id == window.location.hash) {
                this.goToPage(this, index);
            }
        };
    }

    scrollAnimationCallback(pages = this) {
        pages.pages[pages.previousPageIndex].classList.remove('page-current');
        pages.setCurrentPage(pages.pages[pages.currentPageIndex]);
        navmenu.animateActive(pages.currentPageIndex);
    }
    scrollTopAnimationCompleteCallback(pages = this) {
        pagesAnimation.animatePageComponentstoTop(pages);
    }

    scrollBottomAnimationCompleteCallback(pages = this) {
        pagesAnimation.animatePageComponentstoBottom(pages);
    }

    setCurrentPage(page) {
        page.classList.add('page-current');
        window.location.hash = '#!' + page.id;
        if (window.location.hash == '#!home') {
            homescene.start();
        }
        if (window.location.hash == '#!works') {
            works.start();
        }
    }

    getCurrentPageIndex() {
        return this.currentPageIndex;
    }

    getCurrentPage() {
        if (window.location.hash != '') {
            var p;
            for (var index = 0; index < this.pages.length; index++) {
                this.pages[index].classList.remove('page-current');
                if ('#!' + this.pages[index].id == window.location.hash) {
                    p = this.pages[index];
                }
            };
            this.setCurrentPage(p);
        }
        for (var index = 0; index < this.pages.length; index++) {
            if (this.isCurrentPage(this.pages[index])) {
                return index;
            }
        };
    }

    isCurrentPage(element) {
        return element.classList.contains('page-current');
    }

}